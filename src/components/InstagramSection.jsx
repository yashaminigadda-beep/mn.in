import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import Instagram from './InstagramIcon';
import './InstagramSection.css';

const INSTAGRAM_URL = 'https://www.instagram.com/mana_sathuluru?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==';
const INSTAGRAM_HANDLE = '@mana_sathuluru';

// Placeholder Instagram post cards using local images
const instaPosts = [
  {
    id: 1,
    image: '/images/sathuluru-temple-real.jpg',
    caption: 'The timeless beauty of our village temple, standing tall through generations. 🙏 #ManaSathuluru #Heritage',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
  {
    id: 2,
    image: '/images/hero-bg.jpg',
    caption: 'Golden hour magic over the paddy fields. There is nowhere quite like home. 🌅 #Sathuluru #AndhraPradesh',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
  {
    id: 3,
    image: '/images/village-festival.jpg',
    caption: 'Festival vibes! Our culture lives in every beat, every step. 💃🎶 #Jatara #Telugu',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
  {
    id: 4,
    image: '/images/village-pond.jpg',
    caption: 'Morning serenity at the village pond. The lotus blooms as the sun rises. 🌸 #Nature #Village',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
  {
    id: 5,
    image: '/images/village-fields.jpg',
    caption: 'From above, our village looks like a painting. Blessed earth, blessed people. 🌿 #DronShot',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
  {
    id: 6,
    image: '/images/village-logo.jpg',
    caption: 'Mana Sathuluru — Our Village, Our Pride. Follow us to stay connected! ✨',
    likes: '—',
    comments: '—',
    link: INSTAGRAM_URL,
  },
];

function InstaCard({ post, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      ref={ref}
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="insta-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      aria-label={`View Instagram post: ${post.caption.substring(0, 60)}...`}
    >
      <div className="insta-card-image">
        <img src={post.image} alt="" role="presentation" loading="lazy" />
        <div className="insta-card-overlay">
          <div className="insta-card-stats">
            <span><Heart size={14} /> {post.likes}</span>
            <span><MessageCircle size={14} /> {post.comments}</span>
          </div>
          <ExternalLink size={18} className="insta-external" aria-hidden="true" />
        </div>
      </div>
      <div className="insta-card-caption">
        <p>{post.caption}</p>
      </div>
    </motion.a>
  );
}

export default function InstagramSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="instagram" className="section instagram-section" aria-labelledby="instagram-title">
      <div className="insta-bg-gradient" aria-hidden="true" />

      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="insta-logo-wrapper" aria-hidden="true">
            <Instagram size={32} />
          </div>
          <h2 id="instagram-title" className="section-title">Instagram &amp; Reels</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Follow our journey — village life, festivals, and daily moments</p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram insta-follow-btn"
            aria-label={`Follow ${INSTAGRAM_HANDLE} on Instagram`}
          >
            <Instagram size={17} />
            Follow {INSTAGRAM_HANDLE}
          </a>
        </motion.div>

        <div className="insta-grid">
          {instaPosts.map((post, i) => (
            <InstaCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <motion.div
          className="insta-cta-banner"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="insta-cta-icon">
            <Instagram size={28} />
          </div>
          <div>
            <p className="insta-cta-heading">Stay Connected with Mana Sathuluru</p>
            <p className="insta-cta-sub">Follow us on Instagram for the latest updates, photos and reels from our beloved village.</p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-instagram"
          >
            Follow Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
