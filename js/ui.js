function applyFiltersAndSort() {
  // Step 1: Search
  let results = searchProducts(appState.allProducts, appState.search);

  // Step 2: Filter
  results = filterProducts(results);

  // Step 3: Sort
  results = sortProducts(results, appState.sort);

  appState.filteredProducts = results;
  updateProductCount();
}

function updateProductCount() {
  const count = appState.filteredProducts.length;
  const countElement = document.getElementById('productCount');
  if (countElement) {
    countElement.textContent = count;
  }
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const loadingState = document.getElementById('loadingState');

  if (!grid) return;

  // Hide loading
  if (loadingState) loadingState.style.display = 'none';

  // Show empty state if no products
  if (appState.filteredProducts.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Render cards
  grid.innerHTML = appState.filteredProducts.map((product, index) => createCard(product, index)).join('');
}

function createCard(product, index) {
  const icon = product.icon
    ? `<img src="${product.icon}" alt="${product.name}" class="card-icon-img" onerror="this.style.display='none'">`
    : `<div class="card-avatar">${product.name[0].toUpperCase()}</div>`;

  const linkAttr = product.link
    ? `href="${product.link}" target="_blank" rel="noopener noreferrer"`
    : ``;

  const city = product.city ? `, ${escapeHtml(product.city)}` : '';
  const builder = product.builder ? escapeHtml(product.builder) : 'ShipKaro Member';
  
  const formattedIndex = String(index + 1).padStart(3, '0');
  const bgClass = `card-bg-${(index % 3) + 1}`;
  
  let storeIcons = '';
  if (product.hasPlayStore) {
    storeIcons += `<svg class="store-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="margin-left: 4px;">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M14.41,11.28L16.48,9.21L4.85,2.62C5.36,2.2 6.13,2.23 6.64,2.68L14.41,11.28M15.12,12L17.18,14.07L20.84,12.03C21.37,11.75 21.37,10.25 20.84,9.97L17.18,7.93L15.12,12M14.41,12.72L6.64,21.32C6.13,21.77 5.36,21.8 4.85,21.38L16.48,14.79L14.41,12.72Z" />
    </svg>`;
  }
  if (product.hasAppStore) {
    storeIcons += `<svg class="store-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="margin-left: 4px;">
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.33,6.68 15.86,6.82C16.5,6.86 18.25,7.09 19.34,8.69C19.25,8.75 17.56,9.75 17.59,11.73C17.62,14.1 19.71,14.9 19.75,14.92C19.71,15.06 19.41,16.07 18.71,17.18L18.71,19.5M12.05,5.18C12.75,4.33 13.22,3.15 13.09,2C12.06,2.05 10.83,2.69 10.12,3.53C9.47,4.29 8.91,5.5 9.07,6.61C10.22,6.7 11.34,6.03 12.05,5.18Z" />
    </svg>`;
  }

  const cardInner = `
    <div class="card-bg ${bgClass}"></div>
    <div class="card-noise"></div>
    <div class="card-icon-wrapper">${icon}</div>
    <div class="card-glass">
      <div class="card-glass-top">
        <h3 class="card-name">${escapeHtml(product.name)}</h3>
        <p class="card-desc">${escapeHtml(product.description || '')}</p>
      </div>
      <div class="card-glass-bottom">
        <div class="card-index">${formattedIndex}</div>
        <div class="card-meta-right">
          <div style="display:flex; align-items:center;">
            <div class="card-type">${formatType(product.type)}</div>
            ${storeIcons}
          </div>
          <div class="card-builder">${builder}${city}</div>
        </div>
      </div>
    </div>
  `;

  if (product.link) {
    return `<a ${linkAttr} class="card card-clickable">${cardInner}</a>`;
  }
  return `<div class="card">${cardInner}</div>`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function setupClearAllBtn() {
  const clearAllBtn = document.getElementById('clearAllBtn');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');

  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllFiltersAndSearch);
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFiltersAndSearch);
  }
}

function clearAllFiltersAndSearch() {
  // Reset search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.getElementById('clearSearchBtn').style.display = 'none';

  // Reset filters
  appState.search = '';
  appState.filters.types = [];
  appState.filters.builders = [];
  appState.filters.cohorts = [];
  appState.filters.platforms = [];
  appState.sort = 'name';

  // Update UI
  document.getElementById('sortSelect').value = 'name';
  document.getElementById('builderFilter').value = '';
  
  const cohortFilter = document.getElementById('cohortFilter');
  if (cohortFilter) cohortFilter.value = '';
  
  const platformFilter = document.getElementById('platformFilter');
  if (platformFilter) platformFilter.value = '';

  updateTypeChips();
  updateActiveFilters();

  // Re-render
  applyFiltersAndSort();
  renderProducts();
}
