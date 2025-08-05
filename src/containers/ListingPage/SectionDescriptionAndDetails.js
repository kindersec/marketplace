import React from 'react';
import SectionTextMaybe from './SectionTextMaybe';
import SectionDetailsMaybe from './SectionDetailsMaybe';
import SectionMultiEnumMaybe from './SectionMultiEnumMaybe';
import SectionYoutubeVideoMaybe from './SectionYoutubeVideoMaybe';
import { SCHEMA_TYPE_MULTI_ENUM, SCHEMA_TYPE_TEXT, SCHEMA_TYPE_YOUTUBE } from '../../util/types';
import { isFieldForCategory, pickCategoryFields, pickCustomFieldProps } from '../../util/fieldHelpers.js';
import css from './ListingPage.module.css';

const SectionDescriptionAndDetails = props => {
  const {
    text,
    heading,
    showAsIngress = false,
    enableMarkdown = false,
    publicData,
    metadata = {},
    listingFieldConfigs,
    categoryConfiguration,
    intl
  } = props;

  // Handle category-based field filtering like CustomListingFields does
  const isFieldForSelectedCategories = fieldConfig => {
    if (!categoryConfiguration) {
      return true; // Show all fields if no category configuration
    }

    const { key: categoryPrefix, categories: listingCategoriesConfig } = categoryConfiguration;
    const categoriesObj = pickCategoryFields(publicData, categoryPrefix, 1, listingCategoriesConfig);
    const currentCategories = Object.values(categoriesObj);

    const isTargetCategory = isFieldForCategory(currentCategories, fieldConfig);
    return isTargetCategory;
  };

  // Get custom fields for the right column
  const propsForCustomFields = pickCustomFieldProps(
    publicData,
    metadata,
    listingFieldConfigs,
    'listingType',
    isFieldForSelectedCategories
  ) || [];

  return (
    <div className={css.sectionDescriptionAndDetailsContainer}>
      <div className={css.descriptionColumn}>
        <SectionTextMaybe
          text={text}
          heading={heading}
          showAsIngress={showAsIngress}
          enableMarkdown={enableMarkdown}
        />
      </div>
      <div className={css.detailsColumn}>
        <SectionDetailsMaybe
          publicData={publicData}
          metadata={metadata}
          listingFieldConfigs={listingFieldConfigs}
          isFieldForCategory={isFieldForSelectedCategories}
          intl={intl}
        />
        {propsForCustomFields.map(customFieldProps => {
          const { schemaType, key, ...fieldProps } = customFieldProps;
          return schemaType === SCHEMA_TYPE_MULTI_ENUM ? (
            <SectionMultiEnumMaybe key={key} {...fieldProps} />
          ) : schemaType === SCHEMA_TYPE_TEXT ? (
            <SectionTextMaybe key={key} {...fieldProps} />
          ) : schemaType === SCHEMA_TYPE_YOUTUBE ? (
            <SectionYoutubeVideoMaybe key={key} {...fieldProps} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SectionDescriptionAndDetails;
