import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineCog,
  HiOutlineZoomIn,
  HiOutlineZoomOut,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineKey,
  HiOutlineDocument,
  HiX,
  HiOutlineExclamationCircle
} from 'react-icons/hi';

interface AccessibilityPreferences {
  fontSize: number;
  highContrast: boolean;
  keyboardMode: boolean;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 100,
  highContrast: false,
  keyboardMode: false,
};

export function AccessibilityWidget({ openAccessibilityStatement }: { openAccessibilityStatement: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('accessibilityPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Apply preferences whenever they change
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));

    // Apply font size using CSS custom property
    document.documentElement.style.setProperty('--content-scale', (preferences.fontSize / 100).toString());

    // Apply high contrast
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply keyboard mode
    if (preferences.keyboardMode) {
      document.documentElement.classList.add('keyboard-mode');
    } else {
      document.documentElement.classList.remove('keyboard-mode');
    }
  }, [preferences]);

  const adjustFontSize = (delta: number) => {
    setPreferences(prev => ({
      ...prev,
      fontSize: Math.max(80, Math.min(150, prev.fontSize + delta))
    }));
  };

  const toggleHighContrast = () => {
    setPreferences(prev => ({
      ...prev,
      highContrast: !prev.highContrast
    }));
  };

  const toggleKeyboardMode = () => {
    setPreferences(prev => ({
      ...prev,
      keyboardMode: !prev.keyboardMode
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleAccessibilityStatement = () => {
    openAccessibilityStatement();
    setIsOpen(false);
  };

  const email = 'ventomotorsil@gmail.com';
  const subject = 'דיווח על בעיית נגישות';
  const body = 'אנא תאר את הבעיה שנתקלת בה:';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="accessibility-widget">
      {/* Accessibility Toggle Button */}
      <button
        aria-label="פתח תפריט נגישות"
        onClick={togglePanel}
        className="fixed left-4 bottom-4 z-50 bg-sunset text-white p-2 rounded-full shadow-lg hover:bg-sunset-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sunset transition-colors"
      >
        <HiOutlineCog className="w-5 h-5" />
      </button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed left-4 bottom-20 z-50 bg-white rounded-lg shadow-xl p-6 w-72 rtl"
            role="dialog"
            aria-label="אפשרויות נגישות"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
              aria-label="סגור תפריט נגישות"
            >
              <HiX className="w-5 h-5" />
            </button>

            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-900 mb-4">הגדרות נגישות</h2>

              {/* Font Size Controls */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">גודל טקסט</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => adjustFontSize(-10)}
                    className="accessibility-button"
                    aria-label="הקטן גודל טקסט"
                  >
                    <HiOutlineZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">{preferences.fontSize}%</span>
                  <button
                    onClick={() => adjustFontSize(10)}
                    className="accessibility-button"
                    aria-label="הגדל גודל טקסט"
                  >
                    <HiOutlineZoomIn className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contrast Toggle */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">ניגודיות</h3>
                <button
                  onClick={toggleHighContrast}
                  className={`accessibility-button w-full justify-between ${
                    preferences.highContrast ? 'active' : ''
                  }`}
                  aria-pressed={preferences.highContrast}
                >
                  <span>ניגודיות גבוהה</span>
                  {preferences.highContrast ? (
                    <HiOutlineMoon className="w-5 h-5" />
                  ) : (
                    <HiOutlineSun className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Keyboard Navigation */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">ניווט מקלדת</h3>
                <button
                  onClick={toggleKeyboardMode}
                  className={`accessibility-button w-full justify-between ${
                    preferences.keyboardMode ? 'active' : ''
                  }`}
                  aria-pressed={preferences.keyboardMode}
                >
                  <span>הדגשת פוקוס</span>
                  <HiOutlineKey className="w-5 h-5" />
                </button>
              </div>

              {/* Accessibility Statement */}
              <button
                onClick={handleAccessibilityStatement}
                className="accessibility-button w-full justify-between mb-6"
                aria-label="פתח הצהרת נגישות"
              >
                <span>הצהרת נגישות</span>
                <HiOutlineDocument className="w-5 h-5" />
              </button>

              {/* Report Problem Link */}
              <a
                href={mailtoLink}
                onClick={() => setIsOpen(false)}
                className="accessibility-button w-full justify-between mb-6 inline-flex"
                aria-label="דווח על בעיית נגישות"
              >
                <span>דווח על בעיה</span>
                <HiOutlineExclamationCircle className="w-5 h-5" />
              </a>

              {/* Reset Button */}
              <button
                onClick={resetPreferences}
                className="accessibility-button w-full"
                aria-label="אפס הגדרות נגישות"
              >
                אפס הגדרות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}