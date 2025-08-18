"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Intro", key: "intro" },
    { href: "/film", label: "Regardez-le", key: "film" },
    { href: "/about", label: "C'est à propos de...", key: "about" },
    { href: "/bonus", label: "Bonus", key: "bonus" },
    { href: "/docu", label: "Documentaire", key: "docu" },
    { href: "/download", label: "Téléchargez-le", key: "download" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/98 backdrop-blur-lg border-b border-amber-500/40 shadow-2xl' 
          : 'bg-black/90 backdrop-blur-sm border-b border-amber-500/20'
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-6 py-5">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-headline text-amber-400 hover:text-amber-300 transition-all duration-300 hover:scale-105"
            aria-label="Retour à l'accueil"
          >
            <span className="text-shadow-glow">La Classe Américaine</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-white hover:text-amber-400 transition-all duration-300 text-sm font-newspaper tracking-wide font-medium group"
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={`Naviguer vers ${item.label}`}
              >
                <span className="group-hover:text-shadow-glow transition-all duration-300">
                  {item.label}
                </span>
                {hoveredItem === item.key && (
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"
                    layoutId="navbar-underline"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-amber-400 transition-colors p-2 focus-visible-ring rounded-lg"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </motion.div>
        
        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-6 py-4 space-y-3 border-t border-amber-500/20">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-white hover:text-amber-400 transition-colors duration-300 text-lg font-newspaper py-2 focus-visible-ring rounded-lg px-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;