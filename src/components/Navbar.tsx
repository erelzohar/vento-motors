import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

interface NavbarProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  const navTextColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(255, 255, 255)', 'rgb(55, 65, 81)']
  );

  const navLogoColor = useTransform(
    scrollY,
    [0, 100],
    ['rgb(255, 255, 255)', 'rgb(255, 69, 0)']
  );

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className="fixed w-full z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            style={{ color: navLogoColor }}
            className="text-2xl font-bold"
          >
            ונטו מוטורס
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {[
              { name: 'בית', id: 'hero' },
              { name: 'קצת עלינו', id: 'features' },
              { name: 'איך מתחילים ', id: 'process' },
              { name: 'קבל הצעה ', id: 'contact-form' }
            ].map((item) => (
              <motion.button
                key={item.id}
                style={{ color: navTextColor }}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'text-sunset' : ''}`}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            style={{ color: navTextColor }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-sunset transition-colors"
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-2 bg-white shadow-lg rounded-b-lg"
          >
            {[
              { name: 'בית', id: 'hero' },
              { name: 'קצת עלינו ', id: 'features' },
              { name: 'איך מתחילים  ', id: 'process' },
              { name: 'קבל הצעה ', id: 'contact-form' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {scrollToSection(item.id);setIsMenuOpen(false);}}
                className={`block w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-50 ${
                  activeSection === item.id ? 'text-sunset bg-gray-50' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}