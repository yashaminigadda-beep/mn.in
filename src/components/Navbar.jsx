import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Instagram from './InstagramIcon';
import './Navbar.css';

const INSTAGRAM_URL = 'https://www.instagram.com/mana_sathuluru?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Explore', href: '#explore' },
  { label: 'Culture', href: '#culture' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-container">
          {/* Logo */}
          <a className="navbar-logo" href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} aria-label="Mana Sathuluru Home">
            <img src="/images/village-logo.jpg" alt="Mana Sathuluru Logo" className="logo-img" />
            <span className="logo-text">Mana Sathuluru</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar-links" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`nav-link ${activeSection === href.replace('#', '') ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                >
                  {label}
                  <span className="nav-link-underline" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-instagram navbar-instagram"
              aria-label="Follow us on Instagram"
            >
              <Instagram size={15} />
              Follow Us
            </a>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <ul role="list">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={href}
                    className={`mobile-nav-link ${activeSection === href.replace('#', '') ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-instagram mobile-instagram"
                >
                  <Instagram size={16} />
                  Follow on Instagram
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.07 }}
              >
                <button
                  className="theme-toggle mobile-theme-toggle"
                  onClick={() => { toggleTheme(); setMenuOpen(false); }}
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
