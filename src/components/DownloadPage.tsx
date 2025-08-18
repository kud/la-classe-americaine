"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, AlertTriangle, Disc, FileVideo, Archive } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DownloadPage = () => {
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
            <Download className="w-12 h-12 text-amber-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400">
              TÉLÉCHARGEZ-LE
            </h1>
            <Disc className="w-12 h-12 text-amber-400" />
          </div>
          <p className="text-xl text-gray-300">
            Possède ce chef-d'œuvre pour l'éternité
          </p>
        </motion.div>

        {/* Warning Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="bg-amber-900/20 border-amber-500/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <p className="text-amber-200 font-semibold text-lg">
                  Attention !
                </p>
              </div>
              <p className="text-amber-100 text-center italic text-xl leading-relaxed">
                "Ce DVD n'est pas un DVD sur l'athlétimse."
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="bg-gradient-to-r from-gray-900/80 to-black/80 border-amber-500/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-amber-400">
                Ça t'a plu ?
              </CardTitle>
              <p className="text-xl text-gray-300 mt-4">
                Tu souhaites l'avoir pour toi tout seul ? C'est possible.
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Télécharge ce monument du cinéma français et savoure 
                les aventures de George Abitbol quand tu le souhaites. 
                Un incontournable pour tous les amateurs de détournement génial !
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="https://archive.org/details/LaClasseAmricaine1993" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-12 py-6 text-xl rounded-lg shadow-2xl transform transition-all duration-300 focus-visible-ring"
                  >
                    <Download className="mr-3 h-6 w-6" />
                    Télécharger le Film
                  </Button>
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-black/50 border-amber-500/30 text-center h-full">
              <CardContent className="p-6">
                <FileVideo className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-amber-400 mb-3">Qualité DVD</h3>
                <p className="text-gray-300">
                  Profitez du film dans la meilleure qualité disponible, 
                  avec un son et une image optimisés.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="bg-black/50 border-amber-500/30 text-center h-full">
              <CardContent className="p-6">
                <Archive className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-amber-400 mb-3">Collection</h3>
                <p className="text-gray-300">
                  Un film culte à ajouter à votre collection personnelle 
                  de chefs-d'œuvre du cinéma français.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Card className="bg-black/50 border-amber-500/30 text-center h-full">
              <CardContent className="p-6">
                <Disc className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-amber-400 mb-3">Hors ligne</h3>
                <p className="text-gray-300">
                  Regardez George Abitbol et ses derniers mots 
                  même sans connexion internet.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Final Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-500/40">
            <CardContent className="p-8">
              <blockquote className="text-2xl italic text-amber-100 mb-4">
                "Il suffit juste de cliquer en dessous."
              </blockquote>
              <p className="text-gray-400">— Les créateurs</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadPage;