"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Compass } from "lucide-react"

const NotFound = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 px-6">
      <div className="absolute inset-0 vintage-grain opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-8xl md:text-[12rem] font-headline font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 leading-none drop-shadow-2xl"
        >
          404
        </motion.h1>

        <p className="text-2xl md:text-4xl font-quote italic text-red-400 font-bold mt-2 mb-6">
          &laquo; Monde de merde. &raquo;
        </p>

        <p className="text-lg md:text-xl text-gray-300 font-article leading-relaxed mb-2">
          Cette page n&apos;existe pas. Elle n&apos;a jamais existé. Et
          pourtant, vous voilà.
        </p>
        <p className="text-base text-gray-500 font-article italic mb-12">
          Je dis ça, je dis rien.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-full shadow-2xl focus-visible-ring"
            >
              <Home className="w-5 h-5" />
              RETOUR À L&apos;ACCUEIL
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-5 border-2 border-amber-400 text-amber-400 bg-black/60 font-bold text-lg rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 backdrop-blur-sm focus-visible-ring"
            >
              <Compass className="w-5 h-5" />
              C&apos;EST PAR LÀ
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default NotFound
