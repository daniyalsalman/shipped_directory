// Initialize app
async function init() {
  const loadingState = document.getElementById('loadingState');

  try {
    // Load products
    await loadProducts();

    // Hide loading state
    if (loadingState) loadingState.style.display = 'none';

    // Setup UI
    setupSearch();
    setupFilters();
    setupSort();
    setupClearAllBtn();

    // Initial render
    applyFiltersAndSort();
    renderProducts();
  } catch (error) {
    console.error('Failed to initialize app:', error);
    if (loadingState) {
      loadingState.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
