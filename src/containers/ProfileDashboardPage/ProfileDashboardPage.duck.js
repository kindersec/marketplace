// ================ Action types ================ //

export const FETCH_USER_STATS_REQUEST = 'app/ProfileDashboardPage/FETCH_USER_STATS_REQUEST';
export const FETCH_USER_STATS_SUCCESS = 'app/ProfileDashboardPage/FETCH_USER_STATS_SUCCESS';
export const FETCH_USER_STATS_ERROR = 'app/ProfileDashboardPage/FETCH_USER_STATS_ERROR';

// ================ Action creators ================ //

export const fetchUserStatsRequest = () => ({
  type: FETCH_USER_STATS_REQUEST,
});

export const fetchUserStatsSuccess = stats => ({
  type: FETCH_USER_STATS_SUCCESS,
  payload: stats,
});

export const fetchUserStatsError = error => ({
  type: FETCH_USER_STATS_ERROR,
  payload: error,
});

// ================ Reducer ================ //

const initialState = {
  userStats: {
    activeListings: 0,
    completedOrders: 0,
    totalSales: 0,
  },
  fetchInProgress: false,
  fetchError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_STATS_REQUEST:
      return {
        ...state,
        fetchInProgress: true,
        fetchError: null,
      };
    case FETCH_USER_STATS_SUCCESS:
      return {
        ...state,
        userStats: payload,
        fetchInProgress: false,
        fetchError: null,
      };
    case FETCH_USER_STATS_ERROR:
      return {
        ...state,
        fetchInProgress: false,
        fetchError: payload,
      };
    default:
      return state;
  }
}

// ================ Selectors ================ //

export const getUserStats = state => state.ProfileDashboardPage.userStats;
export const getFetchInProgress = state => state.ProfileDashboardPage.fetchInProgress;
export const getFetchError = state => state.ProfileDashboardPage.fetchError;

// ================ Thunks ================ //

export const fetchUserStats = () => (dispatch, getState, sdk) => {
  dispatch(fetchUserStatsRequest());

  // For now, return mock data
  // In a real implementation, you would fetch actual user statistics
  const mockStats = {
    activeListings: 0,
    completedOrders: 0,
    totalSales: 0,
  };

  return Promise.resolve(mockStats)
    .then(stats => {
      dispatch(fetchUserStatsSuccess(stats));
      return stats;
    })
    .catch(error => {
      dispatch(fetchUserStatsError(error));
      throw error;
    });
};
