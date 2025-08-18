"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const ImmersiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const images = [
    { src: "/george_big.jpg", title: "George Abitbol", caption: "L'homme le plus classe du monde" },
    { src: "/deco_1.jpg", title: "Scène Mythique", caption: "Un moment inoubliable du film" },
    { src: "/deco_2.jpg", title: "Les Protagonistes", caption: "Une distribution légendaire" },
    { src: "/header.jpg", title: "L'Affiche Originale", caption: "Design iconique de 1993" },
    { src: "/star.png", title: "Behind the Scenes", caption: "Les coulisses du tournage" },
    { src: "/stars1.png", title: "La Première", caption: "Soirée de gala historique" },
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-6"
      >
        <h2 className="text-5xl md:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-6">
          GALERIE CINÉMATOGRAPHIQUE
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Plongez dans l'univers visuel unique de La Classe Américaine
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl transform-gpu"
              onClick={() => setSelectedImage(index)}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-full bg-gradient-to-br from-amber-900/20 to-black film-strip-perforation">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Enhanced Film Frame Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Film strip borders */}
                  <div className="absolute inset-0 border-4 border-gray-900 shadow-inner" />
                  
                  {/* Film strip edges with gradient */}
                  <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg" />
                  <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-gray-900 via-gray-800 to-gray-700 shadow-lg" />
                  
                  {/* Realistic perforations with proper spacing */}
                  <div className="absolute top-2 bottom-2 left-1 w-4 flex flex-col justify-evenly">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={`left-${i}`} 
                        className="w-3 h-2 bg-black rounded-sm shadow-inner border border-gray-600"
                        style={{ 
                          background: 'linear-gradient(145deg, #1f1f1f, #0f0f0f)',
                          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 bottom-2 right-1 w-4 flex flex-col justify-evenly">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={`right-${i}`} 
                        className="w-3 h-2 bg-black rounded-sm shadow-inner border border-gray-600"
                        style={{ 
                          background: 'linear-gradient(145deg, #1f1f1f, #0f0f0f)',
                          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Film frame number */}
                  <div className="absolute bottom-2 left-8 text-xs font-mono text-amber-300 opacity-60 transform rotate-90 origin-bottom-left">
                    35mm
                  </div>
                  
                  {/* Vintage film grain overlay */}
                  <div className="absolute inset-0 opacity-20 mix-blend-multiply vintage-grain" />
                  
                  {/* Subtle light reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none" />
                </div>
                
                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/70 backdrop-blur-sm rounded-full p-4">
                    <Maximize2 className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-amber-400 mb-1">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-8 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-8 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[80vh]">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].title}
                  fill
                  className="object-contain"
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                  <h3 className="text-3xl font-bold text-amber-400 mb-2">
                    {images[selectedImage].title}
                  </h3>
                  <p className="text-xl text-gray-300">
                    {images[selectedImage].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImmersiveGallery;