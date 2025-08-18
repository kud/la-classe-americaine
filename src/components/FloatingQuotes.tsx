"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

interface FloatingQuote {
  id: number;
  text: string;
  character: string;
  x: number;
  y: number;
  duration: number;
}

const quotes = [
  { text: "Monde de merde !", character: "George Abitbol" },
  { text: "L'homme le plus classe du monde.", character: "Narrateur" },
  { text: "Stun, stun, stun !", character: "Le Shérif" },
  { text: "Tu veux ma photo ?", character: "George Abitbol" },
  { text: "Il était de droite, il aimait l'ordre et la discipline.", character: "Narrateur" },
  { text: "Nous étions des dieux !", character: "George Abitbol" },
  { text: "J'aurais dû être écrivain.", character: "George Abitbol" },
  { text: "Comment qu'on dit déjà ?", character: "Burt Lancaster" },
  { text: "C'est moi le plus classe !", character: "George Abitbol" },
  { text: "Vengeance !", character: "Peter" },
];

const FloatingQuotes = () => {
  const [activeQuotes, setActiveQuotes] = useState<FloatingQuote[]>([]);

  useEffect(() => {
    const spawnQuote = () => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const newQuote: FloatingQuote = {
        id: Date.now() + Math.random(),
        ...randomQuote,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 100),
        duration: 3000 + Math.random() * 2000,
      };

      setActiveQuotes(prev => [...prev, newQuote]);

      setTimeout(() => {
        setActiveQuotes(prev => prev.filter(q => q.id !== newQuote.id));
      }, newQuote.duration);
    };

    const interval = setInterval(spawnQuote, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {activeQuotes.map((quote) => (
          <motion.div
            key={quote.id}
            initial={{ 
              opacity: 0, 
              scale: 0, 
              x: quote.x, 
              y: quote.y,
              rotate: -10 
            }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              scale: [0, 1.1, 1, 0.8],
              rotate: [10, -5, 5, -10],
              y: quote.y - 50,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0,
              rotate: 45 
            }}
            transition={{ 
              duration: quote.duration / 1000,
              ease: "easeInOut",
              times: [0, 0.1, 0.8, 1]
            }}
            className="absolute"
            style={{ left: quote.x, top: quote.y }}
          >
            <div className="bg-black/90 border-2 border-amber-400 rounded-lg p-3 max-w-xs shadow-2xl backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium leading-tight">
                    "{quote.text}"
                  </p>
                  <p className="text-amber-400 text-xs mt-1 font-semibold">
                    — {quote.character}
                  </p>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-amber-400"></div>
              <div className="absolute -bottom-1 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingQuotes;