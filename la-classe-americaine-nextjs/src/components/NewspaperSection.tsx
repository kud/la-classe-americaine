"use client";

import { motion } from "framer-motion";
import { FileText, User, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NewspaperSection = () => {
  const articles = [
    {
      headline: "MORT MYSTÉRIEUSE DE GEORGE ABITBOL",
      subheading: "L'homme le plus classe du monde retrouvé mort au large de Pom Pom Galli",
      byline: "Par Peter, Steven et Dave - Correspondants spéciaux",
      date: "31 Décembre 1993",
      location: "Pom Pom Galli, Ocean South Pacific",
      excerpt: "George Abitbol, unanimement reconnu comme l'homme le plus classe du monde, a été retrouvé mort hier soir dans des circonstances mystérieuses. Ses derniers mots, rapportés par les témoins : 'Monde de merde'.",
      tags: ["Enquête", "Mystère", "George Abitbol"]
    },
    {
      headline: "QUI ÉTAIT VRAIMENT GEORGE ABITBOL ?",
      subheading: "Notre enquête exclusive révèle les zones d'ombre d'une vie",
      byline: "Par l'équipe d'investigation",
      date: "1 Janvier 1994",
      location: "Texas",
      excerpt: "Notre investigation nous mène au Texas, où George Abitbol a vécu ses dernières années. Les témoignages recueillis dressent le portrait d'un homme complexe, loin de l'image publique qu'il cultivait.",
      tags: ["Investigation", "Portrait", "Texas"]
    },
    {
      headline: "LES DERNIÈRES 24 HEURES DE GEORGE ABITBOL",
      subheading: "Reconstitution minute par minute de sa dernière journée",
      byline: "Par Dave - Journaliste d'investigation",
      date: "2 Janvier 1994", 
      location: "Reconstitution",
      excerpt: "Que s'est-il passé dans les dernières heures de la vie de George Abitbol ? Notre reconstitution exclusive révèle des éléments troublants qui remettent en question la version officielle.",
      tags: ["Reconstitution", "Enquête", "Révélations"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900/30 to-black/50 relative">
      {/* Newspaper background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="retro-grid h-full" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-amber-600 text-black font-press text-lg px-6 py-2 mb-6">
            ÉDITION SPÉCIALE
          </Badge>
          <h2 className="text-4xl md:text-6xl font-headline text-amber-400 mb-4 newspaper-headline">
            LE JOURNAL DE L'ENQUÊTE
          </h2>
          <p className="text-xl font-article text-gray-300 max-w-3xl mx-auto">
            Les journalistes Peter, Steven et Dave mènent l'investigation sur la mort mystérieuse 
            de George Abitbol. Suivez leur enquête exclusive.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="bg-gray-900/80 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 h-full press-card">
                <CardHeader className="pb-4">
                  {/* Article metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-news-body">{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-news-body">{article.location}</span>
                    </div>
                  </div>

                  {/* Main headline */}
                  <CardTitle className="text-xl font-newspaper text-amber-400 leading-tight mb-3 group-hover:text-amber-300 transition-colors">
                    {article.headline}
                  </CardTitle>

                  {/* Subheading */}
                  <h3 className="text-lg font-article text-gray-200 leading-snug mb-4">
                    {article.subheading}
                  </h3>

                  {/* Byline */}
                  <div className="flex items-center gap-2 text-amber-300 mb-4">
                    <User className="w-4 h-4" />
                    <span className="font-byline text-sm">{article.byline}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Article excerpt */}
                  <p className="font-article text-gray-300 leading-relaxed mb-6 text-justify">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs font-journalist border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* "Continue reading" effect */}
                  <motion.div
                    className="mt-4 pt-4 border-t border-amber-500/20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-press">
                      <FileText className="w-4 h-4" />
                      <span>LIRE LA SUITE EN PAGE 2</span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Press conference style quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-amber-500/50 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <Badge className="bg-amber-600 text-black font-press mb-6">
                DÉCLARATION OFFICIELLE
              </Badge>
              <blockquote className="text-2xl md:text-3xl font-quote text-amber-100 mb-6 leading-relaxed">
                "L'enquête sur la mort de George Abitbol se poursuit. 
                Nous ne laisserons aucune pierre non retournée pour découvrir la vérité 
                derrière ses derniers mots mystérieux."
              </blockquote>
              <p className="font-byline text-amber-300 text-lg">
                — Peter, Steven et Dave, journalistes d'investigation
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default NewspaperSection;