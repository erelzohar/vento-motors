import React, { useState, useEffect } from 'react';
import { HiPhone, HiMail } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { WhatsAppModal } from './WhatsAppModal';
import { LegalModal } from './LegalModal';

interface FooterProps {
  showAccessibilityStatement: boolean;
  setShowAccessibilityStatement: (show: boolean) => void;
}

export function Footer({ showAccessibilityStatement, setShowAccessibilityStatement }: FooterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);
  
  const whatsappNumber = '972529100123';
  const whatsappText = 'היי, אני מעוניין למכור את הרכב שלי';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
  const phoneNumber = '052-9100123';
  const email = 'ventomotorsil@walla.com';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Watch for showAccessibilityStatement changes
  useEffect(() => {
    if (showAccessibilityStatement) {
      setActiveLegalModal('accessibility');
      setShowAccessibilityStatement(false);
    }
  }, [showAccessibilityStatement, setShowAccessibilityStatement]);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="h-5 w-5" />,
      href: 'https://www.facebook.com/ventomotors',
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="h-5 w-5" />,
      href: 'https://instagram.com/ventomotors_il',
      color: 'bg-[#E4405F] hover:bg-[#E4405F]/90'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="h-5 w-5" />,
      href: whatsappLink,
      color: 'bg-[#25D366] hover:bg-[#25D366]/90'
    },
    {
      name: 'TikTok',
      icon: <FaTiktok className="h-5 w-5" />,
      href: 'https://www.tiktok.com/@ventomotors1',
      color: 'bg-[#000000] hover:bg-[#000000]/90'
    }
  ];

  const legalContent = {
    privacy: (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">מדיניות פרטיות</h4>
        
        <h5 className="text-lg font-semibold">מידע שנאסף</h5>
        <p>
          האתר עשוי לאסוף מידע אישי כגון שם, טלפון ודוא"ל לצורך מתן שירות.
        </p>
        <p>
          בנוסף, נאסף מידע אנונימי (כגון כתובת IP) לשיפור חוויית המשתמש.
        </p>

        <h5 className="text-lg font-semibold">שימוש במידע</h5>
        <p>
          המידע ישמש ליצירת קשר עם המשתמשים, שליחת הצעות והודעות.
        </p>
        <p>
          החברה מתחייבת לא להעביר מידע אישי לצד שלישי ללא אישור המשתמש, למעט במקרים בהם חלה עליה חובה חוקית.
        </p>

        <h5 className="text-lg font-semibold">אבטחת מידע</h5>
        <p>
          החברה נוקטת באמצעי אבטחה מתקדמים לשמירה על פרטיות המשתמשים.
        </p>
        <p>
          עם זאת, אין אפשרות להבטיח אבטחה מוחלטת של הנתונים.
        </p>

        <h5 className="text-lg font-semibold">זכויות המשתמש</h5>
        <p>
          ניתן לפנות לחברה ולבקש מחיקת מידע אישי בהתאם לחוק הגנת הפרטיות.
        </p>
      </div>
    ),
    accessibility: (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">הצהרת נגישות</h4>
        <p>
          ונטו מוטורס מחויבת להנגשת האתר לכלל האוכלוסייה, כולל אנשים עם מוגבלויות, בהתאם לתקנות הנגישות.
        </p>

        <h5 className="text-lg font-semibold">אמצעים שננקטו</h5>
        <ul className="list-disc list-inside space-y-2">
          <li>אפשרות לשינוי גודל טקסט</li>
          <li>התאמות צבעים לשיפור ניגודיות</li>
          <li>אפשרות ניווט באמצעות מקלדת</li>
        </ul>

        <h5 className="text-lg font-semibold">פניות בנושא נגישות</h5>
        <p>
          במידה ומצאתם בעיה בנגישות האתר, ניתן לפנות אלינו בכתובת: {email} או בטלפון: {phoneNumber}
        </p>

        <h5 className="text-lg font-semibold">תאריך עדכון אחרון</h5>
        <p>
          הצהרת הנגישות עודכנה לאחרונה בתאריך 01.02.2024
        </p>
      </div>
    ),
    terms: (
      <div className="space-y-4">
        <h4 className="text-xl font-semibold">כללי</h4>
        <p>
          השימוש באתר ונטו מוטורס (להלן: "האתר") מהווה הסכמה מלאה לתנאי תקנון זה.
        </p>
        <p>
          האתר מספק מידע ושירותים לרכישת רכבים, הצעות מחיר ויצירת קשר עם החברה.
        </p>
        <h4 className="text-xl font-semibold mt-6">שימוש באתר</h4>
        <p>
          המשתמש מתחייב להשתמש באתר בהתאם לדין ולהימנע מכל שימוש לרעה.
        </p>
        <p>
          אין להעתיק, לשכפל או להפיץ תוכן מהאתר ללא אישור בכתב.
        </p>

        <h4 className="text-xl font-semibold mt-6">אחריות</h4>
        <p>
          האתר פועל לספק מידע מדויק, אך אינו מתחייב כי המידע יהיה נטול שגיאות או הפרעות.
        </p>
        <p>
          ונטו מוטורס אינה אחראית לנזקים שייגרמו עקב שימוש באתר.
        </p>
        <p>
          כל התוכן, המידע, התמונות וההדמיות המופיעים באתר נועדו להמחשה בלבד ואינם מהווים מצג מחייב, התחייבות חוזית, ייעוץ מקצועי או התחייבות משפטית מכל סוג .
        </p>
        <p>
         החברה שומרת לעצמה את הזכות לבצע שינויים במוצרים, בשירותים או בפרטים המופיעים באתר בכל עת וללא הודעה מוקדמת. במקרה של סתירה בין המידע באתר לבין מידע רשמי המסופק על ידי החברה, ייחשב המידע הרשמי כנכון.
        </p>
        <h4 className="text-xl font-semibold mt-6">שינויים בתקנון</h4>
        <p>
          החברה רשאית לעדכן את התקנון מעת לעת, והמשך השימוש באתר מהווה הסכמה לשינויים.
        </p>
      </div>
    )
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-sunset">ונטו מוטורס</h3>
            <p className="mt-4 text-gray-400">
              הדרך המהירה והקלה ביותר למכור את הרכב שלך
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  onClick={social.name === 'WhatsApp' ? handleWhatsAppClick : undefined}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">צור קשר</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href={`tel:${phoneNumber.replace("-","")}`} 
                  className="flex items-center gap-2 hover:text-sunset transition-colors"
                >
                  <HiPhone className="h-5 w-5" />
                  <span>{phoneNumber}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${email}`} 
                  className="flex items-center gap-2 hover:text-sunset transition-colors"
                >
                  <HiMail className="h-5 w-5" />
                  <span>{email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">שעות פעילות</h4>
            <ul className="space-y-2 text-gray-400">
              <li>ראשון - חמישי: 8:00 - 00:00</li>
              <li>שישי: 8:00 - 18:00</li>
              <li>שבת: סגור</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="text-gray-400 hover:text-sunset transition-colors"
            >
              מדיניות פרטיות
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => setActiveLegalModal('accessibility')}
              className="text-gray-400 hover:text-sunset transition-colors"
            >
              הצהרת נגישות
            </button>
            <span className="text-gray-600">|</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="text-gray-400 hover:text-sunset transition-colors"
            >
              תנאי שימוש
            </button>
          </div>
          <div className="text-gray-400">
            <p>© {new Date().getFullYear()} ונטו מוטורס. כל הזכויות שמורות.</p>
            <p className="mt-2">
              נבנה על ידי{' '}
              <a 
                href="https://instagram.com/ezwebs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sunset hover:text-sunset/80 transition-colors"
              >
                EZ Webs
              </a>
            </p>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappLink={whatsappLink}
      />

      <LegalModal
        isOpen={activeLegalModal === 'privacy'}
        onClose={() => setActiveLegalModal(null)}
        title="מדיניות פרטיות"
        content={legalContent.privacy}
      />

      <LegalModal
        isOpen={activeLegalModal === 'accessibility'}
        onClose={() => setActiveLegalModal(null)}
        title="הצהרת נגישות"
        content={legalContent.accessibility}
      />

      <LegalModal
        isOpen={activeLegalModal === 'terms'}
        onClose={() => setActiveLegalModal(null)}
        title="תנאי שימוש"
        content={legalContent.terms}
      />
    </footer>
  );
}