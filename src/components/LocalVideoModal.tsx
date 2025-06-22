import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';

interface LocalVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string; // נתיב לוידאו המקומי (למשל /videos/intro.mp4)
}

export function LocalVideoModal({ isOpen, onClose, videoSrc }: LocalVideoModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-black rounded-2xl p-0 max-w-full w-auto h-auto relative overflow-hidden"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
                        >
                            <HiX className="w-6 h-6" />
                        </button>

                        <video
                            src={videoSrc}
                            autoPlay
                            muted
                            playsInline
                            loop
                            controls
                            className="max-h-[90vh] max-w-full rounded-xl object-contain"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
