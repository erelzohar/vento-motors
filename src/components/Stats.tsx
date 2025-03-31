import React from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  return (
    <section className="relative bg-sunset py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-sunset/20 via-transparent to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative text-center"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm -rotate-3 transform-gpu"></div>
            <div className="relative p-6">
              <div className="text-5xl font-bold text-white mb-3">+5000</div>
              <div className="text-lg text-white/90">רכבים נרכשו</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative text-center"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm rotate-3 transform-gpu"></div>
            <div className="relative p-6">
              <div className="text-5xl font-bold text-white mb-3">100%</div>
              <div className="text-lg text-white/90">שביעות רצון </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative text-center"
          >
            <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm -rotate-2 transform-gpu"></div>
            <div className="relative p-6">
              <div className="text-5xl font-bold text-white mb-3">+15</div>
              <div className="text-lg text-white/90">שנות ניסיון</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[100px] bg-white/10 blur-[100px]"></div>
    </section>
  );
}