import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiShieldCheck, HiCash, HiTruck, HiUserGroup, HiClock, HiDocumentText } from 'react-icons/hi';
import { WhatsAppModal } from './WhatsAppModal';

export function Features() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const whatsappNumber = '972529100123';
  const whatsappText = 'היי, אני מעוניין למכור את הרכב שלי';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    if (!isMobile) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const features = [
    {
      icon: <HiShieldCheck className="h-8 w-8" />,
      title: "אמינות מוכחת",
      description: "15 שנות ניסיון בשוק הרכב עם אלפי לקוחות מרוצים",
      gradient: "from-blue-500/10 to-blue-600/5"
    },
    {
      icon: <HiCash className="h-8 w-8" />,
      title: "תשלום מיידי",
      description: "קבל את הכסף לחשבון הבנק שלך ביום המכירה",
      gradient: "from-green-500/10 to-green-600/5"
    },
    {
      icon: <HiTruck className="h-8 w-8" />,
      title: "שירות מקיף",
      description: "איסוף הרכב מהבית וטיפול בכל הניירת עבורך",
      gradient: "from-purple-500/10 to-purple-600/5"
    },
    {
      icon: <HiUserGroup className="h-8 w-8" />,
      title: "ליווי אישי",
      description: "מומחה אישי שילווה אותך לאורך כל התהליך",
      gradient: "from-yellow-500/10 to-yellow-600/5"
    },
    {
      icon: <HiClock className="h-8 w-8" />,
      title: "הצעה תוך דקות",
      description: "קבל הצעת מחיר מיידית ללא המתנה מיותרת",
      gradient: "from-red-500/10 to-red-600/5"
    },
    {
      icon: <HiDocumentText className="h-8 w-8" />,
      title: "שקיפות מלאה",
      description: "תהליך ברור ושקוף ללא עמלות נסתרות",
      gradient: "from-pink-500/10 to-pink-600/5"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white high-contrast-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">קצת עלינו</h2>
          <div className="mt-4 h-1 w-24 bg-sunset mx-auto rounded-full"></div>
          <div className="mt-6 space-y-6 text-lg max-w-3xl mx-auto">
            <p className="leading-relaxed">
              ונטו היא לא סוכנות רכב – אנחנו שירות מהיר ויעיל למי שרוצה למכור את הרכב שלו מידית וללא מאמץ.
            </p>
            <p className="leading-relaxed">
              במקום לפרסם מודעות, להתמקח עם קונים ולהתמודד עם ביטולים וטרטורים – אנחנו מציעים פתרון פשוט ומהיר:
            </p>
            <ul dir="rtl" className="space-y-2 max-w-xl mx-auto flex flex-col items-center">
              <li className="flex items-center gap-2 w-fit">
                <div className="h-2 w-2 rounded-full bg-sunset"></div>
                <span>מכירה במקום – בלי לחכות לקונה</span>
              </li>
              <li className="flex items-center gap-2 w-fit">
                <div className="h-2 w-2 rounded-full bg-sunset"></div>
                <span>ללא פרסום, פגישות או בזבוז זמן</span>
              </li>
              <li className="flex items-center gap-2 w-fit">
                <div className="h-2 w-2 rounded-full bg-sunset"></div>
                <span>בלי סיכון לעוקצים או התחמקויות</span>
              </li>
              <li className="flex items-center gap-2 w-fit">
                <div className="h-2 w-2 rounded-full bg-sunset"></div>
                <span>תהליך ברור, קל והוגן</span>
              </li>
              <li className="flex items-center gap-2 w-fit">
                <div className="h-2 w-2 rounded-full bg-sunset"></div>
                <span>תשלום מידי בהעברת זהב</span>
              </li>
            </ul>
            <p className="leading-relaxed">
              אנחנו כאן כדי לחסוך לך את כל הכאב ראש ולהבטיח לך חוויית מכירה נוחה, בטוחה ומהירה.
            </p>
            <p className="text-xl font-semibold text-sunset">
              רוצה למכור את הרכב שלך עוד היום? ונטו זה הפתרון בשבילך.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group feature-card"
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappLink={whatsappLink}
      />
    </section>
  );
}