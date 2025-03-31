import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AccessibilityWidget } from './components/AccessibilityWidget/AccessibilityWidget';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showAccessibilityStatement, setShowAccessibilityStatement] = useState(false);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const openAccessibilityStatement = () => {
    setShowAccessibilityStatement(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <div id="content-container">
        <Hero />
        <Features />
        <Process />
        <Stats />
        <Testimonials />
        <ContactForm />
        <Footer 
          showAccessibilityStatement={showAccessibilityStatement} 
          setShowAccessibilityStatement={setShowAccessibilityStatement} 
        />
      </div>
      <AccessibilityWidget openAccessibilityStatement={() => setShowAccessibilityStatement(true)} />
    </div>
  );
}

export default App;