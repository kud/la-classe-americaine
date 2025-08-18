"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Film, Users, Trophy, Star, TrendingUp } from "lucide-react";
import { useRef } from "react";

const FilmTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const events = [
    {
      year: "1992",
      title: "La Genèse",
      description: "Michel Hazanavicius conçoit l'idée d'un film utilisant des extraits de classiques hollywoodiens",
      icon: Film,
      color: "from-blue-500 to-indigo-600"
    },
    {
      year: "1993",
      title: "La Création",
      description: "Tournage et montage avec les vrais doubleurs français des stars américaines",
      icon: Users,
      color: "from-purple-500 to-pink-600"
    },
    {
      year: "31 Décembre 1993",
      title: "La Révélation",
      description: "Diffusion sur Canal+ pour le réveillon, naissance d'un phénomène culte",
      icon: Star,
      color: "from-amber-500 to-orange-600"
    },
    {
      year: "1994-2000",
      title: "Le Culte Underground",
      description: "Le film circule en VHS pirates, devient culte dans les milieux étudiants",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600"
    },
    {
      year: "2000-2010",
      title: "L'Ère Internet",
      description: "Explosion de popularité sur Internet, citations devenues mèmes",
      icon: Trophy,
      color: "from-red-500 to-rose-600"
    },
    {
      year: "Aujourd'hui",
      title: "La Légende",
      description: "Monument du cinéma français, étudié dans les écoles de cinéma",
      icon: Calendar,
      color: "from-yellow-500 to-amber-600"
    }
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/film-strip.png')] opacity-5" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-6">
            L'HISTOIRE D'UN CHEF-D'ŒUVRE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            De sa création audacieuse à son statut de légende, retracez l'épopée de La Classe Américaine
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-500/20 via-amber-500/40 to-amber-500/20">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-400 to-amber-600"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-20 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                >
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${event.color} mb-4`}>
                    <span className="text-white font-bold text-sm">{event.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-3">{event.title}</h3>
                  <p className="text-gray-300">{event.description}</p>
                </motion.div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} shadow-2xl flex items-center justify-center border-4 border-black`}
                >
                  <event.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl">
              <Star className="w-10 h-10 text-black" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FilmTimeline;