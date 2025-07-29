// Check if file size is acceptable (max 2MB before compression)
export const checkFileSize = (file: File): boolean => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  return file.size <= maxSize;
};

// Get proper image URL for display (handles base64 vs external URLs)
export const getImageUrl = (profilePicture: string | undefined, timestamp: number): string => {
  if (!profilePicture) {
    return `/dummy_pic.jpg?t=${timestamp}`;
  }
  
  // If it's a base64 image, return it directly (no cache busting needed)
  if (profilePicture.startsWith('data:')) {
    return profilePicture;
  }
  
  // If it's an external URL, add cache busting
  return `${profilePicture}?t=${timestamp}`;
};

// Convert image to base64 for storage in Firestore
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Compress image with specific quality level and dimensions
const compressImageWithQuality = (file: File, quality: number, maxDimension: number = 400): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // Scale down if image is larger than maxDimension
      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// Compress image with multiple quality levels to ensure it fits in Firestore
export const compressImageForFirestore = async (file: File): Promise<File> => {
  // First check original file size
  if (!checkFileSize(file)) {
    throw new Error('File size too large. Please select an image smaller than 2MB.');
  }

  // Try different quality levels and dimensions to ensure the base64 fits in Firestore
  const compressionSettings = [
    { quality: 0.6, maxDimension: 400 },
    { quality: 0.5, maxDimension: 350 },
    { quality: 0.4, maxDimension: 300 },
    { quality: 0.3, maxDimension: 250 },
    { quality: 0.2, maxDimension: 200 },
    { quality: 0.1, maxDimension: 150 }
  ];
  
  for (const setting of compressionSettings) {
    try {
      const compressedFile = await compressImageWithQuality(file, setting.quality, setting.maxDimension);
      const base64 = await convertImageToBase64(compressedFile);
      
      // Check if base64 size is under 800KB (safe limit for Firestore)
      if (base64.length < 800000) {
        return compressedFile;
      }
    } catch (error) {
      continue; // Try next compression setting
    }
  }
  
  throw new Error('Image too large even after compression. Please select a smaller image or try a different photo.');
}; 