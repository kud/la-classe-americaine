"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Award, Star, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

const CinematicHero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const titleY = useTransform(scrollY, [0, 500], [0, -150]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const curtainY = useTransform(scrollY, [0, 600], [0, -100]);

  // Cinematic reveal animation
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    const showCurtainTimer = setTimeout(() => setIsRevealed(true), 500);
    const enableScrollTimer = setTimeout(() => {
      // Enable scroll after curtain animation is COMPLETELY finished
      document.body.classList.add('scroll-enabled');
      document.documentElement.classList.add('scroll-enabled');
    }, 3000); // 3 seconds to ensure curtain is fully gone
    
    return () => {
      clearTimeout(showCurtainTimer);
      clearTimeout(enableScrollTimer);
      // Clean up scroll classes on unmount
      document.body.classList.remove('scroll-enabled');
      document.documentElement.classList.remove('scroll-enabled');
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black w-full max-w-full">
      {/* Theatrical Curtains */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isRevealed ? "-100%" : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 z-50 pointer-events-none"
      >
        {/* Main curtain with enhanced shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900 via-red-800 to-red-900" />
        
        {/* Subtle shadow overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />
        
        {/* Light side shadows */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent" />
        
        {/* Bottom shadow (lighter) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        {/* Curtain texture with lighter blend */}
        <div className="absolute inset-0 bg-[url('/curtain-texture.png')] opacity-25" />
        
        {/* Subtle fabric fold shadows */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 20px, transparent 40px, rgba(0,0,0,0.1) 60px)'
        }} />
      </motion.div>

      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: curtainY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 z-10" />
        <video
          loop
          muted={isMuted}
          playsInline
          controls
          className="w-full h-full object-cover"
          poster="/george_big.jpg"
        >
          <source src="/trailer.mp4" type="video/mp4" />
        </video>
        
        {/* Film Grain Overlay - constrained to hero only */}
        <div className="absolute inset-0 z-20 mix-blend-overlay opacity-15 vintage-grain" />
        
        {/* Vintage Vignette - lighter and constrained */}
        <div className="absolute inset-0 z-20 bg-radial-gradient from-transparent via-transparent to-black/60" />
      </motion.div>

      {/* Sound Control */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-32 right-4 md:right-8 z-40 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition-all focus-visible-ring"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <VolumeX className="w-6 h-6 text-amber-400" /> : <Volume2 className="w-6 h-6 text-amber-400" />}
      </motion.button>

      {/* Main Content */}
      <div className="relative z-30 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-4xl px-6">
        <motion.div 
          className="text-center"
          style={{ y: titleY, scale: titleScale, opacity }}
        >
          {/* Awards Badges */}
          <motion.div 
            className="flex justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            {[
              { icon: Award, text: "PALME D'OR", year: "1993" },
              { icon: Star, text: "5 ÉTOILES", year: "Le Monde" },
              { icon: Award, text: "CÉSAR", year: "Meilleur Film" }
            ].map((award, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 2.7 + i * 0.2, type: "spring" }}
              >
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-3 rounded-full mb-2">
                  <award.icon className="w-8 h-8 text-black" />
                </div>
                <p className="text-amber-400 font-bold text-sm">{award.text}</p>
                <p className="text-amber-300/60 text-xs">{award.year}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Film Title */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5, type: "spring" }}
          >
            <h1 className="relative inline-block">
              {/* Glowing backdrop */}
              <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 opacity-50" />
              
              {/* Main title */}
              <span className="relative block text-7xl md:text-9xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 drop-shadow-2xl">
                LA CLASSE
              </span>
              <span className="relative block text-5xl md:text-7xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 -mt-4">
                AMÉRICAINE
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-8 mb-12"
          >
            <p className="text-2xl md:text-3xl text-amber-100 font-quote italic mb-2">
              "L'homme le plus classe du monde"
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-400/80">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <p className="text-lg text-gray-400 mt-4 font-article">
              Un film de Michel Hazanavicius • 1993 • 72 minutes
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/film">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-xl rounded-full overflow-hidden shadow-2xl"
              >
                {/* Animated background */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative flex items-center gap-3">
                  <Play className="w-6 h-6" />
                  REGARDEZ-LE
                </span>
                
                {/* Shine effect */}
                <span className="absolute inset-0 -top-10 -left-10 w-20 h-40 bg-white/20 rotate-45 group-hover:translate-x-[250%] transition-transform duration-700" />
              </motion.button>
            </Link>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border-2 border-amber-400 text-amber-400 bg-black/60 font-bold text-lg rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 backdrop-blur-sm focus-visible-ring"
              >
                DÉCOUVRIR L'HISTOIRE
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-400/60"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Film Strip Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-40" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-black z-40 overflow-hidden">
        <div className="flex animate-scroll-x w-[200%]">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-24 h-16 border-x-2 border-amber-500/20 bg-black flex items-center justify-center">
              <div className="w-20 h-12 bg-amber-900/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;