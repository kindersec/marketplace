const sharetribeIntegrationSdk = require('sharetribe-flex-integration-sdk');
const { Client } = require('@elastic/elasticsearch');
const { OpenAI } = require('openai');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

// Import configuration
const config = require('./config.json');

// Utility functions for configuration-based detection
function detectBrand(productBrand) {
  if (!productBrand) return 'generic';

  const brandLower = productBrand.toLowerCase().trim();

  // Check exact matches first
  if (config.brands.includes(brandLower)) {
    return brandLower;
  }

  // Check if brand contains any of the configured brands
  for (const brand of config.brands) {
    if (brandLower.includes(brand) || brand.includes(brandLower)) {
      return brand;
    }
  }

  return 'generic';
}

function getDefaultCategoryForBrand(brandKey) {
  // Simple mapping for common brands
  const brandCategoryMap = {
    'aqara': 'sensors',
    'philips': 'lights',
    'ikea': 'lights',
    'samsung': 'hubs',
    'apple': 'hubs',
    'google': 'thermostats',
    'amazon': 'cameras',
    'eufy': 'cameras',
    'wyze': 'cameras',
    'tuya': 'switches',
    'sonoff': 'switches',
    'tapo': 'cameras',
    'kasa': 'switches',
    'meross': 'switches',
    'nanoleaf': 'lights',
    'lifx': 'lights',
    'yeelight': 'lights',
    'reolink': 'cameras',
    'roborock': 'appliances'
  };

  return brandCategoryMap[brandKey] || 'other';
}

function detectCompatibility(productData) {
  const compatibilities = [];

  // Check if product has explicit compatibility info
  if (productData.compatibility) {
    const compArray = Array.isArray(productData.compatibility) ? productData.compatibility : [productData.compatibility];
    for (const comp of compArray) {
      const compLower = String(comp).toLowerCase().trim();
      for (const compat of config.compatibility) {
        if (compLower.includes(compat) || compat.includes(compLower)) {
          compatibilities.push(compat);
          break;
        }
      }
    }
  }

  // If no explicit compatibility found, try to infer from other fields
  if (compatibilities.length === 0) {
    const description = (productData.product_description || productData.extended_description || '').toLowerCase();
    const title = (productData.product_name || '').toLowerCase();
    const searchText = `${description} ${title}`;

    // Check for platform mentions
    if (searchText.includes('home assistant') || searchText.includes('hass')) {
      compatibilities.push('homeassistant');
    }
    if (searchText.includes('homekit') || searchText.includes('apple')) {
      compatibilities.push('homekit');
    }
    if (searchText.includes('alexa') || searchText.includes('echo')) {
      compatibilities.push('alexa');
    }
    if (searchText.includes('google') || searchText.includes('nest')) {
      compatibilities.push('googlehome');
    }
    if (searchText.includes('smartthings') || searchText.includes('samsung')) {
      compatibilities.push('smartthings');
    }
  }

  // Return default compatibility if none detected
  return compatibilities.length > 0 ? compatibilities : ['homeassistant', 'homekit', 'alexa', 'googlehome', 'smartthings'];
}

function detectConnectivity(productData) {
  const connectivity = [];

  if (productData.connectivity) {
    const connArray = Array.isArray(productData.connectivity) ? productData.connectivity : [productData.connectivity];
    for (const conn of connArray) {
      const connLower = String(conn).toLowerCase().trim();
      for (const connType of config.connectivity) {
        if (connLower.includes(connType) || connType.includes(connLower)) {
          connectivity.push(connType);
          break;
        }
      }
    }
  }

  // If no explicit connectivity found, try to infer from other fields
  if (connectivity.length === 0) {
    const description = (productData.product_description || productData.extended_description || '').toLowerCase();
    const title = (productData.product_name || '').toLowerCase();
    const searchText = `${description} ${title}`;

    if (searchText.includes('wifi') || searchText.includes('wi-fi')) {
      connectivity.push('wifi');
    }
    if (searchText.includes('zigbee')) {
      connectivity.push('zigbee');
    }
    if (searchText.includes('bluetooth') || searchText.includes('ble')) {
      connectivity.push('bluetooth');
    }
    if (searchText.includes('matter')) {
      connectivity.push('matter');
    }
    if (searchText.includes('thread')) {
      connectivity.push('thread');
    }
    if (searchText.includes('ethernet') || searchText.includes('wired')) {
      connectivity.push('ethernet');
    }
  }

  // Return default connectivity if none detected
  return connectivity.length > 0 ? connectivity : ['wifi'];
}

// Sharetribe configuration
const SHARETRIBE_CLIENT_ID = 'ea0f640d-32b7-4082-86c2-489e1c88a9d8';
const SHARETRIBE_CLIENT_SECRET = '890b45d6acdf6729fd43aa16340786409d9de85b';
const SHARETRIBE_AUTHOR_ID = process.env.SHARETRIBE_AUTHOR_ID || null; // Listing owner (UUID)

// Initialize Sharetribe SDK
const integrationSdk = sharetribeIntegrationSdk.createInstance({
  clientId: SHARETRIBE_CLIENT_ID,
  clientSecret: SHARETRIBE_CLIENT_SECRET,
  tokenStore: {
    getToken: () => null,
    setToken: () => null,
  }
});
const { types } = sharetribeIntegrationSdk;

// Elasticsearch configuration
const ES_CLIENT = new Client({
  node: 'https://my-elasticsearch-project-caece8.es.us-east-1.aws.elastic.cloud:443',
  auth: {
    apiKey: 'X1JBeVpKY0I2VFdpQ3RTRlpTZjk6TDd5aDNkYlJELTdsRDJjTWNFVldJUQ=='
  }
});

// OpenAI configuration
const openai = new OpenAI();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to search products in Elasticsearch
async function searchProducts(searchQuery) {
  try {
    const result = await ES_CLIENT.search({
      index: 'inventory_vector',
      body: {
        query: {
          multi_match: {
            query: searchQuery,
            fields: ['product_name', 'product_description', 'brand']
          }
        }
      }
    });
    return result.hits.hits;
  } catch (error) {
    console.error('Elasticsearch search error:', error);
    throw error;
  }
}

// Function to generate missing description using OpenAI
async function generateDescription(productInfo) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a product description writer. Create a compelling and informative product description based on the provided information."
        },
        {
          role: "user",
          content: `Create a product description for: ${JSON.stringify(productInfo)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 250
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI error:', error);
    return null;
  }
}

// Helper to fetch a template listing (Aqara Doorbell Camera Hub G410) to understand expected publicData shape
async function fetchTemplateListing() {
  try {
    const res = await integrationSdk.listings.query({ perPage: 50, expand: true, include: ['images', 'author'] });
    const listings = res.data?.data || [];

    // Prefer exact match on title, fallback to any Aqara listing
    const matchTitle = (l) => (l.attributes?.title || '').toLowerCase().includes('aqara doorbell camera hub g410');
    const isAqara = (l) => (l.attributes?.title || '').toLowerCase().includes('aqara') || (l.attributes?.publicData?.brand || '').toLowerCase() === 'aqara';

    let template = listings.find(matchTitle);
    if (!template) template = listings.find(isAqara);
    return template || null;
  } catch (error) {
    console.error('Error fetching template listing:', error);
    return null;
  }
}

// Extract a minimal template schema from a listing's publicData
function getPublicDataTemplateFromListing(listing) {
  if (!listing?.attributes?.publicData) return null;
  // Return the full publicData to preserve complete schema used in the marketplace
  return listing.attributes.publicData;
}

// Fallback target schema reflecting the CSV-exported structure for Doorbell Camera Hub G410
function buildTargetPublicDataTemplate() {
  return {
    brand: 'aqara',
    categoryLevel1: 'doorbells',
    compatibility: ['homeassistant', 'homekit', 'alexa', 'googlehome', 'smartthings'],
    connectivity: ['matter', 'zigbee', 'wifi'],
    feature_1_icon: '🔔',
    feature_1_text: 'Level up your front door with the G410 Doorbell Camera. Always be able to check live video stream from your front door, and interact in real time from wherever you are.',
    feature_1_title: 'Answer Your Door from Anywhere',
    feature_2_icon: '👀',
    feature_2_text: 'Get the full picture with a 175° wide-angle lens and 4:3 aspect ratio. 2K resolution ensures that vital details are never missed, easily identifying faces and packages. Plus, with infrared night vision, you\'ll enjoy sharp clarity even in low-light conditions.',
    feature_2_title: 'Clearly Capture Details with 2K Resolution\n',
    feature_3_icon: '🔌',
    feature_3_text: 'Enjoy seamless integration within the Apple ecosystem, benefiting from secure iCloud video storage.\nWith RTSP integration and Advanced Matter Bridging, the G410 integrates well with the popular open-source Home Assistant platform.\nEffortlessly stream a live view of your doorstep to Google Home, Alexa, and SmartThings-compatible smart displays for convenient monitoring.',
    feature_3_title: 'Compatible with Leading Smart Home Ecosystems',
    home_assistant_integration_link: '',
    listingType: config.defaults.listingType,
    pickupEnabled: config.defaults.pickupEnabled,
    reddit_links: '',
    shippingEnabled: config.defaults.shippingEnabled,
    shippingPriceInSubunitsAdditionalItems: config.defaults.shippingPriceInSubunitsAdditionalItems,
    shippingPriceInSubunitsOneItem: config.defaults.shippingPriceInSubunitsOneItem,
    short_feature_1: '2K Image Clarity with 175° Field of View',
    short_feature_2: 'Hub for Matter & Aqara Zigbee Device',
    short_feature_3: 'Fewer False Alerts with mmWave Radar sensor',
    short_feature_4: 'On-Device Face Recognition',
    short_feature_5: 'Local and Cloud Storage',
    shortdescription: 'A doorbell camera hub that supports local automations and major smart home ecosystems.',
    tech_specs: '{\n  "Video Resolution": "2K (2048×1536)",\n  "Field of View": "160° Ultra-Wide Angle",\n  "HDR Support": "true",\n  "Night Vision": "true",\n  "Infrared Mode": "Auto-switch with ambient lighting",\n  "Two-Way Audio": "true",\n  "Real-Time Video": "true",\n  \n  "AI Human Detection": "true",\n  "Package Detection": "true",\n  "Face Recognition (HomeKit Secure Video)": "true",\n  "Custom Motion Zones": "true",\n  "Tamper Alarm": "true",\n  "Activity Zones": "true",\n  "Privacy Zones": "true",\n  \n  "Built-in Chime": "true",\n  "External Chime Support": "true",\n  "Multiple Storage Options": "Cloud, microSD, HomeKit Secure Video",\n  "Customizable Ringtones": "true",\n  "Adjustable Volume": "true",\n  "Intercom Functionality": "true",\n  \n  "Battery Power": "6x AA alkaline batteries",\n  "Optional Wired Power": "12–24V AC/DC",\n  "Low Power Design": "true",\n  "Wi-Fi Support": "2.4GHz / 5GHz dual-band",\n  "Wireless Protocols": "Zigbee, Thread, Bluetooth",\n  \n  "Apple Home Support": "true",\n  "HomeKit Secure Video": "true",\n  "Google Assistant Support": "true",\n  "Amazon Alexa Support": "true",\n  "Aqara Home App Compatible": "true",\n  "Smart Automation with Aqara Devices": "true",\n  \n  "End-to-End Encryption": "true",\n  "TÜV Rheinland Certified": "true",\n  "Offline Video Storage": "Up to 512GB microSD",\n  "Chime Functions as Zigbee/Thread Hub": "true"\n}\n',
    transactionProcessAlias: config.defaults.transactionProcessAlias,
    unitType: config.defaults.unitType,
    works_with_home_assistant: config.defaults.works_with_home_assistant,
    youtube_links: '',
  };
}

// Utils to normalize values into expected slugs/arrays/strings
function toSlug(value) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/\s+/g, '');
}

function coerceStringArray(value) {
  if (Array.isArray(value)) return value.map(v => String(v)).filter(Boolean);
  if (typeof value === 'string') {
    // split on commas or semicolons if present
    if (value.includes(',') || value.includes(';')) {
      return value.split(/[,;]+/).map(v => v.trim()).filter(Boolean);
    }
    return [value.trim()].filter(Boolean);
  }
  return [];
}

function normalizeConnectivity(connectivity) {
  const mapping = {
    wifi: 'wifi',
    'wi-fi': 'wifi',
    zigbee: 'zigbee',
    thread: 'thread',
    bluetooth: 'bluetooth',
    matter: 'matter',
    ethernet: 'ethernet',
    zwave: 'zwave',
  };
  const input = coerceStringArray(connectivity);
  const normalized = input
    .map(v => v.toLowerCase())
    .map(v => mapping[v] || v.replace(/[^a-z0-9]+/g, ''))
    .filter(Boolean);
  // de-dupe
  return Array.from(new Set(normalized));
}

function stringifyTechSpecs(techSpecs) {
  try {
    if (!techSpecs) return null;
    if (typeof techSpecs === 'string') return techSpecs;
    if (Array.isArray(techSpecs)) {
      // If array of objects or key-value pairs, convert to object
      const obj = {};
      techSpecs.forEach((item, idx) => {
        if (item && typeof item === 'object') {
          Object.keys(item).forEach(k => { obj[String(k)] = String(item[k]); });
        } else {
          obj[`spec_${idx + 1}`] = String(item);
        }
      });
      return JSON.stringify(obj, null, 2) + '\n';
    }
    if (typeof techSpecs === 'object') {
      return JSON.stringify(techSpecs, null, 2) + '\n';
    }
    return null;
  } catch (e) {
    return null;
  }
}

function deriveFeaturesFromProduct(product) {
  const titles = [];
  const texts = [];
  const icons = ['🔔', '👀', '🔌', '⚙️', '🔒'];
  const candidate = product.key_features || product.features || [];
  const items = Array.isArray(candidate) ? candidate : coerceStringArray(candidate);
  items.slice(0, 5).forEach(v => {
    if (typeof v === 'string') {
      titles.push(v.substring(0, 80));
      texts.push(v);
    } else if (v && typeof v === 'object') {
      const t = v.title || v.name || '';
      const d = v.text || v.description || '';
      titles.push(String(t || d).substring(0, 80));
      texts.push(String(d || t));
    }
  });
  return { titles, texts, icons };
}

// Build a robust fallback publicData by cloning template and infusing product fields
function buildPublicDataFallback(product, template) {
  const pd = JSON.parse(JSON.stringify(template || buildTargetPublicDataTemplate()));

  // Brand detection using configuration
  const detectedBrand = detectBrand(product.brand);
  pd.brand = detectedBrand;

  // Category detection using configuration
  if (product.category) {
    pd.categoryLevel1 = String(product.category).toLowerCase();
  } else if (product.type) {
    pd.categoryLevel1 = String(product.type).toLowerCase();
  } else {
    // Use brand's default category from configuration
    pd.categoryLevel1 = getDefaultCategoryForBrand(detectedBrand);
  }

  // Connectivity detection using configuration
  pd.connectivity = detectConnectivity(product);

  // Compatibility detection using configuration
  pd.compatibility = detectCompatibility(product);

  // Short features
  const { titles, texts, icons } = deriveFeaturesFromProduct(product);
  if (titles[0]) pd.short_feature_1 = titles[0];
  if (titles[1]) pd.short_feature_2 = titles[1];
  if (titles[2]) pd.short_feature_3 = titles[2];
  if (titles[3]) pd.short_feature_4 = titles[3];
  if (titles[4]) pd.short_feature_5 = titles[4];

  if (titles[0]) pd.feature_1_title = titles[0];
  if (titles[1]) pd.feature_2_title = titles[1];
  if (titles[2]) pd.feature_3_title = titles[2];
  if (texts[0]) pd.feature_1_text = texts[0];
  if (texts[1]) pd.feature_2_text = texts[1];
  if (texts[2]) pd.feature_3_text = texts[2];
  if (icons[0]) pd.feature_1_icon = icons[0];
  if (icons[1]) pd.feature_2_icon = icons[1];
  if (icons[2]) pd.feature_3_icon = icons[2];

  // Short description
  const desc = product.product_description || product.extended_description || '';
  if (desc) pd.shortdescription = String(desc).slice(0, 280);

  // Tech specs as stringified JSON
  const techSpecsStr = stringifyTechSpecs(product.tech_specs || product.specs);
  if (techSpecsStr) pd.tech_specs = techSpecsStr;

  // Links if any
  if (product.youtube_links) {
    const arr = coerceStringArray(product.youtube_links);
    if (arr.length) pd.youtube_links = JSON.stringify(arr);
  }
  if (product.reddit_links) {
    const arr = coerceStringArray(product.reddit_links);
    if (arr.length) pd.reddit_links = JSON.stringify(arr);
  }

  return pd;
}

// Derive price Money from product data
function derivePrice(product) {
  const currency = (product.currency || product.price_currency || 'USD').toString().toUpperCase();
  let amountSubunits = null;
  const candidates = [
    product.price_subunits,
    product.priceInSubunits,
    product.price_subunit_amount,
    product.price_cents,
    product.priceMinor,
  ];
  for (const c of candidates) {
    if (typeof c === 'number' && Number.isFinite(c)) { amountSubunits = Math.round(c); break; }
    if (typeof c === 'string' && c.trim() && !isNaN(Number(c))) { amountSubunits = Math.round(Number(c)); break; }
  }
  if (amountSubunits == null) {
    const p = product.price || product.priceAmount || product.amount;
    if (typeof p === 'number' && Number.isFinite(p)) amountSubunits = Math.round(p * 100);
    else if (typeof p === 'string' && p.trim() && !isNaN(Number(p))) amountSubunits = Math.round(Number(p) * 100);
  }
  if (amountSubunits == null || !Number.isFinite(amountSubunits)) amountSubunits = 9900;
  return new types.Money(amountSubunits, currency);
}

// Coerce an arbitrary object into the exact TEMPLATE keys and expected types
function coerceToTemplateShape(template, data) {
  const out = {};
  const isJsonArrayString = (s) => {
    if (typeof s !== 'string') return false;
    try { const v = JSON.parse(s); return Array.isArray(v); } catch { return false; }
  };
  const jsonArrayStringify = (val) => {
    if (Array.isArray(val)) return JSON.stringify(val);
    if (typeof val === 'string') {
      if (isJsonArrayString(val)) return val; // already JSON array string
      const arr = coerceStringArray(val);
      return JSON.stringify(arr);
    }
    return JSON.stringify([]);
  };

  Object.keys(template).forEach((key) => {
    const tVal = template[key];
    const dVal = data[key];

    // Special coercions for known fields
    if (key === 'connectivity') {
      out[key] = Array.isArray(dVal) ? normalizeConnectivity(dVal) : (dVal ? normalizeConnectivity([dVal]) : template[key]);
      return;
    }
    if (key === 'compatibility') {
      const arr = coerceStringArray(dVal || []);
      out[key] = Array.from(new Set(arr.map(v => v.toLowerCase().replace(/\s+/g, ''))));
      if (!out[key].length) out[key] = template[key];
      return;
    }
    if (key === 'reddit_links' || key === 'youtube_links') {
      out[key] = jsonArrayStringify(dVal != null ? dVal : tVal);
      return;
    }
    if (key === 'tech_specs') {
      if (typeof dVal === 'string') out[key] = dVal;
      else out[key] = stringifyTechSpecs(dVal) || tVal;
      return;
    }
    if (key === 'brand' || key === 'categoryLevel1') {
      if (dVal != null) out[key] = String(dVal).toLowerCase();
      else out[key] = tVal;
      return;
    }

    // Generic type-aligned assignment
    if (Array.isArray(tVal)) {
      const arr = coerceStringArray(dVal);
      out[key] = arr.length ? arr : tVal;
    } else if (typeof tVal === 'boolean') {
      if (typeof dVal === 'boolean') out[key] = dVal; else out[key] = tVal;
    } else if (typeof tVal === 'number') {
      const num = Number(dVal);
      out[key] = Number.isFinite(num) ? num : tVal;
    } else if (typeof tVal === 'string') {
      out[key] = dVal != null ? String(dVal) : tVal;
    } else if (tVal && typeof tVal === 'object') {
      out[key] = tVal; // keep as-is (should not occur in current schema)
    } else {
      out[key] = dVal != null ? dVal : tVal;
    }
  });

  return out;
}

// Merge AI-coerced publicData with fallback values while preserving the template keys
function enrichWithFallback(template, aiData, fallback) {
  const out = {};
  Object.keys(template).forEach((key) => {
    const aiVal = aiData[key];
    const fbVal = fallback[key];
    const tVal = template[key];

    if (aiVal != null) {
      out[key] = aiVal;
      return;
    }
    if (fbVal != null) {
      out[key] = fbVal;
      return;
    }
    out[key] = tVal;
  });
  return out;
}

// Ensure we can safely parse JSON from the model output
function safeParseJson(possibleJson) {
  if (typeof possibleJson !== 'string') return null;
  try {
    // Extract the first JSON object if text includes extra content
    const start = possibleJson.indexOf('{');
    const end = possibleJson.lastIndexOf('}');
    if (start === -1 || end === -1 || end < start) return null;
    const jsonSlice = possibleJson.slice(start, end + 1);
    return JSON.parse(jsonSlice);
  } catch (e) {
    return null;
  }
}

// Use OpenAI to convert ES product JSON into Sharetribe publicData based on a template schema
async function generatePublicDataWithAI(productInfo, templatePublicData) {
  if (!templatePublicData) return null;
  try {
    const system = 'You are a strict JSON transformer that maps a source product object into a Sharetribe listing publicData payload. Output ONLY a JSON object, no code fences, no commentary.';
    const user = [
      'Construct publicData using the provided TEMPLATE. Follow these rules strictly:',
      '- Use EXACTLY the same keys as in the TEMPLATE. Do not omit any keys. Do not add new keys.',
      '- Keep configuration-like values from the TEMPLATE (listingType, transactionProcessAlias, unitType, pickupEnabled, shippingEnabled, shippingPrice fields) unless the source clearly provides replacements.',
      '- Fill product-specific values (brand, categoryLevel1, connectivity, compatibility, features, links, shortdescription, tech_specs) from the source product if present; otherwise keep TEMPLATE defaults.',
      '- Key formatting:',
      '  * compatibility: array of lowercase slugs derived from integrations/ecosystems (e.g., ["homeassistant","homekit","alexa","googlehome","smartthings"]).',
      '  * connectivity: array of lowercase slugs (e.g., ["matter","zigbee","wifi"]).',
      '  * reddit_links and youtube_links: STRING values containing a JSON array string (e.g., "[\"https://...\"]").',
      '  * tech_specs: STRING value containing pretty-printed JSON with key-value specs; derive from product.tech_specs if available, else keep TEMPLATE.',
      '  * feature_* fields: short, human-friendly strings derived from product key features when possible.',
      '- Ensure the final result is valid JSON matching the TEMPLATE keys exactly.',
      '',
      'TEMPLATE PUBLIC DATA:',
      JSON.stringify(templatePublicData, null, 2),
      '',
      'SOURCE PRODUCT:',
      JSON.stringify(productInfo, null, 2),
      '',
      'Return only the JSON object for publicData.'
    ].join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      max_tokens: 400,
    });

    const raw = response.choices?.[0]?.message?.content || '';
    const parsed = safeParseJson(raw);
    return parsed || null;
  } catch (error) {
    console.error('OpenAI publicData generation error:', error);
    return null;
  }
}

// Function to download image
async function downloadImage(url, filename) {
  const downloadPath = path.join(__dirname, 'temp_images');
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  const filepath = path.join(downloadPath, filename);

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
}

// Function to upload image to Sharetribe
async function uploadImageToSharetribe(imagePath) {
  try {
    // Create a read stream from the image file
    const imageStream = fs.createReadStream(imagePath);

    // Upload the image using the SDK
    const response = await integrationSdk.images.upload({
      image: imageStream
    });

    return response.data.data.id;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Function to transform ES product to Sharetribe listing format
function transformToListing(product, imageIds = [], finalPublicData = null) {
  // Base constants from configuration (fallbacks if AI/template are unavailable)
  const basePublicData = {
    listingType: config.defaults.listingType,
    transactionProcessAlias: config.defaults.transactionProcessAlias,
    unitType: config.defaults.unitType,
  };

  // If final publicData provided, ensure base constants; else minimal fallback
  const mergedPublicData = finalPublicData
    ? Object.assign({}, finalPublicData, {
        listingType: finalPublicData.listingType || basePublicData.listingType,
        transactionProcessAlias: finalPublicData.transactionProcessAlias || basePublicData.transactionProcessAlias,
        unitType: finalPublicData.unitType || basePublicData.unitType,
      })
    : Object.assign({}, basePublicData, {
        brand: product.brand,
        categoryLevel1: product.category || 'other',
        connectivity: Array.isArray(product.connectivity) ? product.connectivity : (product.connectivity ? [product.connectivity] : []),
      });

  const listing = {
    title: `${product.brand || ''} ${product.product_name || ''}`.trim(),
    description: product.product_description || product.extended_description,
    price: derivePrice(product),
    privateData: {},
    publicData: mergedPublicData,
    metadata: {
      source: "integration-api"
    },
    availabilityPlan: {
      type: 'availability-plan/day',
      entries: [
        { dayOfWeek: 'mon', seats: 1 },
        { dayOfWeek: 'tue', seats: 1 },
        { dayOfWeek: 'wed', seats: 1 },
        { dayOfWeek: 'thu', seats: 1 },
        { dayOfWeek: 'fri', seats: 1 },
        { dayOfWeek: 'sat', seats: 1 },
        { dayOfWeek: 'sun', seats: 1 },
      ],
    },
    state: 'pendingApproval',
    images: imageIds,
  };

  return listing;
}

// Function to create listing in Sharetribe
async function createListing(listingData) {
  try {
    console.log('Creating listing with data:', JSON.stringify(listingData, null, 2));

    // Create the listing
    const response = await integrationSdk.listings.create(
      listingData,
      {
        expand: true,
        include: ['images']
      }
    );

    console.log('Listing created successfully:', response.data.data.id);
    return response.data;
  } catch (error) {
    console.error('Error creating listing:', error);
    if (error.response?.data?.errors) {
      console.error('API Errors:', JSON.stringify(error.response.data.errors, null, 2));
    }
    if (error.data?.errors) {
      console.error('SDK Errors:', JSON.stringify(error.data.errors, null, 2));
    }
    throw error;
  }
}

// Function to clean up temporary images
function cleanupTempImages() {
  const tempDir = path.join(__dirname, 'temp_images');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

// Main function to handle the upload process
async function uploadListings() {
  try {
    if (!SHARETRIBE_AUTHOR_ID) {
      console.error('Missing SHARETRIBE_AUTHOR_ID environment variable (listing owner UUID). Set it and re-run.');
      rl.close();
      return;
    }
    // Get search query and number of products from user
    rl.question('Enter search query for products: ', (searchQuery) => {
      rl.question('How many products do you want to process? (Enter a number): ', async (productCountInput) => {
        const productCount = parseInt(productCountInput) || 1;
        if (productCount < 1) {
          console.log('Invalid number. Processing 1 product.');
        } else if (productCount > 50) {
          console.log('Limiting to 50 products for safety.');
        }
        const maxProducts = Math.min(Math.max(1, productCount), 50);

        try {
          // Search products
          console.log('Searching products...');
          const products = await searchProducts(searchQuery);

          if (products.length === 0) {
            console.log('No products found.');
            rl.close();
            return;
          }

          console.log(`Found ${products.length} products. Processing ${maxProducts} products.`);

          // Process the specified number of products
          let processedCount = 0;
          for (let i = 0; i < Math.min(maxProducts, products.length); i++) {
            const product = products[i];
            const productData = product._source;
            console.log(`\n--- Processing Product ${i + 1}/${maxProducts} ---`);
            console.log(`Product: ${productData.brand} ${productData.product_name}`);

            try {
              // Download and upload images
              const imageIds = [];
              if (productData.related_images && productData.related_images.length > 0) {
                console.log('Processing images...');
                for (const [index, image] of productData.related_images.entries()) {
                  try {
                    const imageUrl = image.public_url || image.source_link;
                    if (!imageUrl) continue;

                    const filename = `${productData.brand}-${productData.product_name}-${index}.jpg`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                    console.log(`Downloading image: ${filename}`);
                    const imagePath = await downloadImage(imageUrl, filename);

                    console.log('Uploading image to Sharetribe...');
                    const imageId = await uploadImageToSharetribe(imagePath);
                    imageIds.push(imageId);
                  } catch (error) {
                    console.error(`Error processing image ${index + 1}:`, error.message);
                  }
                }
              }

              // Transform product data
              // Verify author exists and is valid
              try {
                await integrationSdk.users.show({ id: new types.UUID(SHARETRIBE_AUTHOR_ID) });
              } catch (e) {
                console.error('Author check failed. Ensure SHARETRIBE_AUTHOR_ID is a valid user UUID in this environment.');
                throw e;
              }

              // Build publicData using AI based on CSV-exported template
              console.log('Building template for publicData from CSV structure...');
              const templatePublicData = buildTargetPublicDataTemplate();
              console.log('Generating publicData with OpenAI based on CSV template...');
              const aiPublicData = await generatePublicDataWithAI(productData, templatePublicData);

              // Coerce AI output to exact template shape and enrich with fallback from product
              const fallbackPublicData = buildPublicDataFallback(productData, templatePublicData);
              let finalPublicData = null;
              if (aiPublicData) {
                const coerced = coerceToTemplateShape(templatePublicData, aiPublicData);
                finalPublicData = enrichWithFallback(templatePublicData, coerced, fallbackPublicData);
              } else {
                console.log('AI did not return publicData. Using product-derived fallback.');
                finalPublicData = fallbackPublicData;
              }

              let listingData = transformToListing(productData, imageIds, finalPublicData);
              listingData.authorId = new types.UUID(SHARETRIBE_AUTHOR_ID);

              // Generate description if missing
              if (!listingData.description) {
                console.log('Generating description...');
                listingData.description = await generateDescription(productData);
              }

              // Create listing
              console.log('Creating listing...');
              const createdListing = await createListing(listingData);
              console.log(`Created listing: ${createdListing.data.id}`);
              processedCount++;

            } catch (error) {
              console.error(`Error processing product ${i + 1}:`, error.message);
              console.log('Continuing with next product...');
            }
          }

          // Cleanup temporary images
          cleanupTempImages();

          console.log(`\nUpload complete! Successfully processed ${processedCount} out of ${maxProducts} requested products.`);
          rl.close();
        } catch (error) {
          console.error('Error during upload process:', error);
          cleanupTempImages();
          rl.close();
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    cleanupTempImages();
    rl.close();
  }
}

// Start the upload process
uploadListings();
