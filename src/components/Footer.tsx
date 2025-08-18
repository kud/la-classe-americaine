"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/95 backdrop-blur-sm border-t border-amber-500/30 py-16 relative z-50">
      <div className="container mx-auto max-w-5xl px-6">
        <motion.div 
          className="grid md:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-headline text-amber-400 text-shadow-glow">
                La Classe Américaine
              </h3>
            </Link>
            <p className="text-white font-article leading-relaxed">
              Un chef-d'œuvre méconnu du cinéma français. L'histoire de George Abitbol, 
              l'homme le plus classe du monde, qui nous a quittés en prononçant ces derniers mots : 
              <span className="text-amber-400 font-bold">"Monde de merde"</span>.
            </p>
            <div className="flex items-center space-x-2 text-sm text-white">
              <Film className="w-4 h-4" />
              <span>Réalisé par Michel Hazanavicius (1993)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-newspaper text-amber-400 uppercase tracking-wide">
              Navigation
            </h4>
            <nav className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/film", label: "Regardez-le" },
                { href: "/about", label: "À propos" },
                { href: "/bonus", label: "Bonus" },
                { href: "/docu", label: "Documentaire" },
                { href: "/download", label: "Téléchargez-le" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-amber-400 transition-colors duration-300 font-article"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Credits & Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-newspaper text-amber-400 uppercase tracking-wide">
              Crédits
            </h4>
            <div className="space-y-3 text-white font-article">
              <p>
                <strong className="text-amber-400">Réalisation :</strong> Michel Hazanavicius
              </p>
              <p>
                <strong className="text-amber-400">Scénario :</strong> Michel Hazanavicius, Dominique Mézerette
              </p>
              <p>
                <strong className="text-amber-400">Production :</strong> ARTE France
              </p>
              <p>
                <strong className="text-amber-400">Année :</strong> 1993
              </p>
              <p>
                <strong className="text-amber-400">Durée :</strong> 72 minutes
              </p>
            </div>
            
            <div className="pt-4 border-t border-amber-500/20">
              <p className="text-sm text-white flex items-center">
                Fait avec <Heart className="w-4 h-4 mx-1 text-red-500" /> pour le cinéma français
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-amber-500/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white text-sm font-article">
              © {currentYear} La Classe Américaine. Tous droits réservés.
              <br className="md:hidden" />
              <span className="md:ml-2">Une œuvre de Michel Hazanavicius.</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-white text-sm font-article">
                "L'homme le plus classe du monde nous a quittés..."
              </span>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;