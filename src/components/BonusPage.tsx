"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Gift, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BonusPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
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
          <div className="flex items-center justify-center gap-4 mb-4">
            <Gift className="w-12 h-12 text-amber-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-400">
              BONUS
            </h1>
            <Gift className="w-12 h-12 text-amber-400" />
          </div>
          <p className="text-xl text-gray-300">
            Derrick contre Superman - Un délire supplémentaire
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
              <CardTitle className="text-2xl text-amber-400 flex items-center justify-center gap-2">
                <Play className="w-6 h-6" />
                Derrick contre Superman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                <iframe 
                  className="w-full h-full"
                  src="http://www.dailymotion.com/embed/video/x14u5j?logo=0&hideInfos=1&animatedTitle=Bonus%7CDerrick+contre+Superman%7C"
                  frameBorder="0" 
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-amber-500/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-amber-400 mb-4">
                Un bonus exceptionnel
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Dans la même veine que La Classe Américaine, découvrez ce bonus délirant 
                qui met en scène Derrick contre Superman. Un autre exemple du génie 
                créatif de Michel Hazanavicius et Dominique Mézerette dans l'art du détournement.
              </p>
              
              <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-500/40">
                <p className="text-amber-200 text-sm italic">
                  "Quand l'inspecteur Derrick rencontre l'Homme d'Acier, 
                  ça donne un moment de pur délire télévisuel !"
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Vous avez aimé ce bonus ? Découvrez le film complet !
          </p>
          <Link href="/film">
            <Button 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-8 py-4 text-lg rounded-none transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Voir le film complet
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BonusPage;