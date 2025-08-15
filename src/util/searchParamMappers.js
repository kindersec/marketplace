import { constructQueryParamName } from './search';
import { createSlug } from './urlHelpers';

// Map incoming public query params to internal "pub_" params for existing logic
export const normalizeIncomingSearchParams = (params, filterConfigs) => {
  const { listingFieldsConfig, defaultFiltersConfig } = filterConfigs || {};

  const listingFieldFiltersConfig = (listingFieldsConfig || []).filter(
    config => config.filterConfig?.indexForSearch
  );
  const listingFieldParamNames = listingFieldFiltersConfig.map(f =>
    constructQueryParamName(f.key, f.scope)
  );
  const builtInFilterParamNames = (defaultFiltersConfig || []).map(f => {
    return ['category', 'listingType'].includes(f.schemaType) ? `pub_${f.key}` : f.key;
  });
  const allowedInternalParams = new Set([...listingFieldParamNames, ...builtInFilterParamNames]);

  return Object.entries(params || {}).reduce((acc, [key, value]) => {
    if (key === 'category') {
      const v = typeof value === 'string' ? value : `${value}`;
      return { ...acc, pub_categoryLevel1: createSlug(v) };
    }
    if (key === 'subcategory') {
      const v = typeof value === 'string' ? value : `${value}`;
      return { ...acc, pub_categoryLevel2: createSlug(v) };
    }
    if (key === 'brand') {
      const v = typeof value === 'string' ? value : `${value}`;
      return { ...acc, pub_brand: createSlug(v) };
    }
    if (key.startsWith('pub_') || key.startsWith('meta_')) {
      return { ...acc, [key]: value };
    }
    const internalKeyCandidate = `pub_${key}`;
    if (allowedInternalParams.has(internalKeyCandidate)) {
      return { ...acc, [internalKeyCandidate]: value };
    }
    return { ...acc, [key]: value };
  }, {});
};

// Map internal params to public outward query params (for building URLs)
export const toPublicQueryParams = (params /*, filterConfigs */) => {
  return Object.entries(params || {}).reduce((acc, [key, value]) => {
    if (key === 'pub_categoryLevel1') {
      return { ...acc, category: value };
    }
    if (key === 'pub_categoryLevel2') {
      return { ...acc, subcategory: value };
    }
    if (key === 'pub_brand') {
      return { ...acc, brand: value };
    }
    const categoryLevelMatch = key.match(/^pub_categoryLevel(\d+)$/);
    if (categoryLevelMatch) {
      const level = categoryLevelMatch[1];
      return { ...acc, [`categoryLevel${level}`]: value };
    }
    if (key.startsWith('pub_')) {
      const withoutPrefix = key.slice(4);
      return { ...acc, [withoutPrefix]: value };
    }
    return { ...acc, [key]: value };
  }, {});
};


