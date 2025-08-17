"use client";

import { motion } from "framer-motion";
import { Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FilmPage = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
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
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black"
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
            REGARDE LE
          </h1>
          <p className="text-xl text-gray-300">
            L'homme le plus classe du monde dans toute sa splendeur
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-amber-500/30">
            <iframe 
              className="w-full h-full"
              src="http://player.vimeo.com/video/26249810"
              frameBorder="0" 
              allowFullScreen
              allow="autoplay; fullscreen; picture-in-picture"
            />
          </div>
        </motion.div>

        {/* Film Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <div className="bg-gray-900/50 p-8 rounded-lg border border-amber-500/30">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              À propos de ce chef-d'œuvre
            </h3>
            <p className="text-gray-300 leading-relaxed">
              La Classe américaine est un détournement génial de films classiques américains, 
              créant une histoire complètement nouvelle autour de George Abitbol, 
              l'homme le plus classe du monde. Un montage virtuose qui transforme 
              les plus grands acteurs d'Hollywood en personnages déjantés.
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-amber-400 font-semibold">Durée:</span>
                <span className="text-gray-300 ml-2">72 minutes</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Année:</span>
                <span className="text-gray-300 ml-2">1993</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Genre:</span>
                <span className="text-gray-300 ml-2">Comédie</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Diffusion:</span>
                <span className="text-gray-300 ml-2">Canal+</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Warning Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl mx-auto mt-8 text-center"
        >
          <div className="bg-amber-900/20 border border-amber-500/50 rounded-lg p-4">
            <p className="text-amber-200 text-sm italic">
              "Attention ! ce flim n'est pas un flim sur le cyclimse. Merci de votre compréhension."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilmPage;