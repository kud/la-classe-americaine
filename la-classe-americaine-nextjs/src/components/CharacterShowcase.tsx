"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, User, Film, Star } from "lucide-react";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  actor: string;
  description: string;
  quotes: string[];
  traits: string[];
  image: string;
  color: string;
}

const characters: Character[] = [
  {
    id: "george",
    name: "George Abitbol",
    actor: "John Wayne",
    description: "L'homme le plus classe du monde. Un personnage légendaire qui a marqué l'histoire du cinéma français par ses répliques cultes.",
    quotes: [
      "Monde de merde !",
      "Tu veux ma photo ?",
      "C'est moi le plus classe !",
      "Nous étions des dieux !"
    ],
    traits: ["Classe", "Mystérieux", "Légendaire", "Iconique"],
    image: "/george_big.jpg",
    color: "from-amber-600 to-yellow-500"
  },
  {
    id: "peter",
    name: "Peter (Pétaire)",
    actor: "Dustin Hoffman", 
    description: "Reporter d'investigation spécialisé dans les affaires criminelles. Mène l'enquête sur la mort mystérieuse de George Abitbol avec acharnement.",
    quotes: [
      "Il faut enquêter à fond !",
      "Cette affaire pue le scandale",
      "Que cachait vraiment George ?",
      "La vérité finira par éclater !"
    ],
    traits: ["Reporter", "Investigation", "Ténace", "Méthodique"],
    image: "/deco_1.jpg",
    color: "from-blue-600 to-cyan-500"
  },
  {
    id: "steven",
    name: "Steven (Stévaine)",
    actor: "Robert Redford",
    description: "Correspondant de presse spécialisé dans les portraits. Son approche analytique complète parfaitement l'équipe d'investigation.",
    quotes: [
      "Les faits parlent d'eux-mêmes",
      "Il y a anguille sous roche",
      "Cette version ne tient pas",
      "Creusons plus profond !"
    ],
    traits: ["Correspondant", "Analyste", "Objectif", "Rigoureux"],
    image: "/deco_2.jpg",
    color: "from-green-600 to-emerald-500"
  },
  {
    id: "dave",
    name: "Dave",
    actor: "Paul Newman",
    description: "Journaliste d'investigation chevronné, spécialiste des reconstitutions. Son expérience du terrain apporte une dimension unique à l'enquête.",
    quotes: [
      "Mon instinct me dit que...",
      "Cette piste mérite qu'on s'y attarde",
      "Il faut recroiser les témoignages",
      "La vérité est plus complexe !"
    ],
    traits: ["Vétéran", "Terrain", "Instinct", "Expérience"],
    image: "/star.png",
    color: "from-purple-600 to-pink-500"
  }
];

const CharacterCard = ({ character, index }: { character: Character; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const cycleQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % character.quotes.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="perspective-1000"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 h-[400px] cursor-pointer">
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-10`} />
          
          {/* Character image */}
          <div className="relative h-48 overflow-hidden">
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <Film className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-amber-400 font-bold">Cliquez pour une quote !</p>
              </motion.div>
            </motion.div>
          </div>

          <CardContent className="p-4 space-y-3">
            {/* Character name */}
            <div className="text-center">
              <h3 className="text-xl font-journalist font-bold text-amber-400">{character.name}</h3>
              <p className="text-gray-400 text-sm font-news-body flex items-center justify-center gap-1">
                <User className="w-3 h-3" />
                {character.actor}
              </p>
            </div>

            {/* Quote section */}
            <motion.div
              onClick={cycleQuote}
              className="bg-black/50 rounded-lg p-3 border border-amber-500/30 cursor-pointer hover:border-amber-500/60 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <motion.p
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-sm italic leading-tight"
                >
                  "{character.quotes[currentQuote]}"
                </motion.p>
              </div>
            </motion.div>

            {/* Traits */}
            <div className="flex flex-wrap gap-1">
              {character.traits.map((trait, idx) => (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Badge 
                    variant="outline" 
                    className="text-xs border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                  >
                    {trait}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>

          {/* Floating stars */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 300,
                    y: Math.random() * 300 
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: "-=50"
                  }}
                  transition={{ 
                    duration: 2,
                    delay: idx * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

const CharacterShowcase = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-amber-400 mb-6">
            L'ÉQUIPE D'INVESTIGATION
          </h2>
          <p className="text-xl font-article text-gray-300 max-w-2xl mx-auto">
            Rencontrez les journalistes qui mènent l'enquête sur la mort mystérieuse de George Abitbol.
            Découvrez leurs spécialités et leurs méthodes d'investigation !
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((character, index) => (
            <CharacterCard
              key={character.id}
              character={character}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;