import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Explore from './components/Explore';
import Culture from './components/Culture';
import Gallery from './components/Gallery';
import InstagramSection from './components/InstagramSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('dark');

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('mana-sathuluru-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mana-sathuluru-theme', next);
      document.documentElement.classList.toggle('light-theme', next === 'light');
      return next;
    });
  };

  return (
    <div className="app" data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Explore />
        <Culture />
        <Gallery />
        <InstagramSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
