import { create } from "zustand";
import api from "../utils/apiConfig";

const useVisitorStore = create((set, get) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async (forceRefresh = false) => {
    const { stats } = get();
    const hasData = stats !== null;

    if (hasData && !forceRefresh) {
      return;
    }

    set({
      isLoading: true,
      error: null,
      stats: forceRefresh ? null : stats,
    });

    try {
      const response = await api.get("/admin/visitors/stats");
      if (response.success) {
        set({
          stats: response.data,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          isLoading: false,
          error: response.message || "Failed to fetch visitor statistics",
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to fetch visitor statistics",
      });
    }
  },

  reset: () => {
    set({
      stats: null,
      isLoading: false,
      error: null,
    });
  },
}));

export default useVisitorStore;
