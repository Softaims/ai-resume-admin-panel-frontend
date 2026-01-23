import { create } from "zustand";
import api from "../utils/apiConfig";

const useUserOverviewStore = create((set, get) => ({
  overviewStats: null,
  isLoadingStats: false,
  statsError: null,

  users: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  },
  isLoadingUsers: false,
  usersError: null,
  abortController: null, 

  filters: {
    search: "",
    tab: "all",
    timeRange: "7days",
    monthFilter: "",
    subscriptionFilter: "all",
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        search: "",
        tab: "all",
        timeRange: "7days",
        monthFilter: "",
        subscriptionFilter: "all",
      },
    });
  },

  fetchOverviewStats: async (forceRefresh = false) => {
    const { overviewStats } = get();
    const hasData = overviewStats !== null;

    if (hasData && !forceRefresh) {
      return;
    }

    set({ 
      isLoadingStats: true, 
      statsError: null,
      overviewStats: forceRefresh ? null : overviewStats, 
    });
    
    try {
      const response = await api.get("/admin/users/overview/stats");
      if (response.success) {
        set({
          overviewStats: response.data,
          isLoadingStats: false,
          statsError: null,
        });
      } else {
        set({
          isLoadingStats: false,
          statsError: response.message || "Failed to fetch overview statistics",
        });
      }
    } catch (error) {
      set({
        isLoadingStats: false,
        statsError: error.message || "Failed to fetch overview statistics",
      });
    }
  },

  fetchUsers: async (params = {}, forceRefresh = false) => {
    const { filters, pagination, users } = get();
    
    const queryParams = {
      page: params.page !== undefined ? params.page : pagination.currentPage,
      limit: params.limit !== undefined ? params.limit : pagination.itemsPerPage,
      search: params.search !== undefined ? params.search : filters.search,
      tab: params.tab !== undefined ? params.tab : filters.tab,
      timeRange:
        params.timeRange !== undefined ? params.timeRange : filters.timeRange,
      monthFilter:
        params.monthFilter !== undefined
          ? params.monthFilter
          : filters.monthFilter,
      subscriptionFilter:
        params.subscriptionFilter !== undefined
          ? params.subscriptionFilter
          : filters.subscriptionFilter,
    };

    const hasExplicitParams = 
      params.page !== undefined ||
      params.search !== undefined ||
      params.tab !== undefined ||
      params.timeRange !== undefined ||
      params.monthFilter !== undefined ||
      params.subscriptionFilter !== undefined;

    const paramsChanged =
      queryParams.page !== pagination.currentPage ||
      queryParams.search !== filters.search ||
      queryParams.tab !== filters.tab ||
      queryParams.timeRange !== filters.timeRange ||
      queryParams.monthFilter !== filters.monthFilter ||
      queryParams.subscriptionFilter !== filters.subscriptionFilter ||
      queryParams.limit !== pagination.itemsPerPage;

    if (!paramsChanged && !forceRefresh && users.length > 0) {
      return;
    }

    const { abortController: prevAbortController } = get();
    if (prevAbortController) {
      prevAbortController.abort();
    }

    const abortController = new AbortController();

    set({
      isLoadingUsers: true,
      usersError: null,
      users: (paramsChanged || hasExplicitParams || forceRefresh) ? [] : users, 
      filters: {
        search: queryParams.search,
        tab: queryParams.tab,
        timeRange: queryParams.timeRange,
        monthFilter: queryParams.monthFilter,
        subscriptionFilter: queryParams.subscriptionFilter,
      },
      abortController, 
    });

    try {
      const config = { params: queryParams };
      if (abortController.signal) {
        config.signal = abortController.signal;
      }
      const response = await api.get("/admin/users", config);
      if (response.success) {
        set({
          users: response.data.users,
          pagination: response.data.pagination,
          isLoadingUsers: false,
          usersError: null,
          abortController: null, 
        });
      } else {
        set({
          isLoadingUsers: false,
          usersError: response.message || "Failed to fetch users list",
          abortController: null, 
        });
      }
    } catch (error) {
      if (error.name === 'CanceledError' || error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
        return; 
      }

      set({
        isLoadingUsers: false,
        usersError: error.message || "Failed to fetch users list",
        abortController: null, 
      });
    }
  },

  reset: () => {
    set({
      overviewStats: null,
      isLoadingStats: false,
      statsError: null,
      users: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
      },
      isLoadingUsers: false,
      usersError: null,
      abortController: null,
      filters: {
        search: "",
        tab: "all",
        timeRange: "7days",
        monthFilter: "",
        subscriptionFilter: "all",
      },
    });
  },
}));

export default useUserOverviewStore;
