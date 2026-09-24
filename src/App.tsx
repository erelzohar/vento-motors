import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Navigation is plain #hash anchors: the browser handles scrolling,
  // history and deep links (see scroll-behavior / scroll-margin-top in index.css)

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} />
      <div>
        <Hero />
        <Features />
        <Process />
        <Stats />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
}

export default App