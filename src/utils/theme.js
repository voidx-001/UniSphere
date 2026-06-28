// Theme management
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  return savedTheme;
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  return next;
}

const isBrowserRuntime =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof import.meta !== 'undefined' &&
  'env' in import.meta &&
  import.meta.env?.SSR !== true;

// Initialize on load in the browser only
if (isBrowserRuntime) {
  initTheme();
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme');
}
