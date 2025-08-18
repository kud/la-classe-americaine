"use client";

import { motion } from "framer-motion";
import { Film, Zap } from "lucide-react";

interface MovieReelLoaderProps {
  isVisible: boolean;
  message?: string;
}

const MovieReelLoader = ({ isVisible, message = "Chargement du film..." }: MovieReelLoaderProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Film reel animation */}
        <div className="relative mb-8">
          {/* Main reel */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 mx-auto border-4 border-amber-400 rounded-full relative"
          >
            {/* Reel spokes */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-12 bg-amber-400 top-2 left-1/2 origin-bottom transform -translate-x-1/2"
                style={{ transform: `translateX(-50%) rotate(${i * 45}deg)` }}
              />
            ))}
            
            {/* Center hub */}
            <div className="absolute inset-6 bg-gray-800 rounded-full border-2 border-amber-400 flex items-center justify-center">
              <Film className="w-6 h-6 text-amber-400" />
            </div>
          </motion.div>

          {/* Film strip */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 100 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-0 right-0 h-4 bg-amber-400/20 border-t-2 border-b-2 border-amber-400"
          >
            {/* Film perforations */}
            <div className="flex justify-between items-center h-full px-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-1 h-2 bg-amber-400 rounded-sm" />
              ))}
            </div>
          </motion.div>

          {/* Sparks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: 0,
                y: 0 
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1.2
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold text-amber-400">{message}</h3>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-amber-400 rounded-full"
              />
            ))}
          </div>

          {/* Vintage cinema quotes */}
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-300 italic max-w-md mx-auto"
          >
            "Préparez-vous à découvrir l'homme le plus classe du monde..."
          </motion.p>
        </motion.div>

        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-30 vintage-grain pointer-events-none" />
        
        {/* Scanlines */}
        <div className="absolute inset-0 film-scanlines pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default MovieReelLoader;