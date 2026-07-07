export function Footer() {
  const logoSvg = `
    <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L2 14h4v14h7v-8h6v8h7V14h4L16 2z"/>
    </svg>
  `;

  return `
    <footer class="app-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-logo">
              ${logoSvg}
              <span>HAVEN</span>
            </div>
            <p class="footer-text">
              Eliminating trust issues in the Nigerian rental ecosystem through institutional-grade verification, qualifying AI intelligence, and secure escrow services.
            </p>
          </div>
          <div>
            <h4 class="footer-title">Platform</h4>
            <ul class="footer-links">
              <li><a href="#register" class="footer-link">Verify Identity</a></li>
              <li><a href="#login" class="footer-link">Tenant Qualification</a></li>
              <li><a href="#landing" class="footer-link">How it Works</a></li>
              <li><a href="#landing" class="footer-link">Corporate Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Resources</h4>
            <ul class="footer-links">
              <li><a href="#faq" class="footer-link">Frequently Asked Questions</a></li>
              <li><a href="#" class="footer-link">Help Center</a></li>
              <li><a href="#" class="footer-link">Landlord Guides</a></li>
              <li><a href="#" class="footer-link">Tenant Playbooks</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-title">Security & Contact</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Escrow Safety Policy</a></li>
              <li><a href="#" class="footer-link">Privacy Regulations</a></li>
              <li><a href="mailto:support@haven.ng" class="footer-link">support@haven.ng</a></li>
              <li><a href="tel:+23412345678" class="footer-link">+234 (0) 1 234 5678</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-copy">
            &copy; ${new Date().getFullYear()} Haven Rental Intelligence. All rights reserved.
          </div>
          <div style="display: flex; gap: 24px;">
            <a href="#" class="footer-link" style="font-size: var(--font-small)">Terms of Service</a>
            <a href="#" class="footer-link" style="font-size: var(--font-small)">Privacy Policy</a>
            <a href="#" class="footer-link" style="font-size: var(--font-small)">Escrow Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
