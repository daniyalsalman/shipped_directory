// Global app state
const appState = {
  allProducts: [],
  filteredProducts: [],
  search: '',
  filters: {
    types: [],
    builders: [],
    cohorts: [],
    platforms: []
  },
  sort: 'name',
  availableFilters: {
    types: new Set(),
    builders: new Set(),
    cohorts: new Set()
  }
};

// Load products from JSON
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) throw new Error('Failed to load products');
    
    let data = await response.json();
    
    // Validate
    if (!Array.isArray(data)) throw new Error('Products data is not an array');
    
    // Ingest and extract cohort & platform
    data = data.map(product => {
      // 1. Extract Cohort
      product.cohort = null;
      if (product.builder) {
        const cohortMatch = product.builder.match(/(weekend \d+|cohort \d+)/i);
        if (cohortMatch) {
          // Standardize cohort name
          product.cohort = cohortMatch[0].replace(/\b\w/g, l => l.toUpperCase());
          // Remove cohort from builder
          product.builder = product.builder.replace(cohortMatch[0], '').trim();
          // Clean up any trailing characters
          product.builder = product.builder.replace(/[-,\s]+$/, '');
        }
      }
      
      // If the builder name has more than two words, truncate it
      if (product.builder) {
        const words = product.builder.trim().split(/\s+/);
        if (words.length > 2) {
          product.builder = words.slice(0, 2).join(' ');
        }
      }
      
      // 2. Extract Platform Flags
      const textToSearch = `${product.type || ''} ${product.description || ''} ${product.link || ''}`.toLowerCase();
      product.hasPlayStore = textToSearch.includes('play store') || textToSearch.includes('play.google.com') || textToSearch.includes('android');
      product.hasAppStore = textToSearch.includes('app store') || textToSearch.includes('apps.apple.com') || textToSearch.includes('ios') || textToSearch.includes('apple');
      
      return product;
    });

    appState.allProducts = data;
    
    // Cache in localStorage (1-hour TTL)
    const cacheKey = 'products_cache';
    const cacheTime = 'products_cache_time';
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(cacheTime, String(Date.now()));
    
    return data;
  } catch (error) {
    console.error('Error loading products:', error);
    
    // Try to get from cache
    const cached = localStorage.getItem('products_cache');
    if (cached) {
      appState.allProducts = JSON.parse(cached);
      return appState.allProducts;
    }
    
    return [];
  }
}

// Get unique values from products
function getUniqueValues(key) {
  const values = appState.allProducts
    .map(p => p[key])
    .filter(v => v !== null && v !== undefined && v !== '');
  return [...new Set(values)].sort();
}

// Get available filters
function getAvailableFilters() {
  return {
    types: getUniqueValues('type'),
    builders: getUniqueValues('builder'),
    cohorts: getUniqueValues('cohort')
  };
}
