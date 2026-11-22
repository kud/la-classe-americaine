/** V1's invented press reviews (2011). Parody, footnoted on the page as such. */
export interface Review {
  outlet: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    outlet: "The Magazine",
    stars: 4,
    text: "Un flim pour les amateurs de ouiche lorraine et autres animaux préhistoriques partouzeurs de droite.",
  },
  { outlet: "Wogue", stars: 5, text: "Cultissime ! La définition même de la classe !" },
  {
    outlet: "AlloFlim",
    stars: 4,
    text: "Prodigieusement drôle et vivant ! À découvrir avec les copains autour d'un bon paquet de chips.",
  },
  { outlet: "Humour de droite", stars: 1, text: "J'ai rien compris." },
  { outlet: "Mexican Food Restaurant", stars: 1, text: "Des acteurs époustouflants !" },
  { outlet: "Mouvement du jour", stars: 1, text: "Erreur 403." },
];
