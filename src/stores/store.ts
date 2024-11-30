import { create } from 'zustand';

interface ProductPreviewState {
  fix: boolean;
  setFix: (value: boolean) => void;
}

export const useProductPreviewStore = create<ProductPreviewState>((set) => ({
  fix: false,
  setFix: (value: boolean) => set({ fix: value }),
}));
