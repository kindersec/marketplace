import { storableError } from '../util/errors';
import { denormalisedResponseEntities } from '../util/data';
import { currentUserShowSuccess } from './user.duck';
import { getCart as apiGetCart, saveCart as apiSaveCart } from '../util/api';

// ================ Action types ================ //

export const CART_LOAD_REQUEST = 'app/Cart/CART_LOAD_REQUEST';
export const CART_LOAD_SUCCESS = 'app/Cart/CART_LOAD_SUCCESS';
export const CART_LOAD_ERROR = 'app/Cart/CART_LOAD_ERROR';

export const CART_SAVE_REQUEST = 'app/Cart/CART_SAVE_REQUEST';
export const CART_SAVE_SUCCESS = 'app/Cart/CART_SAVE_SUCCESS';
export const CART_SAVE_ERROR = 'app/Cart/CART_SAVE_ERROR';

export const CART_UPDATE_ITEM_REQUEST = 'app/Cart/CART_UPDATE_ITEM_REQUEST';
export const CART_UPDATE_ITEM_SUCCESS = 'app/Cart/CART_UPDATE_ITEM_SUCCESS';
export const CART_UPDATE_ITEM_ERROR = 'app/Cart/CART_UPDATE_ITEM_ERROR';

export const CART_REMOVE_ITEM_REQUEST = 'app/Cart/CART_REMOVE_ITEM_REQUEST';
export const CART_REMOVE_ITEM_SUCCESS = 'app/Cart/CART_REMOVE_ITEM_SUCCESS';
export const CART_REMOVE_ITEM_ERROR = 'app/Cart/CART_REMOVE_ITEM_ERROR';

// ================ Reducer ================ //

const initialState = {
  cart: {}, // { [providerId]: [{ listingId, quantity, deliveryMethod?, priceVariantName? }] }
  loadInProgress: false,
  loadError: null,
  saveInProgress: false,
  saveError: null,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case CART_LOAD_REQUEST:
      return { ...state, loadInProgress: true, loadError: null };
    case CART_LOAD_SUCCESS:
      return { ...state, loadInProgress: false, cart: payload.cart || {} };
    case CART_LOAD_ERROR:
      return { ...state, loadInProgress: false, loadError: payload };

    case CART_SAVE_REQUEST:
      return { ...state, saveInProgress: true, saveError: null };
    case CART_SAVE_SUCCESS:
      return { ...state, saveInProgress: false, cart: payload.cart || state.cart };
    case CART_SAVE_ERROR:
      return { ...state, saveInProgress: false, saveError: payload };

    default:
      return state;
  }
}

// ================ Action creators ================ //

export const cartLoadRequest = () => ({ type: CART_LOAD_REQUEST });
export const cartLoadSuccess = cart => ({ type: CART_LOAD_SUCCESS, payload: { cart } });
export const cartLoadError = e => ({ type: CART_LOAD_ERROR, payload: e, error: true });

export const cartSaveRequest = () => ({ type: CART_SAVE_REQUEST });
export const cartSaveSuccess = cart => ({ type: CART_SAVE_SUCCESS, payload: { cart } });
export const cartSaveError = e => ({ type: CART_SAVE_ERROR, payload: e, error: true });

export const cartUpdateItemRequest = () => ({ type: CART_UPDATE_ITEM_REQUEST });
export const cartUpdateItemSuccess = cart => ({ type: CART_UPDATE_ITEM_SUCCESS, payload: { cart } });
export const cartUpdateItemError = e => ({ type: CART_UPDATE_ITEM_ERROR, payload: e, error: true });

export const cartRemoveItemRequest = () => ({ type: CART_REMOVE_ITEM_REQUEST });
export const cartRemoveItemSuccess = cart => ({ type: CART_REMOVE_ITEM_SUCCESS, payload: { cart } });
export const cartRemoveItemError = e => ({ type: CART_REMOVE_ITEM_ERROR, payload: e, error: true });

// ================ Helpers ================ //
const normalizeCart = raw => {
  if (!raw || typeof raw !== 'object') return {};

  // Debug logging for troubleshooting
  if (typeof window !== 'undefined') {
    console.log('🛒 normalizeCart: raw input', raw);
  }

  // Convert potential map-like or prototype-less objects into plain providerId -> array structure
  const entries = Object.entries({ ...raw });
  const normalized = entries.reduce((acc, [providerId, items]) => {
    const list = Array.isArray(items) ? items : [];
    acc[providerId] = list.map(it => {
      const rawQuantity = it?.quantity;
      let quantity = 0;

      // Debug logging for quantity processing
      if (typeof window !== 'undefined') {
        console.log(`🛒 normalizeCart: processing item quantity`, {
          providerId,
          item: it,
          rawQuantity,
          rawQuantityType: typeof rawQuantity,
          isNaN: isNaN(rawQuantity)
        });
      }

      // Ensure quantity is a valid positive number
      if (typeof rawQuantity === 'number' && !isNaN(rawQuantity) && rawQuantity > 0) {
        quantity = rawQuantity;
      } else if (typeof rawQuantity === 'string') {
        const parsed = Number(rawQuantity);
        if (!isNaN(parsed) && parsed > 0) {
          quantity = parsed;
        }
      }

      const normalizedItem = {
        listingId: (it?.listingId?.uuid || it?.listingId) ?? '',
        quantity: quantity,
        deliveryMethod: it?.deliveryMethod || undefined,
        priceVariantName: it?.priceVariantName || undefined,
      };

      // Debug logging for normalized item
      if (typeof window !== 'undefined') {
        console.log(`🛒 normalizeCart: normalized item`, {
          providerId,
          original: it,
          normalized: normalizedItem
        });
      }

      return normalizedItem;
    });
    return acc;
  }, {});

  // Debug logging for final result
  if (typeof window !== 'undefined') {
    console.log('🛒 normalizeCart: final result', normalized);
  }

  return normalized;
};

// ================ Thunks ================ //

export const loadCart = () => (dispatch, getState, sdk) => {
  dispatch(cartLoadRequest());

    return apiGetCart()
    .then(res => {
      const raw = res?.data || {};
      const cart = normalizeCart(raw);

      // If API returns empty cart, try localStorage fallback
      const isEmptyCart = !cart || Object.keys(cart).length === 0;

      if (isEmptyCart && typeof window !== 'undefined') {
        try {
          const localCart = localStorage.getItem('demo-cart');
          if (localCart) {
            const fallbackCart = JSON.parse(localCart);
            console.log('🛒 API returned empty, using localStorage fallback:', fallbackCart);
            dispatch(cartLoadSuccess(fallbackCart));
            return fallbackCart;
          }
        } catch (localError) {
          console.error('🛒 Error loading from localStorage:', localError);
        }
      }

      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.log('🛒 Cart loaded from API (normalized):', cart, 'providerIds:', Object.keys(cart || {}));
      }
      dispatch(cartLoadSuccess(cart));
      return cart;
    })
    .catch(e => {
      console.error('🛒 Error loading cart:', e);

      // Fallback to localStorage for development/demo when SDK is not configured
      if (typeof window !== 'undefined') {
        try {
          const localCart = localStorage.getItem('demo-cart');
          const cart = localCart ? JSON.parse(localCart) : {};
          console.log('🛒 Fallback: Cart loaded from localStorage:', cart);
          dispatch(cartLoadSuccess(cart));
          return cart;
        } catch (localError) {
          console.error('🛒 Error loading from localStorage:', localError);
        }
      }

      dispatch(cartLoadError(storableError(e)));
      return {};
    });
};

const mergeCartItem = (cart, providerId, item) => {
  const prev = cart[providerId] || [];
  const { listingId, quantity, deliveryMethod, priceVariantName } = item;

  // Debug logging for troubleshooting
  if (typeof window !== 'undefined') {
    console.log(`🛒 mergeCartItem: processing item`, {
      providerId,
      listingId,
      quantity,
      quantityType: typeof quantity,
      isNaN: isNaN(quantity),
      prevItems: prev
    });
  }

  const idx = prev.findIndex(i => i.listingId === listingId && i.priceVariantName === priceVariantName);
  if (idx >= 0) {
    const updated = [...prev];
    const prevItem = updated[idx];

    // Ensure both quantities are valid numbers before adding
    const prevQuantity = typeof prevItem.quantity === 'number' && !isNaN(prevItem.quantity) ? prevItem.quantity : 0;
    const newQuantity = typeof quantity === 'number' && !isNaN(quantity) ? quantity : 0;
    const totalQuantity = prevQuantity + newQuantity;

    // Debug logging for quantity calculation
    if (typeof window !== 'undefined') {
      console.log(`🛒 mergeCartItem: quantity calculation`, {
        providerId,
        listingId,
        prevQuantity,
        newQuantity,
        totalQuantity,
        prevItem
      });
    }

    updated[idx] = {
      ...prevItem,
      quantity: totalQuantity,
      deliveryMethod: deliveryMethod || prevItem.deliveryMethod,
    };
    return { ...cart, [providerId]: updated };
  }
  return { ...cart, [providerId]: [...prev, item] };
};

export const addToCart = ({ listing, orderData }) => (dispatch, getState, sdk) => {
  // Debug logging for cart functionality
  if (typeof window !== 'undefined') {
    console.log('🛒 addToCart called:', { listing: listing?.attributes, orderData });
  }

  const state = getState();
  const currentCart = state.Cart?.cart || {};
  const providerId = listing?.author?.id?.uuid || listing?.author?.id;
  if (!providerId) {
    console.error('🛒 Error: Listing author missing', listing);
    return Promise.reject(new Error('Listing author missing'));
  }

  // Validate quantity is a valid number
  const quantity = Number(orderData?.quantity);
  if (isNaN(quantity) || quantity <= 0) {
    console.error('🛒 Error: Invalid quantity', orderData?.quantity);
    return Promise.reject(new Error('Invalid quantity'));
  }

  const item = {
    listingId: listing?.id?.uuid || listing?.id,
    quantity: quantity,
    deliveryMethod: orderData?.deliveryMethod,
    priceVariantName: orderData?.priceVariantName,
  };
  // Deep-clone to strip any SDK classes/transit wrappers
  const plainCart = normalizeCart(JSON.parse(JSON.stringify(currentCart)));
  // Ensure provider bucket exists
  if (!Array.isArray(plainCart[providerId])) {
    plainCart[providerId] = [];
  }
  const nextCart = mergeCartItem(plainCart, providerId, item);
  dispatch(cartSaveRequest());

    // Use the cart API endpoint for consistent data handling
  return apiSaveCart(nextCart)
    .then(response => {
      const savedCart = response?.data || nextCart;

      // If API returns empty cart but we're trying to save data, use localStorage fallback
      const isEmptyResponse = !savedCart || Object.keys(savedCart).length === 0;
      const hasSaveData = Object.keys(nextCart).length > 0;

      if (isEmptyResponse && hasSaveData && typeof window !== 'undefined') {
        console.log('🛒 API returned empty cart, using localStorage fallback');
        try {
          localStorage.setItem('demo-cart', JSON.stringify(nextCart));
          console.log('🛒 Fallback: Cart saved to localStorage:', nextCart);
          dispatch(cartSaveSuccess(nextCart));
          return nextCart;
        } catch (localError) {
          console.error('🛒 Error saving to localStorage:', localError);
        }
      }

      dispatch(cartSaveSuccess(savedCart));
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.log('🛒 Cart saved via API:', savedCart);
      }
      return savedCart;
    })
    .catch(e => {
      console.error('🛒 Error saving cart:', e);

      // Fallback to localStorage for development/demo when SDK is not configured
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('demo-cart', JSON.stringify(nextCart));
          console.log('🛒 Fallback: Cart saved to localStorage:', nextCart);
          dispatch(cartSaveSuccess(nextCart));
          return nextCart;
        } catch (localError) {
          console.error('🛒 Error saving to localStorage:', localError);
        }
      }

      dispatch(cartSaveError(storableError(e)));
      throw e;
    });
};

export const updateCartItemQuantity = ({ listingId, providerId, quantity }) => (dispatch, getState) => {
  const state = getState();
  const currentCart = state.Cart?.cart || {};

  // Validate quantity is a valid number
  const validQuantity = Number(quantity);
  if (isNaN(validQuantity) || validQuantity <= 0) {
    return dispatch(removeFromCart({ listingId, providerId }));
  }

  const updatedCart = { ...currentCart };
  const providerItems = updatedCart[providerId] || [];
  const itemIndex = providerItems.findIndex(item => item.listingId === listingId);

  if (itemIndex >= 0) {
    updatedCart[providerId] = [...providerItems];
    updatedCart[providerId][itemIndex] = { ...providerItems[itemIndex], quantity: validQuantity };

    dispatch(cartUpdateItemRequest());

    // Use the same save logic as addToCart
    return apiSaveCart(updatedCart)
      .then(response => {
        const savedCart = response?.data || updatedCart;

        // If API returns empty cart but we're trying to save data, use localStorage fallback
        const isEmptyResponse = !savedCart || Object.keys(savedCart).length === 0;
        const hasSaveData = Object.keys(updatedCart).length > 0;

        if (isEmptyResponse && hasSaveData && typeof window !== 'undefined') {
          localStorage.setItem('demo-cart', JSON.stringify(updatedCart));
          console.log('🛒 Fallback: Cart updated in localStorage:', updatedCart);
          dispatch(cartUpdateItemSuccess(updatedCart));
          return updatedCart;
        }

        dispatch(cartUpdateItemSuccess(savedCart));
        return savedCart;
      })
      .catch(e => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('demo-cart', JSON.stringify(updatedCart));
          console.log('🛒 Fallback: Cart updated in localStorage:', updatedCart);
          dispatch(cartUpdateItemSuccess(updatedCart));
          return updatedCart;
        }
        dispatch(cartUpdateItemError(storableError(e)));
        throw e;
      });
  }

  return Promise.resolve(currentCart);
};

export const removeFromCart = ({ listingId, providerId }) => (dispatch, getState) => {
  const state = getState();
  const currentCart = state.Cart?.cart || {};

  const updatedCart = { ...currentCart };
  const providerItems = updatedCart[providerId] || [];
  updatedCart[providerId] = providerItems.filter(item => item.listingId !== listingId);

  // Remove provider if no items left
  if (updatedCart[providerId].length === 0) {
    delete updatedCart[providerId];
  }

  dispatch(cartRemoveItemRequest());

  // Use the same save logic as addToCart
  return apiSaveCart(updatedCart)
    .then(response => {
      const savedCart = response?.data || updatedCart;

      // Always use localStorage fallback for development
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-cart', JSON.stringify(updatedCart));
        console.log('🛒 Fallback: Item removed from localStorage cart:', updatedCart);
      }

      dispatch(cartRemoveItemSuccess(updatedCart));
      return updatedCart;
    })
    .catch(e => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-cart', JSON.stringify(updatedCart));
        console.log('🛒 Fallback: Item removed from localStorage cart:', updatedCart);
        dispatch(cartRemoveItemSuccess(updatedCart));
        return updatedCart;
      }
      dispatch(cartRemoveItemError(storableError(e)));
      throw e;
    });
};

