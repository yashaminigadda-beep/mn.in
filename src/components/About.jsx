import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Users, Leaf, Star } from 'lucide-react';
import './About.css';

const features = [
  {
    icon: Heart,
    title: 'Rich Heritage',
    description: 'Sathuluru carries centuries of Telugu culture, ancient temples, and traditions passed down through generations of proud families.',
  },
  {
    icon: Users,
    title: 'United Community',
    description: 'A warm, close-knit community where every neighbor is family, celebrating milestones and supporting each other through every season.',
  },
  {
    icon: Leaf,
    title: 'Fertile Lands',
    description: 'Blessed with lush agricultural fields, sacred ponds, and natural beauty that sustains livelihoods and nourishes the soul.',
  },
  {
    icon: Star,
    title: 'Living Traditions',
    description: 'From vibrant annual festivals to daily rituals, the village pulses with the living heartbeat of Andhra Pradesh\'s timeless culture.',
  },
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="about-feature-card card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="feature-icon-wrapper">
        <feature.icon size={22} aria-hidden="true" />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const imgRef = useRef(null);
  const imgInView = useInView(imgRef, { once: true, margin: '-60px' });

  return (
    <section id="about" className="section about-section" aria-labelledby="about-title">
      {/* Decorative background */}
      <div className="about-bg-decor" aria-hidden="true" />

      <div className="container">
        <div className="about-layout">
          {/* Left: Image */}
          <motion.div
            ref={imgRef}
            className="about-image-col"
            initial={{ opacity: 0, x: -60 }}
            animate={imgInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="about-img-frame">
              <img
                src="/images/village-fields.jpg"
                alt="Aerial view of Sathuluru's lush green rice fields and village"
                className="about-main-img"
                loading="lazy"
              />
              <div className="about-img-overlay" />
            </div>
            <div className="about-img-accent-card">
              <img
                src="/images/village-pond.jpg"
                alt="Serene village pond with lotus flowers at sunset"
                className="about-accent-img"
                loading="lazy"
              />
            </div>
            {/* Golden frame decoration */}
            <div className="about-frame-border" aria-hidden="true" />
          </motion.div>

          {/* Right: Text */}
          <div className="about-text-col">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <p className="about-overline">Discover</p>
                <h2 id="about-title" className="section-title">About Our Village</h2>
                <div className="gold-divider" style={{ margin: '1rem 0' }} />
                <p className="section-subtitle" style={{ textAlign: 'left' }}>A gem nestled in the heart of Andhra Pradesh</p>
              </div>

              <div className="about-body-text">
                <p>
                  Sathuluru is a serene and beautiful village located in Andhra Pradesh, India — a place where ancient traditions breathe alongside natural splendor. Surrounded by lush paddy fields, swaying coconut groves, and peaceful water bodies, it is a land of timeless charm.
                </p>
                <p>
                  The village is home to warm, hardworking people who have preserved their Telugu heritage through generations. The sacred temples, vibrant festivals, and strong community bonds make Sathuluru not just a location — but a feeling of belonging, pride, and identity.
                </p>
                <p>
                  <em>Mana Sathuluru</em> — meaning "Our Sathuluru" — is a celebration of this identity, created by villagers and their families to share the beauty and culture of home with the world.
                </p>
              </div>
            </motion.div>

            {/* Feature cards */}
            <div className="about-features-grid">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
