"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { href: "/", label: "Intro", key: "intro" },
    { href: "/film", label: "Regarde le", key: "film" },
    { href: "/about", label: "C'est à propos de...", key: "about" },
    { href: "/bonus", label: "Bonus", key: "bonus" },
    { href: "/docu", label: "Documentaire", key: "docu" },
    { href: "/download", label: "Télécharge le", key: "download" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-amber-500/30">
      <div className="container mx-auto px-4 py-4">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="text-2xl font-poster-subtitle font-bold text-amber-400 hover:text-amber-300 transition-colors">
            La Classe Américaine
          </Link>
          
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="relative text-white hover:text-amber-400 transition-colors duration-300 text-sm uppercase tracking-wider font-condensed"
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
                {hoveredItem === item.key && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400"
                    layoutId="navbar-underline"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navigation;