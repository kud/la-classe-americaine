"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Film, Users, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  const technicalInfo = [
    { icon: Users, label: "Réalisation", value: "Michel Hazanavicius et Dominique Mézerette" },
    { icon: Film, label: "Scénario", value: "Michel Hazanavicius et Dominique Mézerette" },
    { icon: Clock, label: "Durée", value: "72 minutes" },
    { icon: Calendar, label: "Année", value: "1993" },
    { icon: Award, label: "Production", value: "Dune, Canal+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-400 bg-black/80 hover:bg-amber-500 hover:text-black transition-all duration-300 focus-visible-ring shadow-professional"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-400 mb-4">
            C'EST À PROPOS DE...
          </h1>
          <p className="text-xl text-gray-300">
            L'histoire d'un détournement légendaire
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400">À propos de la Classe Américaine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    La Classe américaine ou Le Grand Détournement est un film français, écrit et réalisé par 
                    <span className="text-amber-400 font-semibold"> Michel Hazanavicius</span> et 
                    <span className="text-amber-400 font-semibold"> Dominique Mézerette</span>, diffusé en 1993 sur Canal+.
                  </p>
                  <p>
                    Il est composé d'extraits de films de Warner Bros. réalisés entre 1952 et 1980, 
                    ainsi qu'un bref extrait d'un épisode de la série Maigret avec Bruno Cremer, 
                    montés et doublés afin de créer un film inédit.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Synopsis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-gray-900/50 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-amber-400">Synopsis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Le film se pose volontiers en hommage au <span className="text-amber-400 font-semibold">Citizen Kane</span> d'Orson Welles. 
                    La présence de ce dernier dans le film, qui fait savoir à quel point il n'aime pas 
                    « les voleurs et les fils de pute » informe le spectateur que le film se pose davantage 
                    en dédicace qu'en plagiat de l'œuvre mythique du cinéaste reconnu.
                  </p>
                  <div className="bg-amber-900/20 border border-amber-500/50 rounded-lg p-4 my-6">
                    <p className="text-amber-200 italic text-center">
                      "Attention ! ce flim n'est pas un flim sur le cyclimse. Merci de votre compréhension"
                    </p>
                  </div>
                  <p>
                    L'histoire débute avec la mort de « l'homme le plus classe du monde », 
                    <span className="text-amber-400 font-semibold"> George Abitbol</span> (John Wayne), 
                    au large de l'atoll de Pom Pom Galli, situé entre l'Australia et la South America, 
                    dans l'Ocean South Pacific.
                  </p>
                  <p>
                    Les journalistes <span className="text-amber-400">Dave</span> (Paul Newman), 
                    <span className="text-amber-400"> Peter</span> (Dustin Hoffman), prononcé « Pétaire » et non pas « Piteur », 
                    et <span className="text-amber-400">Steven</span> (Robert Redford), prononcé « Stévaine » et non pas « Stiveun », 
                    enquêtent sur ses dernières paroles : <span className="text-red-400 font-bold">« Monde de merde »</span>.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* George Abitbol Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-amber-500/30 overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src="/george_big.jpg"
                    alt="George Abitbol"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-amber-400 font-bold text-lg">George Abitbol</h3>
                    <p className="text-gray-300 text-sm">L'homme le plus classe du monde</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Technical Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-gray-900/50 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-amber-400">Fiche Technique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {technicalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <info.icon className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-amber-400 font-semibold text-sm">{info.label}</p>
                        <p className="text-gray-300 text-sm">{info.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Diffusion History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-amber-400 text-center">Histoire des Diffusions</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed space-y-4">
              <p>
                La première diffusion a lieu sur la chaîne Canal+ le <span className="text-amber-400 font-semibold">31 décembre 1993</span>. 
                Une seconde diffusion a lieu en 2004 sur la chaîne Festival (devenue depuis France 4).
              </p>
              <p>
                Le <span className="text-amber-400 font-semibold">11 avril 2009</span>, le film est officiellement projeté sur grand écran 
                au centre Georges-Pompidou lors du festival Hors Pistes en présence des deux auteurs.
              </p>
              <div className="text-center mt-6">
                <Link 
                  href="http://fr.wikipedia.org/wiki/La_Classe_am%C3%A9ricaine" 
                  target="_blank"
                  className="text-amber-400 hover:text-amber-300 underline text-sm"
                >
                  Source: Wikipedia
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;