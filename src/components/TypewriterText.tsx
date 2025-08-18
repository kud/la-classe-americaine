"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = "", 
  showCursor = true,
  onComplete 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          onComplete?.();
          
          // Hide cursor after completion
          setTimeout(() => {
            setShowBlinkingCursor(false);
          }, 1000);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && showBlinkingCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="text-amber-400 font-bold ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;