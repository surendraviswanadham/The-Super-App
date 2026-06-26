import { create } from "zustand";

export const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("super_app_user")) || {
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
  },
  isAuthenticated: localStorage.getItem("super_app_auth") === "true",
  categories: JSON.parse(localStorage.getItem("super_app_categories")) || [],
  notes: localStorage.getItem("super_app_notes") || "",

  setUser: (userData) => {
    localStorage.setItem("super_app_user", JSON.stringify(userData));
    localStorage.setItem("super_app_auth", "true");
    set({ user: userData, isAuthenticated: true });
  },

  loginUser: () => {
    localStorage.setItem("super_app_auth", "true");
    set({ isAuthenticated: true });
  },

  logoutUser: () => {
    localStorage.setItem("super_app_auth", "false");
    set({ isAuthenticated: false });
  },
  
  setCategories: (categoryArray) => {
    localStorage.setItem("super_app_categories", JSON.stringify(categoryArray));
    set({ categories: categoryArray });
  },
  
  setNotes: (noteText) => {
    localStorage.setItem("super_app_notes", noteText);
    set({ notes: noteText });
  },
  
  resetStore: () => {
    localStorage.removeItem("super_app_user");
    localStorage.removeItem("super_app_auth");
    localStorage.removeItem("super_app_categories");
    localStorage.removeItem("super_app_notes");
    set({
      user: { name: "", username: "", email: "", mobile: "", password: "" },
      isAuthenticated: false,
      categories: [],
      notes: ""
    });
  }
}));
