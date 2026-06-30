import { getUserProfile } from '../main.js';
import { supabase } from '../lib/supabase.js';
import { router } from '../lib/router.js';
import { renderSidebar, setupSidebarHandlers } from '../components/sidebar.js';
import { renderHeader, setupHeaderHandlers } from '../components/header.js';
import { showToast } from '../utils/toast.js';
import { loadUniversities } from '../utils/universities.js';
import { departments, semesters } from '../utils/academic-options.js';
import { escapeHtml, safeImageUrl } from '../utils/html.js';
import { requestConnection } from '../utils/connections.js';
import { renderPageLoading, renderLoadingSkeleton } from '../components/loading.js';

let searchTimeout = null;

export async function renderSearch() {
  const app = document.getElementById('app');
  const profile = getUserProfile();
  
  // Show loading state with skeletons
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Find Students')}
        <main class="search-main">
          <div class="container">
            <!-- Search Filters -->
            <div class="search-filters glass-card slide-up">
              <div class="filters-header">
                <h3>Search Filters</h3>
                <button class="btn btn-ghost btn-sm" onclick="clearFilters()">Clear All</button>
              </div>
              <div class="filters-grid">
                <div class="form-group">
                  <label class="form-label" for="search-name">Name</label>
                  <input type="text" id="search-name" class="form-input" placeholder="Search by name..." oninput="handleSearch()">
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-university">University</label>
                  <select id="search-university" class="form-input" onchange="handleSearch()">
                    <option value="">All Universities</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-department">Department</label>
                  <select id="search-department" class="form-input" onchange="handleSearch()">
                    <option value="">All Departments</option>
                    ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-semester">Semester</label>
                  <select id="search-semester" class="form-input" onchange="handleSearch()">
                    <option value="">All Semesters</option>
                    ${semesters.map(s => `<option value="${s}">Semester ${s}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>

            <!-- Results -->
            <div class="search-results slide-up" style="animation-delay: 0.1s">
              <div class="results-header">
                <span class="results-count" id="results-count">Loading...</span>
              </div>
              <div class="results-grid" id="results-grid">
                ${renderLoadingSkeleton(6, 'card')}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .search-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .search-filters {
        padding: var(--space-6);
        margin-bottom: var(--space-6);
      }

      .filters-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-4);
      }

      .filters-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .filters-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .filters-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .filters-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .search-results {
        min-height: 400px;
      }

      .results-header {
        margin-bottom: var(--space-4);
      }

      .results-count {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .results-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .results-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .result-card {
        padding: var(--space-5);
        cursor: pointer;
        transition: all var(--transition-base);
      }

      .result-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .result-header {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-3);
      }

      .result-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-lg);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-lg);
        overflow: hidden;
        flex-shrink: 0;
      }

      .result-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .result-info {
        flex: 1;
        min-width: 0;
      }

      .result-name {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .result-university {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-1);
      }

      .result-department {
        font-size: var(--font-size-xs);
        color: var(--text-tertiary);
      }

      .result-bio {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-3);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-footer {
        display: flex;
        gap: var(--space-2);
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-4);
      }

      .loading-skeleton {
        height: 180px;
        border-radius: var(--radius-lg);
      }

      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
        color: var(--text-tertiary);
      }

      .empty-state svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      .empty-state h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }
    </style>
  `;
  
  setupSidebarHandlers();
  setupHeaderHandlers();
  
  const universities = await loadUniversities();
  window.cleanupCurrentPage = () => clearTimeout(searchTimeout);
  
  // Populate universities
  const universitySelect = document.getElementById('search-university');
  if (universitySelect) {
    universitySelect.innerHTML = `
      <option value="">All Universities</option>
      ${universities.map(uni => `<option value="${uni}">${uni}</option>`).join('')}
    `;
  }

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${renderHeader('Find Students')}

        <main class="search-main">
          <div class="container">
            <!-- Search Filters -->
            <div class="search-filters glass-card slide-up">
              <div class="filters-header">
                <h3>Search Filters</h3>
                <button class="btn btn-ghost btn-sm" onclick="clearFilters()">Clear All</button>
              </div>
              <div class="filters-grid">
                <div class="form-group">
                  <label class="form-label" for="search-name">Name</label>
                  <input type="text" id="search-name" class="form-input" placeholder="Search by name..." oninput="handleSearch()">
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-university">University</label>
                  <select id="search-university" class="form-input" onchange="handleSearch()">
                    <option value="">All Universities</option>
                    ${universities.map(uni => `<option value="${uni}">${uni}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-department">Department</label>
                  <select id="search-department" class="form-input" onchange="handleSearch()">
                    <option value="">All Departments</option>
                    ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-semester">Semester</label>
                  <select id="search-semester" class="form-input" onchange="handleSearch()">
                    <option value="">All Semesters</option>
                    ${semesters.map(s => `<option value="${s}">Semester ${s}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>

            <!-- Results -->
            <div class="search-results slide-up" style="animation-delay: 0.1s">
              <div class="results-header">
                <span class="results-count" id="results-count">Loading...</span>
              </div>
              <div class="results-grid" id="results-grid">
                <div class="loading-container">
                  <div class="loading-skeleton"></div>
                  <div class="loading-skeleton"></div>
                  <div class="loading-skeleton"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .search-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .search-filters {
        padding: var(--space-6);
        margin-bottom: var(--space-6);
      }

      .filters-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-4);
      }

      .filters-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .filters-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .filters-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .filters-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .search-results {
        min-height: 400px;
      }

      .results-header {
        margin-bottom: var(--space-4);
      }

      .results-count {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .results-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .results-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .result-card {
        padding: var(--space-5);
        cursor: pointer;
        transition: all var(--transition-base);
      }

      .result-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .result-header {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-3);
      }

      .result-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-lg);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-lg);
        overflow: hidden;
        flex-shrink: 0;
      }

      .result-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .result-info {
        flex: 1;
        min-width: 0;
      }

      .result-name {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .result-university {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-1);
      }

      .result-department {
        font-size: var(--font-size-xs);
        color: var(--text-tertiary);
      }

      .result-bio {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-3);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-footer {
        display: flex;
        gap: var(--space-2);
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-4);
      }

      .loading-skeleton {
        height: 180px;
        border-radius: var(--radius-lg);
      }

      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
        color: var(--text-tertiary);
      }

      .empty-state svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      .empty-state h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }
    </style>
  `;

  setupSidebarHandlers();
  setupHeaderHandlers();
  setupSearchHandlers();

  // Initial search
  handleSearch();
}

function setupSearchHandlers() {
  window.handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  };

  window.clearFilters = () => {
    document.getElementById('search-name').value = '';
    document.getElementById('search-university').value = '';
    document.getElementById('search-department').value = '';
    document.getElementById('search-semester').value = '';
    handleSearch();
  };

  window.viewProfile = (userId) => {
    router.navigate(`/profile?id=${userId}`);
  };

  window.connectWith = async (e, userId) => {
    e.stopPropagation();
    try {
      const status = await requestConnection(userId);
      showToast(
        status === 'accepted' ? 'You are already connected' : 'Connection request sent!',
        status === 'accepted' ? 'info' : 'success'
      );
    } catch {
      showToast('Failed to send request', 'error');
    }
  };
}

async function performSearch() {
  const profile = getUserProfile();
  const resultsGrid = document.getElementById('results-grid');
  const resultsCount = document.getElementById('results-count');

  const name = document.getElementById('search-name').value.trim();
  const university = document.getElementById('search-university').value;
  const department = document.getElementById('search-department').value;
  const semester = document.getElementById('search-semester').value;

  // Build query
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .neq('id', profile?.id || '');

  if (name) {
    query = query.ilike('full_name', `%${name}%`);
  }

  if (university) {
    query = query.eq('university', university);
  }

  if (department) {
    query = query.eq('department', department);
  }

  if (semester) {
    query = query.eq('semester', parseInt(semester));
  }

  query = query.limit(30);

  try {
    const { data, count, error } = await query;

    if (error) throw error;

    resultsCount.textContent = `${count || 0} student${count !== 1 ? 's' : ''} found`;

    if (!data || data.length === 0) {
      resultsGrid.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <h4>No students found</h4>
          <p>Try adjusting your search filters</p>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = data.map(student => renderResultCard(student)).join('');
  } catch (err) {
    resultsGrid.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h4>Failed to load results</h4>
        <p>Please try again</p>
      </div>
    `;
  }
}

function renderResultCard(student) {
  const initials = student.full_name?.split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'S';

  return `
    <div class="result-card card slide-up" onclick="viewProfile('${student.id}')">
      <div class="result-header">
        <div class="result-avatar avatar-lg">
          ${safeImageUrl(student.profile_image)
            ? `<img src="${safeImageUrl(student.profile_image)}" alt="${escapeHtml(student.full_name)}">`
            : `<span>${initials}</span>`
          }
        </div>
        <div class="result-info">
          <h4 class="result-name">${escapeHtml(student.full_name)}</h4>
          <p class="result-university">${escapeHtml(student.university)}</p>
          <p class="result-department">${escapeHtml(student.department)} - Semester ${student.semester}</p>
        </div>
      </div>
      ${student.bio ? `<p class="result-bio">${escapeHtml(student.bio)}</p>` : ''}
      <div class="result-footer">
        <button class="btn btn-primary btn-sm" onclick="connectWith(event, '${student.id}')">
          Connect
        </button>
        <button class="btn btn-outline btn-sm" onclick="viewProfile('${student.id}')">
          View Profile
        </button>
      </div>
    </div>
  `;
}
