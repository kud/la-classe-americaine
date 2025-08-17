"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GlitchText from "./GlitchText";

interface FilmQuote {
  id: number;
  text: string;
  character: string;
  context: string;
  mood: "epic" | "funny" | "dramatic" | "mysterious";
  color: string;
}

const quotes: FilmQuote[] = [
  {
    id: 1,
    text: "Monde de merde !",
    character: "George Abitbol",
    context: "Ses derniers mots légendaires",
    mood: "epic",
    color: "from-red-600 to-orange-500"
  },
  {
    id: 2,
    text: "L'homme le plus classe du monde.",
    character: "Le Narrateur",
    context: "La présentation de George Abitbol",
    mood: "dramatic",
    color: "from-amber-600 to-yellow-500"
  },
  {
    id: 3,
    text: "Tu veux ma photo ?",
    character: "George Abitbol",
    context: "Quand on le regarde trop longtemps",
    mood: "funny",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: 4,
    text: "Stun, stun, stun !",
    character: "Le Shérif",
    context: "Dans l'action, toujours",
    mood: "funny",
    color: "from-green-600 to-emerald-500"
  },
  {
    id: 5,
    text: "Nous étions des dieux !",
    character: "George Abitbol",
    context: "Nostalgique du passé",
    mood: "dramatic",
    color: "from-purple-600 to-pink-500"
  },
  {
    id: 6,
    text: "Il était de droite, il aimait l'ordre et la discipline.",
    character: "Le Narrateur",
    context: "Portrait politique de George",
    mood: "mysterious",
    color: "from-gray-600 to-slate-500"
  },
  {
    id: 7,
    text: "J'aurais dû être écrivain.",
    character: "George Abitbol",
    context: "Regrets d'une vie",
    mood: "dramatic",
    color: "from-indigo-600 to-blue-500"
  },
  {
    id: 8,
    text: "Vengeance !",
    character: "Peter",
    context: "Cri de guerre du journaliste",
    mood: "epic",
    color: "from-red-600 to-pink-500"
  }
];

const QuotesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const currentQuote = quotes[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "epic": return "⚡";
      case "funny": return "😂";
      case "dramatic": return "🎭";
      case "mysterious": return "🕵️";
      default: return "🎬";
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <GlitchText 
            text="RÉPLIQUES CULTES" 
            className="text-4xl md:text-6xl font-title font-bold text-amber-400 mb-4"
            trigger="auto"
            intensity="medium"
          />
          <p className="text-xl text-gray-300">
            Les phrases qui ont marqué l'histoire du cinéma français
          </p>
        </motion.div>

        <div className="relative">
          {/* Main carousel */}
          <div className="relative h-96 overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  x: direction > 0 ? 1000 : -1000,
                  opacity: 0,
                  rotateY: direction > 0 ? 45 : -45
                }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  rotateY: 0
                }}
                exit={{ 
                  x: direction > 0 ? -1000 : 1000,
                  opacity: 0,
                  rotateY: direction > 0 ? -45 : 45
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="absolute inset-0"
              >
                <Card className={`h-full bg-gradient-to-br ${currentQuote.color} relative overflow-hidden border-2 border-amber-500/30`}>
                  <CardContent className="flex flex-col justify-center items-center h-full p-8 text-center relative z-10">
                    {/* Mood indicator */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl mb-4"
                    >
                      {getMoodEmoji(currentQuote.mood)}
                    </motion.div>

                    {/* Quote */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6"
                    >
                      <Quote className="w-8 h-8 text-white/80 mx-auto mb-4" />
                      <blockquote className="text-3xl md:text-5xl font-quote font-bold text-white leading-tight mb-4">
                        "{currentQuote.text}"
                      </blockquote>
                    </motion.div>

                    {/* Character and context */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <p className="text-xl font-semibold text-white/90">
                        — {currentQuote.character}
                      </p>
                      <p className="text-white/70 italic">
                        {currentQuote.context}
                      </p>
                    </motion.div>

                    {/* Sound effect button */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-6"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/50 text-white hover:bg-white/20"
                        onClick={() => {
                          // Here you could play an audio file
                          console.log("Playing sound for:", currentQuote.text);
                        }}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Écouter
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="vintage-grain h-full" />
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-amber-500/50 text-amber-400 hover:bg-amber-500/20 z-20"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-amber-500/50 text-amber-400 hover:bg-amber-500/20 z-20"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {quotes.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-amber-400 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-amber-400"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            >
              {isAutoPlaying ? "⏸️ Pause" : "▶️ Auto"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesCarousel;