import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Sunset, TreePine, Droplets } from 'lucide-react';
import './Explore.css';

const landmarks = [
  {
    id: 1,
    title: 'Village Temple',
    category: 'Spiritual',
    icon: MapPin,
    image: '/images/sathuluru-temple-real.jpg',
    description: 'The ancient guardian deity temple stands at the heart of village life, drawing devotees for daily prayers and major festivals throughout the year.',
    tag: 'Heritage',
  },
  {
    id: 2,
    title: 'Paddy Fields',
    category: 'Nature',
    icon: TreePine,
    image: '/images/village-fields.jpg',
    description: 'Vast green paddy fields stretch across the landscape, reflecting the sky and sustaining the agricultural heritage that defines Sathuluru\'s identity.',
    tag: 'Agriculture',
  },
  {
    id: 3,
    title: 'Sacred Pond',
    category: 'Nature',
    icon: Droplets,
    image: '/images/village-pond.jpg',
    description: 'The village pond adorned with blooming lotus flowers serves as both a sacred site and a serene gathering place for the community.',
    tag: 'Scenic',
  },
  {
    id: 4,
    title: 'Golden Sunsets',
    category: 'Experience',
    icon: Sunset,
    image: '/images/hero-bg.jpg',
    description: 'Every evening, the sky above Sathuluru transforms into a breathtaking canvas of gold and orange, painting the silhouettes of coconut palms.',
    tag: 'Scenic',
  },
];

function ExploreCard({ landmark, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className="explore-card card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label={landmark.title}
    >
      <div className="explore-card-image">
        <img src={landmark.image} alt={landmark.title} loading="lazy" />
        <div className="explore-card-overlay" />
        <span className="explore-card-tag">{landmark.tag}</span>
      </div>
      <div className="explore-card-body">
        <div className="explore-card-category">
          <landmark.icon size={12} aria-hidden="true" />
          {landmark.category}
        </div>
        <h3 className="explore-card-title">{landmark.title}</h3>
        <p className="explore-card-desc">{landmark.description}</p>
      </div>
      <div className="explore-card-shine" aria-hidden="true" />
    </motion.article>
  );
}

export default function Explore() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="explore" className="section explore-section" aria-labelledby="explore-title">
      <div className="explore-bg-pattern" aria-hidden="true" />

      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="about-overline">Discover</p>
          <h2 id="explore-title" className="section-title">Explore Sathuluru</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Wander through the landmarks and natural wonders of our beloved village</p>
        </motion.div>

        <div className="explore-grid">
          {landmarks.map((landmark, i) => (
            <ExploreCard key={landmark.id} landmark={landmark} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
