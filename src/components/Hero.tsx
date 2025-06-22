import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok, FaPhone } from 'react-icons/fa';
import { WhatsAppModal } from './WhatsAppModal';
import { LocalVideoModal } from './LocalVideoModal';

function isShabbat() {
  const now = new Date();
  const day = now.getDay(); // 5 is Friday, 6 is Saturday
  const hours = now.getHours();

  if (day === 5 && hours >= 19) return true; // Friday after 19:00
  if (day === 6 && hours < 18) return true; // Saturday before 18:00
  return false;
}

export function Hero() {
  const [dotColor, setDotColor] = useState('bg-green-500');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const whatsappNumber = '972529100123';
  const whatsappText = 'שלום, אני מעוניין למכור את הרכב שלי';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
  const phoneNumber = '0529100123';

  useEffect(() => {
    const updateDotColor = () => {
      setDotColor(isShabbat() ? 'bg-red-500' : 'bg-green-500');
    };

    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    // Update initially
    updateDotColor();
    checkMobile();

    // Update every minute
    const interval = setInterval(updateDotColor, 60000);
    window.addEventListener('resize', checkMobile);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
    },
    {
      name: 'Phone',
      icon: <FaPhone className="h-5 w-5" />,
      href: `tel:${phoneNumber}`,
      color: 'bg-[#4CAF50] hover:bg-[#4CAF50]/90'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-night"></div>
      <div className="absolute inset-0 bg-mesh opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-sunset/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm">
              <span className={`inline-block w-2 h-2 ${dotColor} rounded-full animate-pulse`}></span>
              {isShabbat() && "לא "} מקבלים הצעות ברגע זה
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white"
          >
            ונטו מוטורס
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-sunset-light">
              קנייה מיידית וללא כאב ראש!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            קבל הצעת מחיר לרכב שלך תוך דקות
            <br />
            אנחנו מטפלים בכל הניירת ומשלמים במקום.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 text-2xl sm:text-3xl text-sunset font-semibold"
          >
            ונטו - ככה מוכרים היום רכב
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary text-lg px-8 py-4 min-w-[200px]"
            >
              קבל הצעה עכשיו
            </button>

            <div className="flex items-center gap-4 text-white/80">
              <div className="flex -space-x-2 rtl:space-x-reverse overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/20 bg-gradient-to-br from-gray-200 to-gray-400"
                  ></div>
                ))}
              </div>
              <span className="text-sm">
                הצטרפו ל-5000+ לקוחות מרוצים
              </span>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 text-center text-white/80"
          >
            {[
              { label: 'רכבים נרכשו', value: '5000+' },
              { label: 'שנות ניסיון', value: '15+' },
              { label: 'תשלום מיידי', value: '24/6' }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sunset/50 to-transparent"></div>

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        whatsappLink={whatsappLink}
      />
      <LocalVideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoSrc="https://d3b1lesihyajax.cloudfront.net/video.mp4"
      />
    </section>
  );
}