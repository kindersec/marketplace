import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { useConfiguration } from '../../context/configurationContext';
import { FormattedMessage, useIntl } from '../../util/reactIntl';
import { ensureListing } from '../../util/data';
import { cartLineItems as apiCartLineItems } from '../../util/api';
import { formatMoney } from '../../util/currency';
import { createSlug } from '../../util/urlHelpers';
import { types as sdkTypes } from '../../util/sdkLoader';

const { Money } = sdkTypes;

import {
  H1,
  H3,
  H4,
  LayoutSingleColumn,
  NamedLink,
  Page,
  PrimaryButton,
  SecondaryButton,
  ResponsiveImage,
  IconDelete
} from '../../components';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';

import { loadCart, updateCartItemQuantity, removeFromCart } from '../../ducks/cart.duck';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import css from './CartPage.module.css';

const CartItem = ({ item, listing, providerId, onUpdateQuantity, onRemove, config }) => {
  const intl = useIntl();
  const [isUpdating, setIsUpdating] = useState(false);

  const { listingId, quantity, deliveryMethod } = item;
  const price = listing?.attributes?.price;
  const title = listing?.attributes?.title || 'Product';
  const images = listing?.images || [];
  const firstImage = images.length > 0 ? images[0] : null;



  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity === quantity) return;

    setIsUpdating(true);
    try {
      await onUpdateQuantity({ listingId, providerId, quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await onRemove({ listingId, providerId });
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const itemTotal = price ? formatMoney(intl, new Money(price.amount * quantity, price.currency)) : null;

  return (
    <div className={css.cartItem}>
      <div className={css.itemImage}>
        {firstImage ? (
          <ResponsiveImage
            rootClassName={css.productImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
          />
        ) : (
          <div className={css.noImage}>
            <FormattedMessage id="CartPage.noImage" />
          </div>
        )}
      </div>

      <div className={css.itemDetails}>
        <div className={css.itemInfo}>
          <H4 className={css.itemTitle}>
            <NamedLink
              name="ListingPage"
              params={{ id: listingId, slug: createSlug(title) }}
              className={css.titleLink}
            >
              {title}
            </NamedLink>
          </H4>

          {price && (
            <div className={css.itemPrice}>
              {formatMoney(intl, price)}
            </div>
          )}

          {deliveryMethod && (
            <div className={css.deliveryMethod}>
              <FormattedMessage
                id={`CartPage.deliveryMethod.${deliveryMethod}`}
                defaultMessage={deliveryMethod}
              />
            </div>
          )}
        </div>

        <div className={css.itemControls}>
          <div className={css.quantityControls}>
            <label className={css.quantityLabel}>
              <FormattedMessage id="CartPage.quantity" />
            </label>
            <div className={css.quantitySelector}>
              <button
                className={css.quantityBtn}
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isUpdating || quantity <= 1}
                aria-label={intl.formatMessage({ id: 'CartPage.decreaseQuantity' })}
              >
                −
              </button>
              <span className={css.quantityValue}>{quantity}</span>
              <button
                className={css.quantityBtn}
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                aria-label={intl.formatMessage({ id: 'CartPage.increaseQuantity' })}
              >
                +
              </button>
            </div>
          </div>

          <button
            className={css.removeBtn}
            onClick={handleRemove}
            disabled={isUpdating}
            aria-label={intl.formatMessage({ id: 'CartPage.removeItem' })}
          >
            <IconDelete className={css.removeIcon} />
            <FormattedMessage id="CartPage.remove" />
          </button>
        </div>

        {itemTotal && (
          <div className={css.itemTotal}>
            <FormattedMessage id="CartPage.itemTotal" />: {itemTotal}
          </div>
        )}
      </div>
    </div>
  );
};

const CartPageComponent = props => {
  const config = useConfiguration();
  const intl = useIntl();
  const { cart, loadCart, listingsById, updateCartItemQuantity, removeFromCart } = props;

  useEffect(() => {
    // Load cart then fetch any missing listings to show titles
    loadCart().then(cartObj => {
      // Debug log cart content
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.log('CartPage loadCart(): cart object', cartObj);
      }
      const allRefs = Object.values(cartObj || {})
        .flat()
        .map(it => ({ id: { uuid: it.listingId }, type: 'listing' }));



      if (allRefs.length > 0) {
        props.fetchMissingListings(allRefs);
      }
    });
  }, []);

  const providerIds = Object.keys(cart || {});
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('CartPage render(): providerIds', providerIds);
  }

  const providerGroups = providerIds.map(pid => ({
    providerId: pid,
    items: cart[pid] || [],
    listings: (cart[pid] || []).map(item => listingsById[item.listingId?.uuid || item.listingId])
  }));

  // Calculate totals
  const grandTotal = providerGroups.reduce((total, group) => {
    const groupTotal = group.items.reduce((groupSum, item) => {
      const listing = listingsById[item.listingId?.uuid || item.listingId];
      const price = listing?.attributes?.price;
      return groupSum + (price ? price.amount * item.quantity : 0);
    }, 0);
    return total + groupTotal;
  }, 0);

  const totalItems = providerGroups.reduce((total, group) => {
    return total + group.items.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  const currency = providerGroups[0]?.items[0] ?
    listingsById[providerGroups[0].items[0].listingId?.uuid || providerGroups[0].items[0].listingId]?.attributes?.price?.currency :
    config.currency;

  return (
    <Page title="Cart" robots="noindex, nofollow">
      <LayoutSingleColumn topbar={<TopbarContainer />} footer={<FooterContainer />}>
        <div className={css.root}>
          <div className={css.header}>
            <H1 className={css.heading}>
            <FormattedMessage id="CartPage.title" />
            </H1>
            {totalItems > 0 && (
              <div className={css.itemCount}>
                <FormattedMessage
                  id="CartPage.itemCount"
                  values={{ count: totalItems }}
                />
              </div>
            )}
          </div>

          {providerGroups.length === 0 ? (
            <div className={css.emptyCart}>
              <div className={css.emptyContent}>
                <H3 className={css.emptyTitle}>
                  <FormattedMessage id="CartPage.empty" />
                </H3>
                <p className={css.emptyDescription}>
                  <FormattedMessage id="CartPage.emptyDescription" />
                </p>
                <PrimaryButton className={css.continueShoppingBtn}>
                  <NamedLink name="SearchPage" className={css.continueShopping}>
                    <FormattedMessage id="CartPage.startShopping" />
                  </NamedLink>
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className={css.cartContent}>
              <div className={css.cartItems}>
                {providerGroups.map(group => (
              <div key={group.providerId} className={css.providerGroup}>
                    <H3 className={css.providerHeader}>
                      <FormattedMessage id="CartPage.soldBy" />
                      <span className={css.providerName}>
                        {/* You can enhance this to show actual seller name */}
                        <FormattedMessage id="CartPage.seller" />
                      </span>
                    </H3>

                    <div className={css.providerItems}>
                      {group.items.map((item, idx) => {
                        const listing = ensureListing(listingsById[item.listingId?.uuid || item.listingId]);
                    return (
                          <CartItem
                            key={`${item.listingId?.uuid || item.listingId}_${idx}`}
                            item={item}
                            listing={listing}
                            providerId={group.providerId}
                            onUpdateQuantity={updateCartItemQuantity}
                            onRemove={removeFromCart}
                            config={config}
                          />
                    );
                  })}
                    </div>
                  </div>
                ))}
              </div>

              <div className={css.cartSummary}>
                <div className={css.summaryCard}>
                  <H3 className={css.summaryTitle}>
                    <FormattedMessage id="CartPage.orderSummary" />
                  </H3>

                  <div className={css.summaryRow}>
                    <span><FormattedMessage id="CartPage.subtotal" /></span>
                    <span>
                      {grandTotal > 0 && currency ? formatMoney(intl, new Money(grandTotal, currency)) : '—'}
                    </span>
                  </div>

                  <div className={css.summaryRow}>
                    <span><FormattedMessage id="CartPage.shipping" /></span>
                    <span><FormattedMessage id="CartPage.calculatedAtCheckout" /></span>
                  </div>

                  <div className={css.summaryDivider} />

                  <div className={css.summaryTotal}>
                    <span><FormattedMessage id="CartPage.total" /></span>
                    <span>
                      {grandTotal > 0 && currency ? formatMoney(intl, new Money(grandTotal, currency)) : '—'}
                    </span>
                  </div>

                  <div className={css.checkoutActions}>
                    <PrimaryButton className={css.checkoutBtn}>
                      <FormattedMessage id="CartPage.proceedToCheckout" />
                    </PrimaryButton>

                    <SecondaryButton className={css.continueShoppingBtn}>
                      <NamedLink name="SearchPage" className={css.continueShopping}>
                    <FormattedMessage id="CartPage.continueShopping" />
                  </NamedLink>
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </LayoutSingleColumn>
    </Page>
  );
};

const mapStateToProps = state => {
  const { cart = {} } = state.Cart || {};
  // Collect listing refs from cart
  const refs = Object.values(cart)
    .flat()
    .map(it => ({ id: { uuid: it.listingId }, type: 'listing' }));
  // Use marketplaceData selector to denormalize
  const { getMarketplaceEntities } = require('../../ducks/marketplaceData.duck');
  const listings = getMarketplaceEntities(state, refs) || [];
  const listingsById = listings.reduce((m, l) => ({ ...m, [l?.id?.uuid]: l }), {});
  return { cart, listingsById };
};

const mapDispatchToProps = dispatch => ({
  loadCart: () => dispatch(loadCart()),
  updateCartItemQuantity: (params) => dispatch(updateCartItemQuantity(params)),
  removeFromCart: (params) => dispatch(removeFromCart(params)),
  fetchMissingListings: refs =>
    dispatch((innerDispatch, getState, sdk) => {
      const state = getState();
      const existing = require('../../ducks/marketplaceData.duck').getMarketplaceEntities(
        state,
        refs
      );
      const existingIds = new Set((existing || []).map(l => l?.id?.uuid));
      const toFetch = refs
        .map(r => r?.id?.uuid)
        .filter(uuid => uuid && !existingIds.has(uuid));
      const promises = Array.from(new Set(toFetch)).map(uuid =>
        sdk.listings.show({
          id: uuid,
          include: ['author', 'images'],
          'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x']
        })
      );
      return Promise.all(promises)
        .then(responses => {
          responses.forEach(resp => innerDispatch(addMarketplaceEntities(resp)));
        })
        .catch(error => {
          console.error('Error fetching listings for cart:', error);
        });
    }),
});

const CartPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartPageComponent);

export default CartPage;


