import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music, Calendar, Star, Sparkles } from 'lucide-react';
import './Culture.css';

const festivals = [
  {
    id: 1,
    name: 'Sankranti',
    icon: Star,
    period: 'January',
    color: '#FFD700',
    description: 'The harvest festival celebrated with kite flying, Bhogi fires, Haridasu songs, and the making of traditional sweets shared with neighbors and family.',
  },
  {
    id: 2,
    name: 'Ugadi',
    icon: Calendar,
    period: 'March/April',
    color: '#4CAF50',
    description: 'The Telugu New Year welcomed with Ugadi Pachadi — a dish combining all six tastes — symbolizing the mixed experiences life brings throughout the year.',
  },
  {
    id: 3,
    name: 'Village Jatara',
    icon: Music,
    period: 'Annual',
    color: '#FF6B35',
    description: 'The grand annual temple festival with elaborate rituals, folk music, traditional dances, and grand processions that unite the entire village community.',
  },
  {
    id: 4,
    name: 'Deepavali',
    icon: Sparkles,
    period: 'October/November',
    color: '#FF9800',
    description: 'The festival of lights transforms Sathuluru into a glowing wonderland, with rows of oil lamps, fireworks, and the fragrance of sweets filling every home.',
  },
];

const traditions = [
  { label: 'Kuchipudi Dance', desc: 'Classical Telugu dance form' },
  { label: 'Rangoli Art', desc: 'Intricate floor designs at dawn' },
  { label: 'Haridasu Songs', desc: 'Traditional devotional music' },
  { label: 'Handloom Weaving', desc: 'Fine cotton and silk textiles' },
  { label: 'Organic Farming', desc: 'Generations of agricultural wisdom' },
  { label: 'Temple Rituals', desc: 'Daily prayers and seasonal pujas' },
];

function FestivalCard({ festival, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      className="festival-card card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ '--accent-color': festival.color }}
      aria-label={`${festival.name} festival`}
    >
      <div className="festival-icon-ring">
        <festival.icon size={24} aria-hidden="true" />
      </div>
      <div className="festival-period">{festival.period}</div>
      <h3 className="festival-name">{festival.name}</h3>
      <p className="festival-desc">{festival.description}</p>
      <div className="festival-glow" aria-hidden="true" />
    </motion.article>
  );
}

export default function Culture() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const tradRef = useRef(null);
  const tradInView = useInView(tradRef, { once: true, margin: '-60px' });

  return (
    <section id="culture" className="section culture-section" aria-labelledby="culture-title">
      {/* Background image with overlay */}
      <div className="culture-bg" aria-hidden="true">
        <img src="/images/village-festival.jpg" alt="" role="presentation" />
        <div className="culture-bg-overlay" />
      </div>

      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="about-overline">Celebrate</p>
          <h2 id="culture-title" className="section-title">Culture &amp; Festivals</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Where every season is a celebration and every celebration tells a story</p>
        </motion.div>

        {/* Festival Cards */}
        <div className="festivals-grid">
          {festivals.map((festival, i) => (
            <FestivalCard key={festival.id} festival={festival} index={i} />
          ))}
        </div>

        {/* Traditions Mosaic */}
        <motion.div
          ref={tradRef}
          className="traditions-section"
          initial={{ opacity: 0, y: 40 }}
          animate={tradInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h3 className="traditions-title">Living Traditions</h3>
          <div className="traditions-grid">
            {traditions.map((t, i) => (
              <motion.div
                key={t.label}
                className="tradition-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={tradInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span className="tradition-dot" aria-hidden="true" />
                <div>
                  <div className="tradition-label">{t.label}</div>
                  <div className="tradition-desc">{t.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
