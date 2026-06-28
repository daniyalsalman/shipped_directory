let searchTimeout;

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');

  if (!searchInput) return;

  // Search with debounce
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    // Show/hide clear button
    clearBtn.style.display = query ? 'block' : 'none';
    
    // Debounce search (200ms)
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      appState.search = query.toLowerCase();
      applyFiltersAndSort();
      renderProducts();
    }, 200);
  });

  // Clear button
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    appState.search = '';
    applyFiltersAndSort();
    renderProducts();
  });
}

function searchProducts(products, query) {
  if (!query) return products;

  return products.filter(product => {
    const name = product.name.toLowerCase();
    const description = (product.description || '').toLowerCase();
    const builder = (product.builder || '').toLowerCase();

    return (
      name.includes(query) ||
      description.includes(query) ||
      builder.includes(query)
    );
  });
}
