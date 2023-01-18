import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useModalStore = create(
  devtools(
    persist(
      (set) => ({
        open: false,
        type: "",
        todoId: "",

        setModalType: (type) => set({ type }),
        setTodoId: (todoId) => set({ todoId }),

        openModal: () => set({ open: true }),
        closeModal: () => set({ open: false }),
      }),
      { name: "modal" }
    )
  )
);
