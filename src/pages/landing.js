const isBrowserRuntime =
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  typeof import.meta !== 'undefined' &&
  'env' in import.meta &&
  import.meta.env?.SSR !== true;

if (isBrowserRuntime) {
  import('../styles/landing.css');
}

export async function renderLanding() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="landing-page">
      <!-- Navigation -->
      <nav class="landing-nav glass-card">
        <div class="container nav-container">
          <a href="/" class="nav-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text">UniSphere</span>
          </a>

          <div class="nav-links hide-mobile">
            <a href="#features" class="nav-link">Features</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#contact" class="nav-link">Contact</a>
          </div>

          <div class="nav-actions">
            <button class="btn btn-ghost" onclick="window.router.navigate('/login')">Login</button>
            <button class="btn btn-primary" onclick="window.router.navigate('/register')">Get Started</button>
          </div>

          <button class="mobile-menu-btn hide-tablet-up" id="mobile-menu-open" aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-drawer-backdrop" id="mobile-drawer-close"></div>
        <div class="mobile-drawer-panel">
          <div class="nav-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#gradM)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#gradM)"/>
                <circle cx="22" cy="12" r="3" fill="url(#gradM)"/>
                <circle cx="16" cy="21" r="3" fill="url(#gradM)"/>
                <defs>
                  <linearGradient id="gradM" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text">UniSphere</span>
          </div>
          <nav class="mobile-drawer-links">
            <a href="#features" onclick="closeMobileMenu()">Features</a>
            <a href="#about" onclick="closeMobileMenu()">About</a>
            <a href="#contact" onclick="closeMobileMenu()">Contact</a>
          </nav>
          <div class="mobile-drawer-actions">
            <button class="btn btn-secondary btn-lg" onclick="closeMobileMenu(); window.router.navigate('/login')">Login</button>
            <button class="btn btn-primary btn-lg" onclick="closeMobileMenu(); window.router.navigate('/register')">Get Started</button>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-bg">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        <div class="container hero-container">
          <div class="hero-content slide-up">
            <div class="hero-badge">
              <span class="badge">Connect Across Universities</span>
            </div>
            <h1 class="hero-title">
              Network with Students Across
              <span class="gradient-text">Pakistan</span>
            </h1>
            <p class="hero-subtitle">
              UniSphere connects students from different universities for collaboration,
              networking, study discussions, and building lifelong friendships.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" onclick="window.router.navigate('/register')">
                Start Networking
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button class="btn btn-outline btn-lg" onclick="window.router.navigate('/login')">
                Sign In
              </button>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Universities</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Students</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">Departments</span>
              </div>
            </div>
          </div>
          <div class="hero-preview fade-in">
            <div class="floating-card floating-card-1">
              <div class="float-avatar">MK</div>
              <div class="float-text">
                <strong>Muhammad Khan</strong>
                <span>Sent you a connection</span>
              </div>
            </div>
            <div class="floating-card floating-card-2">
              <div class="float-avatar" style="background: linear-gradient(135deg, #f59e0b, #ef4444)">FA</div>
              <div class="float-text">
                <strong>Fatima Ahmed</strong>
                <span>3 mutual connections</span>
              </div>
            </div>
            <div class="phone-frame">
              <div class="phone-notch"><span></span><span></span><span></span></div>
              <div class="phone-screen">
                <div class="mock-feed-header">
                  <strong>UniSphere Feed</strong>
                  <span class="mock-post-meta">Live</span>
                </div>
                <div class="mock-stories">
                  ${['You', 'Ali', 'Sara', 'Omar', 'Zain'].map((name, i) => `
                    <div class="mock-story">
                      <div class="mock-story-ring">
                        <div class="mock-story-avatar">${name === 'You' ? '+' : name.slice(0, 2)}</div>
                      </div>
                      <span class="mock-story-label">${name}</span>
                    </div>
                  `).join('')}
                </div>
                <div class="mock-post">
                  <div class="mock-post-head">
                    <div class="mock-post-avatar">AS</div>
                    <div>
                      <strong style="font-size:0.75rem">Ayesha Siddiqui</strong>
                      <div class="mock-post-meta">NUST · 2h ago</div>
                    </div>
                  </div>
                  <p class="mock-post-body">Looking for CS study partners for the midterms. Anyone from semester 5?</p>
                  <div class="mock-post-actions"><span>♥ 24</span><span>💬 8</span><span>↗ Share</span></div>
                </div>
                <div class="mock-post">
                  <div class="mock-post-head">
                    <div class="mock-post-avatar" style="background:linear-gradient(135deg,#a855f7,#3b82f6)">HR</div>
                    <div>
                      <strong style="font-size:0.75rem">Hassan Raza</strong>
                      <div class="mock-post-meta">LUMS · 5h ago</div>
                    </div>
                  </div>
                  <p class="mock-post-body">Great turnout at the campus career fair today! Met so many talented peers.</p>
                  <div class="mock-post-actions"><span>♥ 41</span><span>💬 12</span><span>↗ Share</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Why Choose UniSphere?</h2>
            <p class="section-subtitle">Everything you need to build meaningful academic connections</p>
          </div>
          <div class="features-grid">
            <div class="feature-card card slide-up" style="animation-delay: 0.1s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3 class="feature-title">Smart Discovery</h3>
              <p class="feature-desc">Find students by university, department, or interests with our powerful search filters.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.2s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 class="feature-title">Private Messaging</h3>
              <p class="feature-desc">Connect through secure, real-time messaging for study groups or one-on-one chats.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.3s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="feature-title">Build Network</h3>
              <p class="feature-desc">Grow your professional network with connections that last beyond graduation.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.4s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <h3 class="feature-title">Rich Profiles</h3>
              <p class="feature-desc">Showcase your academic journey with detailed profiles and professional bios.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.5s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="feature-title">Secure Platform</h3>
              <p class="feature-desc">Your data is protected with industry-standard security and privacy controls.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.6s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 class="feature-title">Real-time Updates</h3>
              <p class="feature-desc">Stay connected with instant notifications and live status updates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-text slide-up">
              <h2 class="section-title">Connecting Pakistan's Future Leaders</h2>
              <p class="about-desc">
                UniSphere was created with a simple mission: break down the barriers between universities
                and enable students to collaborate, learn, and grow together. Whether you're looking
                for study partners, professional networking, or just making new friends, UniSphere
                makes it happen.
              </p>
              <div class="about-features">
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Cross-university connections</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Study group formation</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Professional networking</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Knowledge sharing</span>
                </div>
              </div>
            </div>
            <div class="about-image fade-in">
              <div class="about-cards">
                <div class="about-card card">
                  <div class="about-card-icon avatar-lg">
                    <span style="background: var(--gradient-primary)">MK</span>
                  </div>
                  <h4>Muhammad Khan</h4>
                  <p>NUST, Computer Science</p>
                </div>
                <div class="about-card card">
                  <div class="about-card-icon avatar-lg">
                    <span style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)">FA</span>
                  </div>
                  <h4>Fatima Ahmed</h4>
                  <p>LUMS, Business Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section id="contact" class="cta-section">
        <div class="container">
          <div class="cta-card glass-card">
            <h2 class="cta-title">Ready to Expand Your Network?</h2>
            <p class="cta-subtitle">Join thousands of students already connecting on UniSphere</p>
            <div class="cta-actions">
              <button class="btn btn-primary btn-lg" onclick="window.router.navigate('/register')">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="footer-logo">
                <div class="logo-icon">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="url(#grad2)" stroke-width="2"/>
                    <circle cx="10" cy="12" r="3" fill="url(#grad2)"/>
                    <circle cx="22" cy="12" r="3" fill="url(#grad2)"/>
                    <circle cx="16" cy="21" r="3" fill="url(#grad2)"/>
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#3b82f6"/>
                        <stop offset="100%" style="stop-color:#a855f7"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span>UniSphere</span>
              </div>
              <p class="footer-tagline">Connecting Students Across Pakistan</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#about">About Us</a>
                <a href="/register" onclick="window.router.navigate('/register'); return false;">Get Started</a>
              </div>
              <div class="footer-column">
                <h4>Support</h4>
                <a href="#contact">Contact</a>
                <a href="#">Help Center</a>
                <a href="#">Privacy</a>
              </div>
              <div class="footer-column">
                <h4>Connect</h4>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} UniSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `;

  setupLandingHandlers();
}

function setupLandingHandlers() {
  const drawer = document.getElementById('mobile-drawer');
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-drawer-close');

  window.openMobileMenu = () => drawer?.classList.add('open');
  window.closeMobileMenu = () => drawer?.classList.remove('open');

  openBtn?.addEventListener('click', openMobileMenu);
  closeBtn?.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
}
