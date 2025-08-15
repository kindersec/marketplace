const { transactionLineItems } = require('../api-util/lineItems');
const { getSdk, handleError, serialize, fetchCommission } = require('../api-util/sdk');
const { constructValidLineItems } = require('../api-util/lineItemHelpers');

// POST /api/cart-line-items
// Body: { items: [{ listingId, isOwnListing, orderData }], providerId? }
// Returns: merged array of valid line items across all listings

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' }).end();
    return;
  }

  const { items } = req.body || {};
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: 'Invalid items payload' }).end();
    return;
  }

  const sdk = getSdk(req, res);

  const listingFetches = items.map(({ listingId, isOwnListing }) => {
    const showFn = isOwnListing ? sdk.ownListings.show : sdk.listings.show;
    return showFn({ id: listingId });
  });

  Promise.all([Promise.all(listingFetches), fetchCommission(sdk)])
    .then(([listingResponses, commissionResp]) => {
      const commissionAsset = commissionResp.data.data[0];
      const { providerCommission, customerCommission } =
        commissionAsset?.type === 'jsonAsset' ? commissionAsset.attributes.data : {};

      const lineItemsArrays = listingResponses.map((resp, idx) => {
        const listing = resp.data.data;
        const { orderData } = items[idx] || {};
        return transactionLineItems(listing, orderData, providerCommission, customerCommission);
      });

      const merged = constructValidLineItems(lineItemsArrays.flat());
      res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send(serialize({ data: merged }))
        .end();
    })
    .catch(e => handleError(res, e));
};


