"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CreditsRoll = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

  const credits = [
    { role: "Réalisé par", name: "Michel Hazanavicius" },
    { role: "Scénario", name: "Michel Hazanavicius & Dominique Mézerette" },
    { role: "", name: "" },
    { role: "Avec les voix de", name: "" },
    { role: "George Abitbol", name: "Marc Cassot" },
    { role: "José", name: "Patrick Guillemin" },
    { role: "Peter", name: "Raymond Loyer" },
    { role: "Steven", name: "Joël Martineau" },
    { role: "Dave", name: "Éric Legrand" },
    { role: "Hugues", name: "Francis Lax" },
    { role: "", name: "" },
    { role: "Production", name: "ARTE France" },
    { role: "Montage", name: "Michel Hazanavicius" },
    { role: "Son", name: "Laurent Poirier" },
    { role: "", name: "" },
    { role: "Remerciements Spéciaux", name: "" },
    { role: "", name: "Warner Bros." },
    { role: "", name: "Les doubleurs français" },
    { role: "", name: "Tous les fans du film" },
    { role: "", name: "" },
    { role: "", name: "« Monde de merde »" },
  ];

  return (
    <section ref={ref} className="relative h-screen bg-black overflow-hidden">
      {/* Film grain background */}
      <div className="absolute inset-0 vintage-film opacity-30" />
      
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Credits Container */}
      <div className="relative h-full flex items-center justify-center perspective-1000">
        <motion.div
          style={{ y }}
          className="text-center space-y-8 max-w-4xl mx-auto px-6"
        >
          {/* Film Title */}
          <div className="mb-20">
            <h2 className="text-6xl md:text-8xl font-headline text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 mb-4">
              LA CLASSE AMÉRICAINE
            </h2>
            <p className="text-2xl text-amber-300 font-quote italic">
              Le Grand Détournement
            </p>
          </div>

          {/* Credits List */}
          {credits.map((credit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {credit.role && (
                <p className="text-amber-400 text-xl md:text-2xl font-newspaper uppercase tracking-wider">
                  {credit.role}
                </p>
              )}
              {credit.name && (
                <p className="text-white text-2xl md:text-4xl font-headline">
                  {credit.name}
                </p>
              )}
              {!credit.role && !credit.name && (
                <div className="h-12" />
              )}
            </motion.div>
          ))}

          {/* End Message */}
          <div className="mt-32 mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <p className="text-5xl md:text-7xl font-headline text-amber-400 hollywood-glow">
                FIN
              </p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 mt-8 font-article"
            >
              Un Film de Michel Hazanavicius • 1993
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default CreditsRoll;