import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import './Hero.css';

// Particle component
function Particle({ style }) {
  return <div className="particle" style={style} aria-hidden="true" />;
}

// Generate random particles
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    delay: `${Math.random() * 8}s`,
    duration: `${8 + Math.random() * 12}s`,
    opacity: 0.3 + Math.random() * 0.5,
  }));
}

const particles = generateParticles(30);

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1, scale: 1,
      transition: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }
    }
  };

  return (
    <section id="home" className="hero" aria-label="Hero section">
      {/* Background with Ken Burns */}
      <div className="hero-bg-wrapper">
        <motion.div
          className="hero-bg"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        <div className="hero-bg-overlay" />
        <div className="hero-bg-gradient-bottom" />
        <div className="hero-bg-gradient-top" />
      </div>

      {/* Floating Particles */}
      <div className="particles-container" aria-hidden="true">
        {particles.map(p => (
          <Particle
            key={p.id}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Foreground Leaves */}
      <div className="hero-leaves" aria-hidden="true">
        <div className="leaf leaf-left" />
        <div className="leaf leaf-right" />
      </div>

      {/* Light Rays */}
      <div className="light-rays" aria-hidden="true">
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div
          className="hero-logo-wrapper"
          variants={logoVariants}
          aria-label="Mana Sathuluru village emblem"
        >
          <div className="logo-glow-ring" />
          <div className="logo-glow-ring logo-glow-ring-2" />
          <img
            src="/images/village-logo.jpg"
            alt="Mana Sathuluru Village Emblem"
            className="hero-logo-img"
          />
        </motion.div>

        {/* Heading */}
        <motion.div className="hero-heading-wrapper" variants={itemVariants}>
          <p className="hero-eyebrow">Welcome to</p>
          <h1 className="hero-title">
            <span className="hero-title-mana">Mana</span>
            <span className="hero-title-sathuluru">Sathuluru</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div className="hero-tagline-wrapper" variants={itemVariants}>
          <div className="tagline-divider" />
          <p className="hero-tagline">OUR VILLAGE &bull; OUR PRIDE</p>
          <div className="tagline-divider" />
        </motion.div>

        {/* Location */}
        <motion.div className="hero-location" variants={itemVariants}>
          <MapPin size={14} className="location-icon" aria-hidden="true" />
          <span>Sathuluru, Andhra Pradesh, India</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        className="scroll-indicator"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        aria-label="Scroll down to explore"
      >
        <span className="scroll-text">Explore</span>
        <div className="scroll-arrow">
          <ChevronDown size={20} />
        </div>
      </motion.button>
    </section>
  );
}
