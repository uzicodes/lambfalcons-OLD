declare module 'ldrs' {
  export const tailChase: {
    register: () => void;
  };
  export const ring: {
    register: () => void;
  };
  export const bouncy: {
    register: () => void;
  };
  export const dotSpinner: {
    register: () => void;
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    'l-tail-chase': {
      size?: string;
      speed?: string;
      color?: string;
    };
    'l-ring': {
      size?: string;
      speed?: string;
      color?: string;
    };
    'l-bouncy': {
      size?: string;
      speed?: string;
      color?: string;
    };
    'l-dot-spinner': {
      size?: string;
      speed?: string;
      color?: string;
    };
  }
}
