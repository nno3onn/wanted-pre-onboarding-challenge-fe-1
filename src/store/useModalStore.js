import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useModalStore = create(
  devtools((set) => ({
    open: false,
    type: "",

    setModalType: (type) => set({ type }),

    openModal: () => set({ open: true }),
    closeModal: () => set({ open: false }),
  }))
);
