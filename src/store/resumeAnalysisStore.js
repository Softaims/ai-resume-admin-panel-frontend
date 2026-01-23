import { create } from "zustand";
import api from "../utils/apiConfig";

const useResumeAnalysisStore = create((set, get) => ({
  stats: null,
  isLoadingStats: false,
  statsError: null,

  users: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  },
  isLoadingList: false,
  listError: null,

  search: "",

  userDetails: null,
  isLoadingDetails: false,
  detailsError: null,

  setSearch: (search) => {
    set({ search });
  },

  fetchStats: async (forceRefresh = false) => {
    const { stats } = get();
    const hasData = stats !== null;

    if (hasData && !forceRefresh) {
      return;
    }

    set({ isLoadingStats: true, statsError: null });
    try {
      const response = await api.get("/admin/resumes/stats");
      if (response.success) {
        set({
          stats: response.data,
          isLoadingStats: false,
          statsError: null,
        });
      } else {
        set({
          isLoadingStats: false,
          statsError: response.message || "Failed to fetch statistics",
        });
      }
    } catch (error) {
      set({
        isLoadingStats: false,
        statsError: error.message || "Failed to fetch statistics",
      });
    }
  },

  fetchList: async (params = {}, forceRefresh = false) => {
    const { search, pagination, users } = get();
    
    const queryParams = {
      page: params.page !== undefined ? params.page : pagination.currentPage,
      limit: params.limit !== undefined ? params.limit : pagination.itemsPerPage,
      search: params.search !== undefined ? params.search : search,
    };

    const paramsChanged =
      queryParams.page !== pagination.currentPage ||
      queryParams.search !== search ||
      queryParams.limit !== pagination.itemsPerPage;

    const hasExplicitSearch = params.search !== undefined;
    const hasData = users.length > 0;

    if (hasData && !paramsChanged && !forceRefresh && !hasExplicitSearch) {
      return;
    }

    if (paramsChanged || forceRefresh || hasExplicitSearch) {
      set({ users: [] });
    }

    if (params.search !== undefined) {
      set({ search: params.search });
    }

    set({ isLoadingList: true, listError: null });
    try {
      const response = await api.get("/admin/resumes", { params: queryParams });
      if (response.success) {
        set({
          users: response.data.users,
          pagination: response.data.pagination,
          isLoadingList: false,
          listError: null,
        });
      } else {
        set({
          isLoadingList: false,
          listError: response.message || "Failed to fetch list",
        });
      }
    } catch (error) {
      set({
        isLoadingList: false,
        listError: error.message || "Failed to fetch list",
      });
    }
  },

  fetchUserDetails: async (userId, forceRefresh = false) => {
    const { userDetails } = get();
    const hasData = userDetails !== null && userDetails.userId === userId;

    if (hasData && !forceRefresh) {
      return;
    }

    
      set({ isLoadingDetails: true, detailsError: null });
      if (!hasData) {
        set({ userDetails: null });
      }
      try {
        const response = await api.get(`/admin/resumes/${userId}`);
        if (response.success) {
          set({
            userDetails: response.data,
            isLoadingDetails: false,
            detailsError: null,
          });
        } else {
          set({
            isLoadingDetails: false,
            detailsError: response.message || "Failed to fetch user details",
          });
        }
      } catch (error) {
        set({
          isLoadingDetails: false,
          detailsError: error.message || "Failed to fetch user details",
        });
      }
    
  },

  reset: () => {
    set({
      stats: null,
      isLoadingStats: false,
      statsError: null,
      users: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
      },
      isLoadingList: false,
      listError: null,
      search: "",
      userDetails: null,
      isLoadingDetails: false,
      detailsError: null,
    });
  },
}));

export default useResumeAnalysisStore;
