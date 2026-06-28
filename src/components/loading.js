/**
 * Reusable loading spinner component
 */

export function renderLoadingSpinner(size = 'md', text = '') {
  const sizeClasses = {
    sm: 'loading-spinner-sm',
    md: 'loading-spinner-md',
    lg: 'loading-spinner-lg'
  };

  return `
    <div class="loading-spinner ${sizeClasses[size] || sizeClasses.md}">
      <div class="spinner"></div>
      ${text ? `<span class="loading-text">${text}</span>` : ''}
    </div>
  `;
}

export function renderLoadingSkeleton(count = 3, type = 'card') {
  const skeletons = Array(count).fill(0).map(() => {
    if (type === 'card') {
      return `
        <div class="skeleton-card">
          <div class="skeleton skeleton-avatar"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text-short"></div>
        </div>
      `;
    } else if (type === 'list') {
      return `
        <div class="skeleton-list-item">
          <div class="skeleton skeleton-avatar-sm"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      `;
    } else if (type === 'post') {
      return `
        <div class="skeleton-post">
          <div class="skeleton skeleton-header">
            <div class="skeleton skeleton-avatar-sm"></div>
            <div class="skeleton skeleton-text-short"></div>
          </div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      `;
    }
    return '';
  }).join('');

  return `<div class="loading-skeletons">${skeletons}</div>`;
}

export function renderPageLoading(text = 'Loading...') {
  return `
    <div class="page-loading">
      ${renderLoadingSpinner('lg', text)}
    </div>
  `;
}