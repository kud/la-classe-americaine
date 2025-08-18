"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Camera, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DocuPage = () => {
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <Camera className="w-12 h-12 text-amber-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400">
              DOCUMENTAIRE
            </h1>
            <Film className="w-12 h-12 text-amber-400" />
          </div>
          <p className="text-xl text-gray-300">
            Dans les coulisses du génie créatif
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="bg-gray-900/50 border-amber-500/30 overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-400">
                Les Réalisateurs
              </CardTitle>
              <p className="text-gray-300">Michel Hazanavicius et Dominique Mézerette</p>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full"
                  src="http://www.dailymotion.com/embed/video/x8zvay?logo=0&hideInfos=1&animatedTitle=Documentaire%7CLes+réalisateurs%7C"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Description Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-400">Le Making-Of</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Découvrez les secrets de fabrication de ce chef-d'œuvre du détournement. 
                  Comment deux réalisateurs visionnaires ont-ils réussi à transformer 
                  des extraits de films classiques en une histoire complètement nouvelle ?
                </p>
                <p>
                  Michel Hazanavicius et Dominique Mézerette nous dévoilent leur méthode, 
                  leurs inspirations et les défis techniques qu'ils ont dû relever pour 
                  créer La Classe Américaine.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-gradient-to-bl from-gray-900/80 to-gray-800/80 border-amber-500/30 h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-400">L'Art du Détournement</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Un témoignage unique sur la création d'un film culte qui a marqué 
                  toute une génération. De l'idée originale aux techniques de montage, 
                  en passant par le travail de redoublage.
                </p>
                <p>
                  Ce documentaire est un incontournable pour comprendre la genèse 
                  d'une œuvre qui a révolutionné l'art du détournement audiovisuel 
                  et influencé de nombreux créateurs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <Card className="bg-black/50 border-amber-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-400">Le Saviez-vous ?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Warner Bros. avait donné un accès libre à 4000 films de leur catalogue 
                    pour célébrer leurs 70 ans
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Le film utilise les voix originales des doubleurs français des acteurs
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Michel Hazanavicius a ensuite réalisé "The Artist", 
                    qui a remporté 5 Oscars
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Le film n'a été diffusé que deux fois à la télévision en 25 ans
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DocuPage;