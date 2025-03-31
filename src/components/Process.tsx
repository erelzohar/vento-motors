import React from 'react';
import { motion } from 'framer-motion';
import { HiDocumentText, HiClock, HiCash } from 'react-icons/hi';

export function Process() {
  const steps = [
    {
      icon: <HiDocumentText className="h-12 w-12 text-sunset" />,
      number: "1",
      title: "הזן את פרטי הרכב",
      description: "מלא טופס פשוט עם מידע על הרכב שלך"
    },
    {
      icon: <HiClock className="h-12 w-12 text-sunset" />,
      number: "2",
      title: "קבל הצעה מיידית",
      description: "קבל הצעה משתלמת תוך דקות"
    },
    {
      icon: <HiCash className="h-12 w-12 text-sunset" />,
      number: "3",
      title: "קבל תשלום היום",
      description: "קבל תשלום מיידי במקום"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const numberVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  return (
    <section id="process" className="py-24 bg-gradient-to-b from-white to-gray-50 high-contrast-content">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">איך מתחילים ?</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">שלושה צעדים פשוטים</p>
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 relative"
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group process-card"
              variants={cardVariants}
            >
              <motion.div 
                className="process-number"
                variants={numberVariants}
              >
                {step.number}
              </motion.div>
              
              <motion.div 
                className="process-icon"
                variants={iconVariants}
              >
                {step.icon}
              </motion.div>
              
              <motion.h3 
                className="process-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="process-description"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {step.description}
              </motion.p>
              
              {index < 2 && (
                <motion.div 
                  className="process-connector"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}