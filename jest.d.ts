// jest.d.ts
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(style: Record<string, any>): R;
      toHaveClass(className: string): R;
      // Add other custom matchers you might need
    }
  }
}

export {};