import { router } from '../lib/router.js';

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

          <button class="mobile-menu-btn hide-tablet-up">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

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
          <div class="hero-image fade-in">
            <div class="hero-mockup">
              <div class="mockup-card glass-card">
                <div class="mockup-header">
                  <div class="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div class="mockup-content">
                  <div class="mockup-avatar">
                    <span>AS</span>
                  </div>
                  <div class="mockup-info">
                    <div class="mockup-name"></div>
                    <div class="mockup-meta"></div>
                  </div>
                  <div class="mockup-actions">
                    <div class="mockup-btn"></div>
                  </div>
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
                <div class="about-card card" style="margin-top: 60px">
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
      <section class="cta-section">
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

    <style>
      .landing-page {
        min-height: 100vh;
        background: var(--bg-primary);
      }

      /* Navigation */
      .landing-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: var(--space-4) 0;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: var(--font-size-lg);
      }

      .logo-icon {
        width: 36px;
        height: 36px;
      }

      .logo-icon svg {
        width: 100%;
        height: 100%;
      }

      .nav-links {
        display: flex;
        gap: var(--space-8);
      }

      .nav-link {
        color: var(--text-secondary);
        font-weight: 500;
        transition: color var(--transition-fast);
      }

      .nav-link:hover {
        color: var(--text-primary);
      }

      .nav-actions {
        display: flex;
        gap: var(--space-2);
      }

      .mobile-menu-btn {
        color: var(--text-primary);
        padding: var(--space-2);
      }

      /* Hero Section */
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 120px 0 80px;
        overflow: hidden;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .hero-gradient {
        position: absolute;
        top: -50%;
        right: -20%;
        width: 80%;
        height: 150%;
        background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
      }

      .hero-pattern {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .hero-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .hero-container {
          grid-template-columns: 1fr 1fr;
        }
      }

      .hero-content {
        position: relative;
        z-index: 1;
      }

      .hero-badge {
        margin-bottom: var(--space-4);
      }

      .hero-title {
        font-size: clamp(2rem, 5vw, var(--font-size-5xl));
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin-bottom: var(--space-6);
        color: var(--text-primary);
      }

      .gradient-text {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-8);
        max-width: 540px;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-4);
        margin-bottom: var(--space-10);
      }

      .hero-stats {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        flex-wrap: wrap;
      }

      .stat-item {
        text-align: center;
      }

      .stat-number {
        display: block;
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
      }

      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .stat-divider {
        width: 1px;
        height: 40px;
        background: var(--border-color);
      }

      .hero-image {
        position: relative;
      }

      .hero-mockup {
        position: relative;
        perspective: 1000px;
      }

      .mockup-card {
        padding: var(--space-6);
        max-width: 320px;
        margin: 0 auto;
        transform: rotateY(-5deg) rotateX(5deg);
        transition: transform var(--transition-slow);
      }

      .mockup-card:hover {
        transform: rotateY(0) rotateX(0);
      }

      .mockup-header {
        margin-bottom: var(--space-4);
      }

      .mockup-dots {
        display: flex;
        gap: var(--space-2);
      }

      .mockup-dots span {
        width: 12px;
        height: 12px;
        border-radius: var(--radius-full);
        background: var(--bg-tertiary);
      }

      .mockup-dots span:first-child { background: var(--error-500); }
      .mockup-dots span:nth-child(2) { background: var(--warning-500); }
      .mockup-dots span:last-child { background: var(--success-500); }

      .mockup-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
      }

      .mockup-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-lg);
      }

      .mockup-info {
        width: 100%;
        text-align: center;
      }

      .mockup-name {
        width: 60%;
        height: 16px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-sm);
        margin: 0 auto var(--space-2);
      }

      .mockup-meta {
        width: 40%;
        height: 12px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-sm);
        margin: 0 auto;
      }

      .mockup-actions {
        width: 100%;
      }

      .mockup-btn {
        height: 40px;
        background: var(--gradient-primary);
        border-radius: var(--radius-lg);
      }

      /* Features Section */
      .features-section {
        padding: var(--space-20) 0;
        background: var(--bg-secondary);
      }

      .section-header {
        text-align: center;
        margin-bottom: var(--space-16);
      }

      .section-title {
        font-size: var(--font-size-3xl);
        font-weight: 700;
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }

      .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }

      .features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .features-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .feature-card {
        padding: var(--space-8);
        text-align: center;
      }

      .feature-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto var(--space-4);
        background: var(--primary-50);
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      [data-theme="dark"] .feature-icon {
        background: rgba(59, 130, 246, 0.1);
      }

      .feature-icon svg {
        width: 32px;
        height: 32px;
      }

      .feature-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }

      .feature-desc {
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
      }

      /* About Section */
      .about-section {
        padding: var(--space-20) 0;
      }

      .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .about-content {
          grid-template-columns: 1fr 1fr;
        }
      }

      .about-text {
        max-width: 540px;
      }

      .about-desc {
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-6);
      }

      .about-features {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .about-feature {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--text-secondary);
      }

      .about-cards {
        position: relative;
      }

      .about-card {
        padding: var(--space-6);
        text-align: center;
        max-width: 240px;
      }

      .about-card h4 {
        font-weight: 600;
        margin: var(--space-4) 0 var(--space-2);
        color: var(--text-primary);
      }

      .about-card p {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      /* CTA Section */
      .cta-section {
        padding: var(--space-16) 0;
      }

      .cta-card {
        padding: var(--space-12);
        text-align: center;
        background: var(--gradient-primary);
        position: relative;
        overflow: hidden;
      }

      .cta-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      .cta-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: white;
        margin-bottom: var(--space-4);
        position: relative;
      }

      .cta-subtitle {
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: var(--space-8);
        position: relative;
      }

      .cta-actions .btn-primary {
        background: white;
        color: var(--primary-600);
        position: relative;
      }

      .cta-actions .btn-primary:hover {
        background: var(--gray-100);
      }

      /* Footer */
      .landing-footer {
        background: var(--bg-secondary);
        padding: var(--space-16) 0 var(--space-8);
      }

      .footer-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-10);
        margin-bottom: var(--space-10);
      }

      @media (min-width: 768px) {
        .footer-content {
          grid-template-columns: 2fr 3fr;
        }
      }

      .footer-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
        margin-bottom: var(--space-3);
      }

      .footer-tagline {
        color: var(--text-tertiary);
      }

      .footer-links {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-6);
      }

      .footer-column h4 {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      }

      .footer-column a {
        display: block;
        color: var(--text-tertiary);
        margin-bottom: var(--space-2);
        font-size: var(--font-size-sm);
      }

      .footer-column a:hover {
        color: var(--primary-600);
      }

      .footer-bottom {
        padding-top: var(--space-8);
        border-top: 1px solid var(--border-color);
        text-align: center;
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
    </style>
  `;

  // Make router available globally for onclick handlers
  window.router = router;
}
