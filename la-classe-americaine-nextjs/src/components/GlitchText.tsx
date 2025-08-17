"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  trigger?: "hover" | "auto" | "click";
}

const GlitchText = ({ 
  text, 
  className = "", 
  intensity = "medium",
  trigger = "hover" 
}: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(text);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
  const originalText = text;

  const createGlitchText = () => {
    return originalText.split('').map((char, index) => {
      if (Math.random() < 0.1) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    if (!isGlitching) return;

    const intervals: NodeJS.Timeout[] = [];
    
    // Create multiple glitch intervals for crazy effect
    for (let i = 0; i < (intensity === "high" ? 5 : intensity === "medium" ? 3 : 1); i++) {
      const interval = setInterval(() => {
        setGlitchText(createGlitchText());
        setTimeout(() => setGlitchText(originalText), 50 + Math.random() * 100);
      }, 100 + i * 50);
      
      intervals.push(interval);
    }

    const cleanup = setTimeout(() => {
      intervals.forEach(clearInterval);
      setGlitchText(originalText);
      if (trigger === "auto") {
        setIsGlitching(false);
      }
    }, intensity === "high" ? 1000 : intensity === "medium" ? 700 : 400);

    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(cleanup);
    };
  }, [isGlitching, intensity, trigger]);

  useEffect(() => {
    if (trigger === "auto") {
      const autoTrigger = setInterval(() => {
        setIsGlitching(true);
      }, 3000 + Math.random() * 5000);

      return () => clearInterval(autoTrigger);
    }
  }, [trigger]);

  const handleInteraction = () => {
    if (trigger === "hover" || trigger === "click") {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      setIsGlitching(false);
      setGlitchText(originalText);
    }
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={trigger === "hover" ? handleInteraction : undefined}
      onMouseLeave={trigger === "hover" ? handleMouseLeave : undefined}
      onClick={trigger === "click" ? handleInteraction : undefined}
      animate={isGlitching ? {
        textShadow: [
          "0 0 0 #ff0000",
          "2px 2px 0 #ff0000, -2px -2px 0 #00ffff",
          "-2px 2px 0 #ff0000, 2px -2px 0 #00ffff",
          "0 0 0 #ff0000"
        ],
        x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
      } : {}}
      transition={{
        duration: 0.1,
        repeat: isGlitching ? Infinity : 0,
        repeatType: "reverse"
      }}
    >
      {/* Main text */}
      <span className="relative z-10">
        {glitchText}
      </span>
      
      {/* Glitch overlays */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-red-500 opacity-80"
            animate={{
              x: [0, -2, 2, -1],
              y: [0, 1, -1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {createGlitchText()}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-cyan-400 opacity-60"
            animate={{
              x: [0, 2, -2, 1],
              y: [0, -1, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.05
            }}
          >
            {createGlitchText()}
          </motion.span>
        </>
      )}
    </motion.span>
  );
};

export default GlitchText;