import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import QRCode from 'qrcode.react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappLink: string;
}

export function WhatsAppModal({ isOpen, onClose, whatsappLink }: WhatsAppModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">סרוק ועבור לוואטסאפ</h3>
              <div className="flex justify-center mb-4">
                <QRCode
                  value={whatsappLink}
                  size={200}
                  level="H"
                  includeMargin
                  className="rounded-lg"
                />
              </div>
              <p className="text-gray-600">
                סרוק את הקוד באמצעות המצלמה בטלפון שלך כדי לפתוח את השיחה בוואטסאפ
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}