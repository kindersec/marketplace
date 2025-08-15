import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { storableError } from '../../util/errors';
import { getAllTransitionsForEveryProcess } from '../../transactions/transaction';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );

// ================ Action types ================ //
export const FETCH_ORDERS_REQUEST = 'app/OrdersPage/FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'app/OrdersPage/FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'app/OrdersPage/FETCH_ORDERS_ERROR';

// ================ Reducer ================ //
const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const initialState = {
  fetchInProgress: false,
  fetchOrdersError: null,
  pagination: null,
  transactionRefs: [],
};

export default function ordersPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ORDERS_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrdersError: null };
    case FETCH_ORDERS_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        fetchInProgress: false,
        transactionRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_ORDERS_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //
const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });
const fetchOrdersSuccess = response => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: response,
});
const fetchOrdersError = e => ({
  type: FETCH_ORDERS_ERROR,
  error: true,
  payload: e,
});

// ================ Thunks ================ //
const ORDERS_PAGE_SIZE = 50;

export const loadData = () => (dispatch, getState, sdk) => {
  dispatch(fetchOrdersRequest());

  const apiQueryParams = {
    only: 'order',
    lastTransitions: getAllTransitionsForEveryProcess(),
    include: [
      'listing',
      'listing.images',
      'provider',
      'provider.profileImage',
      'customer',
      'customer.profileImage',
      'booking',
    ],
    'fields.transaction': [
      'processName',
      'lastTransition',
      'lastTransitionedAt',
      'transitions',
      'payinTotal',
      'payoutTotal',
      'lineItems',
    ],
    'fields.listing': ['title', 'availabilityPlan', 'publicData.listingType'],
    'fields.user': ['profile.displayName', 'profile.abbreviatedName', 'deleted', 'banned'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
    page: 1,
    perPage: ORDERS_PAGE_SIZE,
  };

  console.log('🛒 OrdersPage: Fetching orders with params:', apiQueryParams);

  return sdk.transactions
    .query(apiQueryParams)
    .then(response => {
      console.log('🛒 OrdersPage: Received orders:', {
        count: response.data?.data?.length || 0,
        orders: response.data?.data || [],
        meta: response.data?.meta
      });
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchOrdersSuccess(response));
      return response;
    })
    .catch(e => {
      console.error('🛒 OrdersPage: Error fetching orders:', e);
      dispatch(fetchOrdersError(storableError(e)));
      throw e;
    });
};
