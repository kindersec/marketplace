import React, { useEffect, useState } from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';
import { propTypes } from '../../../util/types';
import { numberAtLeast, required } from '../../../util/validators';
import { PURCHASE_PROCESS_NAME } from '../../../transactions/transaction';

import {
  Form,
  FieldSelect,
  FieldTextInput,
  InlineTextButton,
  PrimaryButton,
  H3,
  H6,
  NamedLink,
} from '../../../components';

import EstimatedCustomerBreakdownMaybe from '../EstimatedCustomerBreakdownMaybe';

import FetchLineItemsError from '../FetchLineItemsError/FetchLineItemsError.js';

import css from './ProductOrderForm.module.css';

// Browsers can't render huge number of select options.
// (stock is shown inside select element)
// Note: input element could allow ordering bigger quantities
const MAX_QUANTITY_FOR_DROPDOWN = 100;

const handleFetchLineItems = ({
  quantity,
  deliveryMethod,
  displayDeliveryMethod,
  listingId,
  isOwnListing,
  fetchLineItemsInProgress,
  onFetchTransactionLineItems,
}) => {
  const stockReservationQuantity = Number.parseInt(quantity, 10);
  const deliveryMethodMaybe = deliveryMethod ? { deliveryMethod } : {};
  const isBrowser = typeof window !== 'undefined';
  if (
    isBrowser &&
    stockReservationQuantity &&
    (!displayDeliveryMethod || deliveryMethod) &&
    !fetchLineItemsInProgress
  ) {
    onFetchTransactionLineItems({
      orderData: { stockReservationQuantity, ...deliveryMethodMaybe },
      listingId,
      isOwnListing,
    });
  }
};

const DeliveryMethodMaybe = props => {
  const {
    displayDeliveryMethod,
    hasMultipleDeliveryMethods,
    deliveryMethod,
    hasStock,
    formId,
    intl,
  } = props;
  const showDeliveryMethodSelector = displayDeliveryMethod && hasMultipleDeliveryMethods;
  const showSingleDeliveryMethod = displayDeliveryMethod && deliveryMethod;
  return !hasStock ? null : showDeliveryMethodSelector ? (
    <FieldSelect
      id={`${formId}.deliveryMethod`}
      className={css.deliveryField}
      name="deliveryMethod"
      label={intl.formatMessage({ id: 'ProductOrderForm.deliveryMethodLabel' })}
      validate={required(intl.formatMessage({ id: 'ProductOrderForm.deliveryMethodRequired' }))}
    >
      <option disabled value="">
        {intl.formatMessage({ id: 'ProductOrderForm.selectDeliveryMethodOption' })}
      </option>
      <option value={'pickup'}>
        {intl.formatMessage({ id: 'ProductOrderForm.pickupOption' })}
      </option>
      <option value={'shipping'}>
        {intl.formatMessage({ id: 'ProductOrderForm.shippingOption' })}
      </option>
    </FieldSelect>
  ) : showSingleDeliveryMethod ? (
    <div className={css.deliveryField}>
      <H3 rootClassName={css.singleDeliveryMethodLabel}>
        {intl.formatMessage({ id: 'ProductOrderForm.deliveryMethodLabel' })}
      </H3>
      <p className={css.singleDeliveryMethodSelected}>
        {deliveryMethod === 'shipping'
          ? intl.formatMessage({ id: 'ProductOrderForm.shippingOption' })
          : intl.formatMessage({ id: 'ProductOrderForm.pickupOption' })}
      </p>
      <FieldTextInput
        id={`${formId}.deliveryMethod`}
        className={css.deliveryField}
        name="deliveryMethod"
        type="hidden"
      />
    </div>
  ) : null;
};

// Custom quantity selector component
const QuantitySelector = props => {
  const { quantity, onQuantityChange, maxQuantity, disabled } = props;

  const handleIncrement = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className={css.quantitySelector}>
      <button
        type="button"
        className={css.quantityButton}
        onClick={handleDecrement}
        disabled={quantity <= 1 || disabled}
        aria-label="Decrease quantity"
      >
        <span className={css.quantityButtonText}>−</span>
      </button>
      <span className={css.quantityDisplay}>{quantity}</span>
      <button
        type="button"
        className={css.quantityButton}
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity || disabled}
        aria-label="Increase quantity"
      >
        <span className={css.quantityButtonText}>+</span>
      </button>
    </div>
  );
};

// Shipping information component
const ShippingInfo = props => {
  const { publicData, intl, price } = props;
  const { shippingPriceInSubunitsOneItem, shippingPriceInSubunitsAdditionalItems, shippingConditions } = publicData || {};
  
  if (!shippingPriceInSubunitsOneItem && !shippingPriceInSubunitsAdditionalItems) {
    return null;
  }

  const formatShippingPrice = (priceInSubunits) => {
    if (!priceInSubunits) return null;
    // Convert subunits to currency (assuming 100 subunits = 1 currency unit)
    const priceValue = priceInSubunits / 100;
    const currency = price?.currency || 'USD';
    return intl.formatNumber(priceValue, { style: 'currency', currency });
  };

  const firstItemPrice = formatShippingPrice(shippingPriceInSubunitsOneItem);
  const additionalItemPrice = formatShippingPrice(shippingPriceInSubunitsAdditionalItems);

  return (
    <div className={css.shippingInfo}>
      <h4 className={css.shippingTitle}>
        <FormattedMessage id="ProductOrderForm.shippingInfoTitle" defaultMessage="Shipping Information" />
      </h4>
      <div className={css.shippingDetails}>
        {firstItemPrice && (
          <p className={css.shippingPrice}>
            <FormattedMessage
              id="ProductOrderForm.shippingFirstItem"
              defaultMessage="First item: {price}"
              values={{ price: firstItemPrice }}
            />
          </p>
        )}
        {additionalItemPrice && (
          <p className={css.shippingPrice}>
            <FormattedMessage
              id="ProductOrderForm.shippingAdditionalItems"
              defaultMessage="Additional items: {price} each"
              values={{ price: additionalItemPrice }}
            />
          </p>
        )}
        {shippingConditions && (
          <p className={css.shippingConditions}>{shippingConditions}</p>
        )}
      </div>
    </div>
  );
};

// Reviews count component
const ReviewsCount = props => {
  const { reviews, listingId, intl } = props;
  const reviewsCount = reviews?.length || 0;

  const handleReviewsClick = () => {
    // Scroll to reviews section
    const reviewsElement = document.querySelector('.sectionReviews');
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={css.reviewsCount}>
      <button
        type="button"
        className={css.reviewsLink}
        onClick={handleReviewsClick}
      >
        <FormattedMessage
          id="ProductOrderForm.reviewsCount"
          defaultMessage="{count} reviews"
          values={{ count: reviewsCount }}
        />
      </button>
    </div>
  );
};

// Policy links component
const PolicyLinks = props => {
  const { intl } = props;

  return (
    <div className={css.policyLinks}>
      <NamedLink name="ShippingDeliveryPolicyPage" className={css.policyLink}>
        <FormattedMessage id="ProductOrderForm.shippingPolicy" defaultMessage="Shipping Policy" />
      </NamedLink>
      <span className={css.policySeparator}>•</span>
      <NamedLink name="ReturnRefundPolicyPage" className={css.policyLink}>
        <FormattedMessage id="ProductOrderForm.refundPolicy" defaultMessage="Refund Policy" />
      </NamedLink>
    </div>
  );
};

// Vendor information component
const VendorInfo = props => {
  const { author, intl } = props;

  if (!author) {
    return null;
  }

  const authorDisplayName = author.attributes?.profile?.displayName || 'Vendor';

  return (
    <div className={css.vendorInfo}>
      <span className={css.vendorLabel}>
        <FormattedMessage id="ProductOrderForm.soldBy" defaultMessage="Sold by" />
      </span>
      <NamedLink
        name="ProfilePage"
        params={{ id: author.id?.uuid }}
        className={css.vendorLink}
      >
        {authorDisplayName}
      </NamedLink>
    </div>
  );
};

const renderForm = formRenderProps => {
  const [mounted, setMounted] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);
  const {
    // FormRenderProps from final-form
    handleSubmit,
    form: formApi,

    // Custom props passed to the form component
    intl,
    formId,
    currentStock,
    allowOrdersOfMultipleItems,
    hasMultipleDeliveryMethods,
    displayDeliveryMethod,
    listingId,
    isOwnListing,
    onFetchTransactionLineItems,
    onContactUser,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    price,
    payoutDetailsWarning,
    marketplaceName,
    values,
    listing,
    reviews,
  } = formRenderProps;

  // Add missing variables that are referenced in the form
  const showContactUser = typeof onContactUser === 'function';
  const contactSellerLink = showContactUser ? (
    <InlineTextButton onClick={onContactUser}>
      <FormattedMessage id="ProductOrderForm.finePrintNoStockLinkText" />
    </InlineTextButton>
  ) : null;

  useEffect(() => {
    setMounted(true);

    const { quantity, deliveryMethod } = values;
    if (quantity) {
      setLocalQuantity(Number.parseInt(quantity, 10) || 1);
    } else if (hasOneItemLeft || !allowOrdersOfMultipleItems) {
      setLocalQuantity(1);
    }

    // Always fetch line items on mount to show shipping costs automatically
    const initialQuantity = quantity || (hasOneItemLeft || !allowOrdersOfMultipleItems ? 1 : 1);
    const initialDeliveryMethod = deliveryMethod || (shippingEnabled ? 'shipping' : pickupEnabled ? 'pickup' : undefined);
    
    if (mounted) {
      handleFetchLineItems({
        quantity: initialQuantity.toString(),
        deliveryMethod: initialDeliveryMethod,
        displayDeliveryMethod,
        listingId,
        isOwnListing,
        fetchLineItemsInProgress,
        onFetchTransactionLineItems,
      });
    }
  }, [mounted, values, hasOneItemLeft, allowOrdersOfMultipleItems, displayDeliveryMethod, listingId, isOwnListing, fetchLineItemsInProgress, onFetchTransactionLineItems]);

  const handleOnChange = formValues => {
    const { quantity, deliveryMethod } = formValues.values;
    if (mounted) {
      handleFetchLineItems({
        quantity,
        deliveryMethod,
        listingId,
        isOwnListing,
        fetchLineItemsInProgress,
        onFetchTransactionLineItems,
      });
    }
  };

  // For cart: directly submit to parent if quantity (and deliveryMethod if needed) is valid
  const handleFormSubmit = e => {
    const { deliveryMethod } = values || {};
    const finalQuantity = hasOneItemLeft || !allowOrdersOfMultipleItems ? 1 : localQuantity;

    if (!finalQuantity || finalQuantity < 1) {
      e.preventDefault();
      return;
    }
    if (displayDeliveryMethod && !deliveryMethod) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const formValues = { quantity: finalQuantity.toString(), deliveryMethod };
    handleSubmit(formValues);
  };

  const handleQuantityChange = (newQuantity) => {
    setLocalQuantity(newQuantity);
    formApi.change('quantity', newQuantity.toString());

    // Fetch line items when quantity changes
    if (mounted) {
      handleFetchLineItems({
        quantity: newQuantity.toString(),
        deliveryMethod: values?.deliveryMethod,
        displayDeliveryMethod,
        listingId,
        isOwnListing,
        fetchLineItemsInProgress,
        onFetchTransactionLineItems,
      });
    }
  };

  const showBreakdown = lineItems && lineItems.length > 0;
  const breakdownData = lineItems ? lineItems[0] : null;
  const quantityRequiredMsg = intl.formatMessage({ id: 'ProductOrderForm.quantityRequired' });

  const hasNoStockLeft = typeof currentStock != null && currentStock === 0;
  const hasStock = currentStock && currentStock > 0;
  const hasOneItemLeft = currentStock === 1;
  const selectableStock =
    currentStock > MAX_QUANTITY_FOR_DROPDOWN ? MAX_QUANTITY_FOR_DROPDOWN : currentStock;
  const quantities = hasStock ? [...Array(selectableStock).keys()].map(i => i + 1) : [];

  const submitInProgress = fetchLineItemsInProgress;
  const submitDisabled = !hasStock;

  const publicData = listing?.attributes?.publicData || {};

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormSpy subscription={{ values: true }} onChange={handleOnChange} />

      {/* Delivery method selector */}
      <DeliveryMethodMaybe
        displayDeliveryMethod={displayDeliveryMethod}
        hasMultipleDeliveryMethods={hasMultipleDeliveryMethods}
        deliveryMethod={values?.deliveryMethod}
        hasStock={hasStock}
        formId={formId}
        intl={intl}
      />

      {/* Shipping information - always show if available */}
      <ShippingInfo publicData={publicData} intl={intl} price={price} />

      {/* Reviews count and vendor info on same line */}
      <div className={css.reviewsAndVendorRow}>
        <ReviewsCount reviews={reviews} listingId={listingId} intl={intl} />
        <VendorInfo author={listing?.author} intl={intl} />
      </div>

      {/* Policy links */}
      <PolicyLinks intl={intl} />

      {showBreakdown ? (
        <div className={css.breakdownWrapper}>
          <H6 as="h3" className={css.bookingBreakdownTitle}>
            <FormattedMessage id="ProductOrderForm.breakdownTitle" />
          </H6>
          <hr className={css.totalDivider} />
          <EstimatedCustomerBreakdownMaybe
            breakdownData={breakdownData}
            lineItems={lineItems}
            currency={price.currency}
            marketplaceName={marketplaceName}
            processName={PURCHASE_PROCESS_NAME}
          />
        </div>
      ) : null}

      <FetchLineItemsError error={fetchLineItemsError} />

      {/* Quantity selector and Add to Cart button on same line */}
      <div className={css.quantityAndButtonRow}>
        {/* Custom quantity selector */}
        {hasStock && allowOrdersOfMultipleItems && !hasOneItemLeft ? (
          <div className={css.quantitySection}>
            <label className={css.quantityLabel}>
              <FormattedMessage id="ProductOrderForm.quantityLabel" />
            </label>
            <QuantitySelector
              quantity={localQuantity}
              onQuantityChange={handleQuantityChange}
              maxQuantity={selectableStock}
              disabled={!hasStock}
            />
          </div>
        ) : hasStock && (hasOneItemLeft || !allowOrdersOfMultipleItems) ? (
          <div className={css.quantitySection}>
            <label className={css.quantityLabel}>
              <FormattedMessage id="ProductOrderForm.quantityLabel" />
            </label>
            <div className={css.singleItemQuantity}>
              <span className={css.quantityDisplay}>1</span>
            </div>
            <FieldTextInput
              id={`${formId}.quantity`}
              className={css.hiddenQuantityField}
              name="quantity"
              type="hidden"
              value="1"
              validate={numberAtLeast(quantityRequiredMsg, 1)}
            />
          </div>
        ) : null}

        <div className={css.submitButton}>
          <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
            {hasStock ? (
              <FormattedMessage id="ProductOrderForm.ctaButtonAddToCart" />
            ) : (
              <FormattedMessage id="ProductOrderForm.ctaButtonNoStock" />
            )}
          </PrimaryButton>
        </div>
      </div>
      <p className={css.finePrint}>
        {payoutDetailsWarning ? (
          payoutDetailsWarning
        ) : hasStock && isOwnListing ? (
          <FormattedMessage id="ProductOrderForm.ownListing" />
        ) : hasStock ? (
          <FormattedMessage id="ProductOrderForm.finePrint" />
        ) : showContactUser ? (
          <FormattedMessage id="ProductOrderForm.finePrintNoStock" values={{ contactSellerLink }} />
        ) : null}
      </p>
    </Form>
  );
};

const ProductOrderForm = props => {
  const intl = useIntl();
  const {
    price,
    currentStock,
    pickupEnabled,
    shippingEnabled,
    displayDeliveryMethod,
    allowOrdersOfMultipleItems,
  } = props;

  if (displayDeliveryMethod && !pickupEnabled && !shippingEnabled) {
    return (
      <p className={css.error}>
        <FormattedMessage id="ProductOrderForm.noDeliveryMethodSet" />
      </p>
    );
  }

  const hasOneItemLeft = currentStock && currentStock === 1;
  const hasOneItemMode = !allowOrdersOfMultipleItems && currentStock > 0;
  const quantityMaybe = hasOneItemLeft || hasOneItemMode ? { quantity: '1' } : {};
  const deliveryMethodMaybe =
    shippingEnabled && !pickupEnabled
      ? { deliveryMethod: 'shipping' }
      : !shippingEnabled && pickupEnabled
      ? { deliveryMethod: 'pickup' }
      : !shippingEnabled && !pickupEnabled
      ? { deliveryMethod: 'none' }
      : {};
  const hasMultipleDeliveryMethods = pickupEnabled && shippingEnabled;
  const initialValues = { ...quantityMaybe, ...deliveryMethodMaybe };

  return (
    <FinalForm
      initialValues={initialValues}
      hasMultipleDeliveryMethods={hasMultipleDeliveryMethods}
      displayDeliveryMethod={displayDeliveryMethod}
      {...props}
      intl={intl}
      render={renderForm}
    />
  );
};

export default ProductOrderForm;
