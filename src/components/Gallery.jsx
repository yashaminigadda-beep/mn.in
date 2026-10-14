import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    src: '/images/sathuluru-temple-real.jpg',
    alt: 'Historic Sathuluru village temple gopuram and coconut palms',
    title: 'Village Temple Gopuram',
    type: 'photo',
    span: 'wide',
  },
  {
    id: 2,
    src: '/images/sathuluru-sunset-real.jpg',
    alt: 'Golden fiery sunset sky over Sathuluru village',
    title: 'Sathuluru Sunset Sky',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 3,
    src: '/images/sathuluru-panorama.jpg',
    alt: 'Sathuluru triple panorama: sunset, temple gopuram, and cloudscapes',
    title: 'Sathuluru Panorama',
    type: 'photo',
    span: 'tall',
  },
  {
    id: 4,
    src: '/images/hero-bg.jpg',
    alt: 'Sathuluru village at golden sunset with temple and paddy fields',
    title: 'Golden Sunset Fields',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 5,
    src: '/images/sathuluru-sky-real.jpg',
    alt: 'Dramatic cirrocumulus sky over Sathuluru village homes',
    title: 'Village Skies & Homes',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 6,
    src: '/images/village-fields.jpg',
    alt: 'Aerial view of lush green paddy fields and village',
    title: 'Paddy Fields',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 7,
    src: '/images/village-festival.jpg',
    alt: 'Traditional Kuchipudi dance performance at temple festival',
    title: 'Festival Dance',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 8,
    src: '/images/village-pond.jpg',
    alt: 'Serene village pond with lotus flowers at sunset',
    title: 'Lotus Pond',
    type: 'photo',
    span: 'normal',
  },
  {
    id: 9,
    src: '/images/village-logo.jpg',
    alt: 'Mana Sathuluru village emblem with golden border',
    title: 'Village Emblem',
    type: 'photo',
    span: 'normal',
  },
];

function Lightbox({ items, currentIndex, onClose, onPrev, onNext }) {
  const item = items[currentIndex];

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo lightbox: ${item.title}`}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
        <X size={22} />
      </button>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous photo"
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={28} />
      </button>

      <motion.div
        className="lightbox-content"
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.alt} />
        <div className="lightbox-caption">
          <h4>{item.title}</h4>
          <span>{currentIndex + 1} / {items.length}</span>
        </div>
      </motion.div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next photo"
        disabled={currentIndex === items.length - 1}
      >
        <ChevronRight size={28} />
      </button>
    </motion.div>
  );
}

function GalleryItem({ item, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`gallery-item ${item.span === 'wide' ? 'gallery-item--wide' : ''} ${item.span === 'tall' ? 'gallery-item--tall' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(index); }}
    >
      <img src={item.src} alt={item.alt} loading="lazy" />
      <div className="gallery-item-overlay">
        <div className="gallery-item-info">
          <ZoomIn size={20} aria-hidden="true" />
          <span>{item.title}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => Math.max(0, i - 1));
  const nextPhoto = () => setLightboxIndex(i => Math.min(galleryItems.length - 1, i + 1));

  return (
    <section id="gallery" className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="about-overline">Memories</p>
          <h2 id="gallery-title" className="section-title">Photo Gallery</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Moments frozen in time from the heart of Sathuluru</p>
        </motion.div>

        <div className="gallery-grid" role="list">
          {galleryItems.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              onClick={openLightbox}
            />
          ))}
        </div>

        <motion.p
          className="gallery-cta-text"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Have photos of Sathuluru? Share them with the community via our{' '}
          <a href="#contact" className="gallery-link" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            contact form
          </a>.
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
