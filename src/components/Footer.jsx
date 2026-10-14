import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Instagram from './InstagramIcon';
import './Footer.css';

const INSTAGRAM_URL = 'https://www.instagram.com/mana_sathuluru?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Explore', href: '#explore' },
  { label: 'Culture', href: '#culture' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (href, e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      {/* Top Wave */}
      <div className="footer-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--black-rich)" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          {/* Main Footer Grid */}
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/images/village-logo.jpg" alt="Mana Sathuluru Logo" />
                <div>
                  <div className="footer-logo-name">Mana Sathuluru</div>
                  <div className="footer-logo-tagline">Our Village • Our Pride</div>
                </div>
              </div>
              <p className="footer-brand-desc">
                A digital home for the people of Sathuluru, Andhra Pradesh — celebrating our heritage, culture, and the timeless beauty of our beloved village.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-instagram footer-instagram-btn"
                aria-label="Follow Mana Sathuluru on Instagram"
              >
                <Instagram size={16} />
                Follow on Instagram
              </a>
            </div>

            {/* Nav Links */}
            <div className="footer-nav-col">
              <h3 className="footer-col-title">Navigate</h3>
              <ul className="footer-nav-list" role="list">
                {footerLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="footer-nav-link"
                      onClick={(e) => handleNavClick(href, e)}
                    >
                      <span className="footer-link-arrow" aria-hidden="true">›</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location / Info */}
            <div className="footer-info-col">
              <h3 className="footer-col-title">Village</h3>
              <div className="footer-info-items">
                <div className="footer-info-item">
                  <span className="footer-info-label">Village</span>
                  <span className="footer-info-value">Sathuluru</span>
                </div>
                <div className="footer-info-item">
                  <span className="footer-info-label">State</span>
                  <span className="footer-info-value">Andhra Pradesh</span>
                </div>
                <div className="footer-info-item">
                  <span className="footer-info-label">Country</span>
                  <span className="footer-info-value">India</span>
                </div>
                <div className="footer-info-item">
                  <span className="footer-info-label">Instagram</span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-info-link"
                  >
                    @manasathuluru
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {currentYear} Mana Sathuluru. Made with{' '}
              <Heart size={12} className="footer-heart" aria-label="love" />{' '}
              for the people of Sathuluru.
            </p>
            <p className="footer-disclaimer">
              This is a community page. All images and content celebrate our village heritage.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
