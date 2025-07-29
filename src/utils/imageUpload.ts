// Check if file size is acceptable (max 2MB before compression)
export const checkFileSize = (file: File): boolean => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  return file.size <= maxSize;
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

// Compress image with specific quality level
const compressImageWithQuality = (file: File, quality: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > height) {
        if (width > 400) {
          height = (height * 400) / width;
          width = 400;
        }
      } else {
        if (height > 400) {
          width = (width * 400) / height;
          height = 400;
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

  // Try different quality levels to ensure the base64 fits in Firestore (1MB limit)
  const qualityLevels = [0.6, 0.5, 0.4, 0.3];
  
  for (const quality of qualityLevels) {
    try {
      const compressedFile = await compressImageWithQuality(file, quality);
      const base64 = await convertImageToBase64(compressedFile);
      
      // Check if base64 size is under 1MB (Firestore limit)
      if (base64.length < 1000000) { // 1MB = ~1,000,000 characters
        return compressedFile;
      }
    } catch (error) {
      continue; // Try next quality level
    }
  }
  
  throw new Error('Image too large even after compression. Please select a smaller image.');
}; 