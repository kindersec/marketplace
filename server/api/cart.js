const { getSdk, handleError, serialize } = require('../api-util/sdk');

// GET /api/cart -> returns current user's privateData.cart or an empty object
// POST /api/cart -> sets current user's privateData.cart to provided object

module.exports = (req, res) => {
  const sdk = getSdk(req, res);

  if (req.method === 'GET') {
    // Support /api/cart and /api/cart?debug=true for raw debug
    const isDebug = req.query && (req.query.debug === '1' || req.query.debug === 'true');
    sdk.currentUser
      .show({})
      .then(response => {
        const user = response.data.data;
        const userId = user?.id?.uuid;
        const raw = user?.attributes?.privateData?.cart || {};
        // Normalize stored shape to object-of-arrays for client
        const plain = typeof raw === 'object' ? JSON.parse(JSON.stringify(raw)) : {};
        let normalized = {};
        if (Array.isArray(plain.items)) {
          // Convert array-of-items -> providerId buckets
          normalized = plain.items.reduce((acc, it) => {
            const providerId = it?.providerId;
            if (!providerId) return acc;
            const list = acc[providerId] || [];
            list.push({
              listingId: it?.listingId,
              quantity: it?.quantity,
              deliveryMethod: it?.deliveryMethod,
              priceVariantName: it?.priceVariantName,
            });
            acc[providerId] = list;
            return acc;
          }, {});
        } else {
          // Already providerId -> items[] shape
          normalized = plain;
        }
        try {
          const providerCount = Object.keys(normalized || {}).length;
          console.log('🛒 SERVER: Loaded cart for current user. Providers:', providerCount);
          console.log('🛒 SERVER: Returning cart data:', JSON.stringify(normalized, null, 2));
        } catch (e) {
          console.error('🛒 SERVER: Error logging cart data:', e);
        }
        if (isDebug) {
          res.status(200).json({ userId, cart: normalized, raw }).end();
          return;
        }
        res
          .status(200)
          .set('Content-Type', 'application/transit+json')
          .send(serialize({ data: normalized }))
          .end();
      })
      .catch(e => handleError(res, e));
    return;
  }

  if (req.method === 'POST') {
    const { cart } = req.body || {};
    if (cart == null || typeof cart !== 'object') {
      res.status(400).json({ error: 'Invalid cart payload' }).end();
      return;
    }
    // Debug: log incoming cart size (safe)
    try {
      const providerCount = Object.keys(cart || {}).length;
      console.log('🛒 SERVER: Saving cart for current user. Providers:', providerCount);
      console.log('🛒 SERVER: Incoming cart data:', JSON.stringify(cart, null, 2));
    } catch (e) {
      console.error('🛒 SERVER: Error logging cart data:', e);
    }

    // Read current privateData to preserve other keys
    sdk.currentUser
      .show({})
      .then(response => {
        const user = response.data.data;
        const existing = user?.attributes?.privateData || {};
        const existingRawCart = existing?.cart && typeof existing.cart === 'object' ? existing.cart : {};
        // Convert existing to items[]
        const existingItems = Array.isArray(existingRawCart.items)
          ? existingRawCart.items
          : Object.entries(existingRawCart).flatMap(([providerId, items]) => {
              const list = Array.isArray(items) ? items : [];
              return list.map(it => ({ providerId, ...it }));
            });

        // Convert incoming cart (providerId -> items[]) to items[]
        const incomingItems = Object.entries(cart || {}).flatMap(([providerId, items]) => {
          const list = Array.isArray(items) ? items : [];
          return list.map(it => ({ providerId, ...it }));
        });

        // Replace cart instead of merging to avoid duplicates
        const nextPrivateData = { ...existing, cart: { items: incomingItems } };
        return sdk.currentUser.updateProfile({ privateData: nextPrivateData }, { expand: true });
      })
      .then(() => {
        console.log('🛒 SERVER: Cart saved successfully');
        // Return the normalized latest cart snapshot for easier debugging on client
        return sdk.currentUser.show({}).then(resp2 => {
          const u2 = resp2.data.data;
          const raw2 = u2?.attributes?.privateData?.cart || {};
          const plain2 = typeof raw2 === 'object' ? JSON.parse(JSON.stringify(raw2)) : {};
          let normalized2 = {};
          if (Array.isArray(plain2.items)) {
            normalized2 = plain2.items.reduce((acc, it) => {
              const providerId = it?.providerId;
              if (!providerId) return acc;
              const list = acc[providerId] || [];
              list.push({
                listingId: it?.listingId,
                quantity: it?.quantity,
                deliveryMethod: it?.deliveryMethod,
                priceVariantName: it?.priceVariantName,
              });
              acc[providerId] = list;
              return acc;
            }, {});
          } else {
            normalized2 = plain2;
          }
          res
            .status(200)
            .set('Content-Type', 'application/transit+json')
            .send(serialize({ data: normalized2 }))
            .end();
        });
      })
      .catch(e => handleError(res, e));
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' }).end();
};


