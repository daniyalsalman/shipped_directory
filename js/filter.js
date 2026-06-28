function setupFilters() {
  const availableFilters = getAvailableFilters();

  // Populate type filter chips
  const typeFilter = document.getElementById('typeFilter');
  if (typeFilter) {
    availableFilters.types.forEach(type => {
      const button = document.createElement('button');
      button.className = 'chip';
      button.textContent = formatType(type);
      button.dataset.type = type;
      button.addEventListener('click', () => {
        const index = appState.filters.types.indexOf(type);
        if (index > -1) {
          appState.filters.types.splice(index, 1);
        } else {
          appState.filters.types.push(type);
        }
        updateTypeChips();
        applyFiltersAndSort();
        renderProducts();
        updateActiveFilters();
      });
      typeFilter.appendChild(button);
    });

    // "All" button logic
    const allBtn = typeFilter.querySelector('[data-type="all"]');
    if (allBtn) {
      allBtn.addEventListener('click', () => {
        appState.filters.types = [];
        updateTypeChips();
        applyFiltersAndSort();
        renderProducts();
        updateActiveFilters();
      });
    }
  }

  // Populate builder filter dropdown
  const builderFilter = document.getElementById('builderFilter');
  if (builderFilter) {
    availableFilters.builders.forEach(builder => {
      const option = document.createElement('option');
      option.value = builder;
      option.textContent = builder;
      builderFilter.appendChild(option);
    });

    builderFilter.addEventListener('change', () => {
      const val = builderFilter.value;
      appState.filters.builders = val ? [val] : [];
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
  }

  // Populate cohort filter (if data exists)
  const cohortFilter = document.getElementById('cohortFilter');
  const cohortGroup = document.getElementById('cohortGroup');
  
  if (availableFilters.cohorts.length > 0) {
    cohortGroup.style.display = 'flex';
    availableFilters.cohorts.forEach(cohort => {
      const option = document.createElement('option');
      option.value = cohort;
      option.textContent = cohort;
      cohortFilter.appendChild(option);
    });

    cohortFilter.addEventListener('change', () => {
      const val = cohortFilter.value;
      appState.filters.cohorts = val ? [val] : [];
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
  }

  // Populate platform filter
  const platformFilter = document.getElementById('platformFilter');
  if (platformFilter) {
    platformFilter.addEventListener('change', () => {
      const val = platformFilter.value;
      appState.filters.platforms = val ? [val] : [];
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
  }
}

function updateTypeChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    const type = chip.dataset.type;
    let isActive = false;
    if (type === 'all') {
      isActive = appState.filters.types.length === 0;
    } else {
      isActive = appState.filters.types.includes(type);
    }
    
    if (isActive) {
      chip.classList.add('chip-active');
    } else {
      chip.classList.remove('chip-active');
    }
  });
}

function formatType(type) {
  const typeMap = {
    'web': 'Web',
    'ios': 'iOS',
    'android': 'Android',
    'ai-tool': 'AI Tool',
    'workflow': 'Workflow',
    'extension': 'Extension',
    'other': 'Other'
  };
  return typeMap[type] || type;
}

function filterProducts(products) {
  return products.filter(product => {
    // Type filter
    if (appState.filters.types.length > 0) {
      if (!appState.filters.types.includes(product.type)) {
        return false;
      }
    }

    // Builder filter
    if (appState.filters.builders.length > 0) {
      if (!appState.filters.builders.includes(product.builder)) {
        return false;
      }
    }

    // Cohort filter
    if (appState.filters.cohorts.length > 0) {
      if (!appState.filters.cohorts.includes(product.cohort)) {
        return false;
      }
    }

    // Platform filter
    if (appState.filters.platforms && appState.filters.platforms.length > 0) {
      const wantsPlayStore = appState.filters.platforms.includes('play-store');
      const wantsAppStore = appState.filters.platforms.includes('app-store');
      
      let matchesPlatform = false;
      if (wantsPlayStore && product.hasPlayStore) matchesPlatform = true;
      if (wantsAppStore && product.hasAppStore) matchesPlatform = true;
      
      if (!matchesPlatform) return false;
    }

    return true;
  });
}

function updateActiveFilters() {
  const container = document.getElementById('activeFilters');
  const tagsContainer = document.getElementById('filterTags');
  
  if (!container || !tagsContainer) return;

  tagsContainer.innerHTML = '';

  const hasActiveFilters = 
    appState.filters.types.length > 0 || 
    appState.filters.builders.length > 0 || 
    appState.filters.cohorts.length > 0 ||
    (appState.filters.platforms && appState.filters.platforms.length > 0);

  if (!hasActiveFilters) {
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';

  // Type filter tags
  appState.filters.types.forEach(type => {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
      Type: ${formatType(type)}
      <button data-filter="type">✕</button>
    `;
    tag.querySelector('button').addEventListener('click', () => {
      appState.filters.types = appState.filters.types.filter(t => t !== type);
      updateTypeChips();
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
    tagsContainer.appendChild(tag);
  });

  // Builder tags
  appState.filters.builders.forEach(builder => {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
      ${builder}
      <button data-filter="builder">✕</button>
    `;
    tag.querySelector('button').addEventListener('click', () => {
      appState.filters.builders = appState.filters.builders.filter(b => b !== builder);
      document.getElementById('builderFilter').value = '';
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
    tagsContainer.appendChild(tag);
  });

  // Cohort tags
  appState.filters.cohorts.forEach(cohort => {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
      ${cohort}
      <button data-filter="cohort">✕</button>
    `;
    tag.querySelector('button').addEventListener('click', () => {
      appState.filters.cohorts = appState.filters.cohorts.filter(c => c !== cohort);
      const cf = document.getElementById('cohortFilter');
      if (cf) cf.value = '';
      applyFiltersAndSort();
      renderProducts();
      updateActiveFilters();
    });
    tagsContainer.appendChild(tag);
  });

  // Platform tags
  if (appState.filters.platforms) {
    appState.filters.platforms.forEach(platform => {
      const tag = document.createElement('div');
      tag.className = 'filter-tag';
      const label = platform === 'play-store' ? 'Play Store' : 'App Store';
      tag.innerHTML = `
        ${label}
        <button data-filter="platform">✕</button>
      `;
      tag.querySelector('button').addEventListener('click', () => {
        appState.filters.platforms = appState.filters.platforms.filter(p => p !== platform);
        const pf = document.getElementById('platformFilter');
        if (pf) pf.value = '';
        applyFiltersAndSort();
        renderProducts();
        updateActiveFilters();
      });
      tagsContainer.appendChild(tag);
    });
  }
}
