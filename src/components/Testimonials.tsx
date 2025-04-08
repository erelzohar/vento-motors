import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import car1 from "../Assets/car1.webp";
import car2 from "../Assets/car2.png";
import car3 from "../Assets/car3.png";
import car4 from "../Assets/car4.png";
import car5 from "../Assets/car5.png";
import car6 from "../Assets/car6.png";
export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      image: car1,
      name: "דוד כהן",
      location: "תל אביב",
      quote: "תהליך מדהים. קיבלתי מחיר מעולה עבור הרכב והתשלום היה מיידי!",
      rating: 5
    },
    {
      image: car2,
      name: "שרה מנחם",
      location: "ירושלים",
      quote: "הצוות של ונטו מוטורס עשה את מכירת הרכב לחוויה נטולת לחץ. ממליצה בחום!",
      rating: 5
    },
    {
      image: car3,
      name: "משה ישראלי",
      location: "חיפה",
      quote: "חוויית מכירת רכב הטובה ביותר. צוות מקצועי ושירות מצוין.",
      rating: 5
    },
    {
      image: car4,
      name: "רונית אברהם",
      location: "רמת גן",
      quote: "מכרתי את הרכב תוך יום אחד! שירות מעולה ומחיר הוגן.",
      rating: 5
    },
    {
      image: car5,
      name: "יעקב לוי",
      location: "באר שבע",
      quote: "התהליך היה פשוט וקל. קיבלתי את התשלום באותו היום!",
      rating: 5
    },
    {
      image: car6,
      name: "מיכל דוד",
      location: "נתניה",
      quote: "שירות מקצועי ואדיב. ממליצה לכל מי שרוצה למכור רכב בקלות.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    // For mobile: return single item
    if (window.innerWidth < 768) {
      return [testimonials[currentIndex]];
    }
    
    // For desktop: return three items
    const startIndex = currentIndex % (testimonials.length - 2);
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="relative py-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">מה הלקוחות אומרים</h2>
          <div className="h-1 w-24 bg-sunset mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 transition-all duration-300 group-hover:bg-white/15">
                    {/* Review Screenshot */}
                    <div className="relative mb-6 rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={testimonial.image} 
                        alt="Review screenshot"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-sunset" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Content */}
                    <p className="text-white/90 mb-4 text-lg leading-relaxed">{testimonial.quote}</p>
                    
                    {/* Review Author */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-white/70 text-sm">{testimonial.location}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: testimonials.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-sunset w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}