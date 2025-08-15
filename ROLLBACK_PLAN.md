# Rollback plan for Shopping Cart groundwork

This document describes how to revert the minimal cart groundwork added in this iteration.

## Files added
- `server/api/cart.js`
- `server/api/cart-line-items.js`
- `src/ducks/cart.duck.js`
- `src/containers/CartPage/CartPage.js`
- `src/containers/CartPage/CartPage.module.css`
- Route registration for CartPage in `src/routing/routeConfiguration.js`
- API client helpers in `src/util/api.js` (`getCart`, `saveCart`, `cartLineItems`)
- API router registrations in `server/apiRouter.js` (GET/POST `/api/cart`, POST `/api/cart-line-items`)

## How to rollback
1. Delete added files:
   - `server/api/cart.js`
   - `server/api/cart-line-items.js`
   - `src/ducks/cart.duck.js`
   - `src/containers/CartPage/CartPage.js`
   - `src/containers/CartPage/CartPage.module.css`

2. Edit `server/apiRouter.js` and remove:
   - `const cartHandler = require('./api/cart');`
   - `const cartLineItems = require('./api/cart-line-items');`
   - Route lines:
     - `router.get('/cart', cartHandler);`
     - `router.post('/cart', cartHandler);`
     - `router.post('/cart-line-items', cartLineItems);`

3. Edit `src/util/api.js` and remove exports:
   - `getCart`, `saveCart`, `cartLineItems`

4. Edit `src/routing/routeConfiguration.js`:
   - Remove the dynamic import for `CartPage`
   - Remove the route object for `{ path: '/cart', name: 'CartPage', ... }`

## Data impact
- We store cart data in `currentUser.attributes.privateData.cart`.
- Leaving this key in user private data is safe. It will simply be unused after rollback.

## Verification after rollback
- Restart the dev server.
- Ensure `/api/cart` and `/api/cart-line-items` return 404.
- Navigate to `/cart` and ensure it redirects or shows Not Found (route removed).

## No external migrations
- No database migrations or hosted config changes were performed in this step.


