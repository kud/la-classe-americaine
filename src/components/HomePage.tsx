"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Star, Film, Trophy, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedBackground from "./AnimatedBackground";
import FloatingQuotes from "./FloatingQuotes";
import TypewriterText from "./TypewriterText";
import GlitchText from "./GlitchText";
import CharacterShowcase from "./CharacterShowcase";
import QuotesCarousel from "./QuotesCarousel";
import MovieReelLoader from "./MovieReelLoader";
import NewspaperSection from "./NewspaperSection";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [showTypewriter, setShowTypewriter] = useState(false);

  const filmStats = [
    { icon: Clock, label: "Durée", value: "72 min", color: "text-blue-400" },
    { icon: Film, label: "Année", value: "1993", color: "text-green-400" },
    { icon: Trophy, label: "Statut", value: "Film Culte", color: "text-amber-400" },
    { icon: Star, label: "Note", value: "5/5", color: "text-purple-400" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowTypewriter(true), 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative">
      <MovieReelLoader isVisible={isLoading} message="Chargement du chef-d'œuvre..." />
      <AnimatedBackground />
      <FloatingQuotes />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Stars Animation */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="text-center z-10 px-4 max-w-6xl mx-auto"
          style={{ y: y1, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mb-8"
          >
            <GlitchText 
              text="LA CLASSE" 
              className="text-6xl md:text-9xl font-headline font-bold text-amber-400 block mb-2 text-shadow-glow"
              trigger="auto"
              intensity="high"
            />
            <GlitchText 
              text="AMÉRICAINE" 
              className="text-4xl md:text-7xl font-newspaper font-bold text-white block"
              trigger="auto"
              intensity="medium"
            />
          </motion.div>
          
          <motion.div 
            className="text-xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {showTypewriter && (
              <>
                <TypewriterText 
                  text="L'homme le plus classe du monde nous a quittés..."
                  delay={0}
                  speed={80}
                  className="block font-article"
                />
                <TypewriterText 
                  text='Ses derniers mots : "Monde de merde"'
                  delay={2000}
                  speed={60}
                  className="block text-red-400 font-bold font-byline"
                />
              </>
            )}
          </motion.div>

          {/* Film Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
          >
            {filmStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 + index * 0.2 }}
                className="text-center"
              >
                <Card className="bg-black/60 border-amber-500/30 p-4 hover:border-amber-500/60 transition-all duration-300">
                  <CardContent className="p-0 space-y-2">
                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto`} />
                    <p className="text-white font-bold">{stat.value}</p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="space-x-4"
          >
            <Link href="/film">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-12 py-6 text-xl rounded-none transform hover:scale-110 transition-all duration-300 shadow-2xl mr-4"
              >
                <Play className="mr-3 h-6 w-6" />
                REGARDER LE FILM
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline"
                size="lg" 
                className="border-amber-500 text-amber-400 hover:bg-amber-500/20 font-bold px-8 py-6 text-lg"
              >
                <Film className="mr-2 h-5 w-5" />
                EN SAVOIR PLUS
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced decorative elements */}
        <motion.div 
          className="absolute bottom-10 left-10"
          style={{ y: y2 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Image 
            src="/deco_1.jpg" 
            alt="Decoration" 
            width={120} 
            height={120} 
            className="opacity-40 rounded-lg shadow-xl" 
          />
        </motion.div>
        <motion.div 
          className="absolute top-20 right-10"
          style={{ y: y1 }}
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Image 
            src="/deco_2.jpg" 
            alt="Decoration" 
            width={100} 
            height={100} 
            className="opacity-40 rounded-lg shadow-xl" 
          />
        </motion.div>
      </section>

      {/* Quotes Carousel */}
      <QuotesCarousel />

      {/* Newspaper Investigation Section */}
      <NewspaperSection />

      {/* Character Showcase */}
      <CharacterShowcase />

      {/* Trailer Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <GlitchText 
              text="BANDE ANNONCE OFFICIELLE" 
              className="text-3xl md:text-5xl font-title font-bold text-amber-400 mb-8"
              trigger="hover"
              intensity="medium"
            />
            <p className="text-xl text-gray-300 mb-8">
              Découvrez les premiers instants du chef-d'œuvre
            </p>
            
            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 max-w-4xl mx-auto">
              <iframe 
                className="w-full h-full"
                src="http://www.dailymotion.com/embed/video/x413se?logo=0&autoPlay=0"
                frameBorder="0" 
                allowFullScreen
              />
              
              {/* Film grain overlay */}
              <div className="absolute inset-0 vintage-grain opacity-20 pointer-events-none" />
              <div className="absolute inset-0 film-scanlines opacity-30 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Review Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-500/50 p-8 relative overflow-hidden">
              <CardContent className="relative z-10">
                <Badge className="bg-amber-600 text-black font-bold mb-6 text-lg px-4 py-2">
                  CRITIQUE OFFICIELLE
                </Badge>
                
                <blockquote className="text-2xl md:text-4xl italic text-amber-100 mb-8 leading-relaxed">
                  "Un flim pour les amateurs de ouiche lorraine et autres animaux préhistoriques partouzeurs de droite."
                </blockquote>
                
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <Star className="w-10 h-10 fill-amber-400 text-amber-400 mx-1" />
                    </motion.div>
                  ))}
                </div>
                
                <p className="text-gray-300 text-xl font-semibold">— The Magazine</p>
              </CardContent>
              
              {/* Background elements */}
              <div className="absolute inset-0 vintage-grain opacity-20" />
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-amber-400/10 rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-32 h-32 bg-yellow-400/10 rounded-full"
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-5xl font-press font-bold text-amber-400 mb-6">
              DOSSIER SPÉCIAL
            </h3>
            <p className="text-xl text-gray-300">
              Des anecdotes fascinantes sur ce monument du cinéma français
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "4000 Films",
                description: "Warner Bros. avait donné accès à 4000 films de leur catalogue",
                icon: "🎬"
              },
              {
                title: "2 Diffusions",
                description: "Le film n'a été diffusé que deux fois à la télévision en 25 ans",
                icon: "📺"
              },
              {
                title: "Doubleurs Originaux",
                description: "Les vraies voix françaises des acteurs hollywoodiens",
                icon: "🎤"
              },
              {
                title: "Michel Hazanavicius",
                description: "Avant 'The Artist' et ses 5 Oscars",
                icon: "🏆"
              },
              {
                title: "Film Culte",
                description: "Un phénomène générationnel et internet",
                icon: "🌟"
              },
              {
                title: "Citizen Kane",
                description: "Un hommage assumé au chef-d'œuvre d'Orson Welles",
                icon: "🎭"
              }
            ].map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{fact.icon}</div>
                    <CardTitle className="text-xl text-amber-400">{fact.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 leading-relaxed">{fact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;