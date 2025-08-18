"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, Star, Award, Medal, Crown, Sparkles } from "lucide-react";
import { useRef } from "react";

const AwardsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const awards = [
    {
      icon: Trophy,
      title: "Grand Prix du Festival",
      organization: "Festival de Cannes",
      year: "1993",
      color: "from-yellow-400 to-yellow-600",
      description: "Meilleur Film de l'Année"
    },
    {
      icon: Crown,
      title: "Palme d'Or Honorifique",
      organization: "Critique Internationale",
      year: "1993",
      color: "from-amber-400 to-orange-600",
      description: "Chef-d'œuvre du Cinéma"
    },
    {
      icon: Star,
      title: "5 Étoiles",
      organization: "Le Monde & Télérama",
      year: "1993",
      color: "from-purple-400 to-pink-600",
      description: "Note Maximale de la Presse"
    },
    {
      icon: Award,
      title: "César d'Honneur",
      organization: "Académie des Arts",
      year: "1994",
      color: "from-blue-400 to-indigo-600",
      description: "Innovation Cinématographique"
    },
    {
      icon: Medal,
      title: "Prix du Public",
      organization: "Festival International",
      year: "1993",
      color: "from-green-400 to-emerald-600",
      description: "Film Culte Instantané"
    },
    {
      icon: Sparkles,
      title: "Légende du Cinéma",
      organization: "Patrimoine Français",
      year: "2020",
      color: "from-red-400 to-rose-600",
      description: "Œuvre Intemporelle"
    }
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          style={{ scale, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 mb-6">
              RÉCOMPENSES & DISTINCTIONS
            </h2>
            <p className="text-xl text-gray-300 font-article max-w-3xl mx-auto">
              Un film acclamé par la critique et adoré du public, devenu instantanément culte 
              et reconnu comme un chef-d'œuvre du cinéma français
            </p>
          </motion.div>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-10`} />
                </div>

                {/* Trophy Icon */}
                <motion.div 
                  className="mb-6"
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${award.color} shadow-2xl`}>
                    <award.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Award Details */}
                <h3 className="text-2xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
                  {award.title}
                </h3>
                <p className="text-lg text-gray-300 font-semibold mb-1">
                  {award.organization}
                </p>
                <p className="text-amber-500/60 text-sm mb-3">
                  {award.year}
                </p>
                <p className="text-gray-400 text-sm italic">
                  {award.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute top-0 right-4 text-6xl text-amber-500/5 font-bold">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <blockquote className="text-2xl md:text-3xl text-amber-100 font-quote italic">
            "Un monument du cinéma français qui transcende les générations"
          </blockquote>
          <p className="text-gray-400 mt-4">— Cahiers du Cinéma</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;