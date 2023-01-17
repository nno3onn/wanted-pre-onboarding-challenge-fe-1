import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools((set) => ({
    updateMode: false,
    clickedDelete: false,
    todoId: "",

    setUpdateMode: (updateMode) => set({ updateMode }),
    setClickedDelete: (clickedDelete) => set({ clickedDelete }),
    setTodoId: (todoId) => set({ todoId }),
  }))
);
