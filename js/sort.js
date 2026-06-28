function setupSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', (e) => {
    appState.sort = e.target.value;
    applyFiltersAndSort();
    renderProducts();
  });
}

function sortProducts(products, sortBy) {
  const sorted = [...products]; // Clone array

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case 'type':
      return sorted.sort((a, b) => {
        if (a.type !== b.type) return (a.type || '').localeCompare(b.type || '');
        return a.name.localeCompare(b.name);
      });

    case 'has-link':
      return sorted.sort((a, b) => {
        const aHasLink = !!a.link;
        const bHasLink = !!b.link;
        if (aHasLink !== bHasLink) return bHasLink ? 1 : -1;
        return a.name.localeCompare(b.name);
      });

    case 'builder':
      return sorted.sort((a, b) => (a.builder || '').localeCompare(b.builder || ''));

    case 'builder-desc':
      return sorted.sort((a, b) => (b.builder || '').localeCompare(a.builder || ''));

    case 'cohort':
      return sorted.sort((a, b) => {
        const cohortA = a.cohort || 'Z_No Cohort';
        const cohortB = b.cohort || 'Z_No Cohort';
        if (cohortA !== cohortB) return cohortA.localeCompare(cohortB);
        return a.name.localeCompare(b.name);
      });

    case 'platform':
      return sorted.sort((a, b) => {
        const aScore = (a.hasPlayStore ? 1 : 0) + (a.hasAppStore ? 2 : 0);
        const bScore = (b.hasPlayStore ? 1 : 0) + (b.hasAppStore ? 2 : 0);
        if (aScore !== bScore) return bScore - aScore; // Both(3), AppStore(2), PlayStore(1), None(0)
        return a.name.localeCompare(b.name);
      });

    default:
      return sorted;
  }
}
