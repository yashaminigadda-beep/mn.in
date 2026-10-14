import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import Instagram from './InstagramIcon';
import { submitContactMessage } from '../lib/supabase';
import './Contact.css';

const INSTAGRAM_URL = 'https://www.instagram.com/mana_sathuluru?utm_source=ig_web_button_share_sheet&dlrf=ZDNlZDc0MzIxNw==';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.message.trim()) {
      e.message = 'Please write a message.';
    }
    if (formData.email.trim() && !formData.email.includes('@')) {
      e.email = 'Please enter a valid email address.';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);

    const result = await submitContactMessage(formData);

    if (result.success) {
      setStatus('success');
      setErrorMessage('');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong. Please check your connection or database permissions.');
    }
    setLoading(false);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">Your Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Enter your name (optional)"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            placeholder="your@email.com (optional)"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">Phone (Optional)</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91 XXXXX XXXXX"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            className="form-input"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">Message *</label>
        <textarea
          id="contact-message"
          name="message"
          className={`form-textarea ${errors.message ? 'input-error' : ''}`}
          placeholder="Share your thoughts, stories, or ask anything about Sathuluru..."
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          className="form-status form-status--success"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={18} />
          <span>Message sent! We'll get back to you soon. Thank you for connecting with Mana Sathuluru.</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          className="form-status form-status--error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={18} />
          <span>{errorMessage || 'Something went wrong. Please try again or reach out via Instagram.'}</span>
        </motion.div>
      )}

      <button
        type="submit"
        className="btn btn-gold contact-submit"
        disabled={loading}
        aria-label="Send message"
      >
        {loading ? (
          <>
            <span className="loading-spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true, margin: '-60px' });

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-bg-decor" aria-hidden="true" />

      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="about-overline">Connect</p>
          <h2 id="contact-title" className="section-title">Contact &amp; Community</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">Reach out, share your memories, and stay connected with the village</p>
        </motion.div>

        <div className="contact-layout">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-info-card card">
              <h3 className="contact-info-title">Get in Touch</h3>
              <p className="contact-info-desc">
                Are you from Sathuluru or have memories to share? We'd love to hear from you. Share your photos, stories, or suggestions to make this page even more special.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Location</div>
                    <div className="contact-detail-value">Sathuluru, Andhra Pradesh, India</div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Instagram</div>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-detail-link"
                    >
                      @manasathuluru
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-community-note">
                <h4>📸 Share Your Photos</h4>
                <p>
                  If you have beautiful photos or videos of Sathuluru that you'd like to see featured here, send them through Instagram or this form. Let's celebrate our village together!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="contact-form-card card">
              <h3 className="contact-form-title">Send a Message</h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
