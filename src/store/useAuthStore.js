import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        authFormType: "login",
        authToken: "",

        setAuthFormType: (formType) => set({ authFormType: formType }),

        setToken: (authToken) => set({ authToken }),
        removeToken: () => set({ authToken: "" }),
      }),
      { name: "authToken" }
    )
  )
);
