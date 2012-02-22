/**
 * Script
 */
var reviews = [
    ['The Magazine', 4, 'Un flim pour les amateurs de ouiche lorraine et autres animaux préhistoriques partouzeurs de droite.'],
    ['Wogue', 5, 'Cultissime ! La définition même de la classe !'],
    ['AlloFlim', 4, 'Prodigieusement drôle et vivant !<br>A découvrir avec les copains autour d’un bon paquet de chips.'],
    ['Humour de droite', 1, 'J\'ai rien compris.'],
    ['Mexican Food Restaurant', 1, 'Des acteurs époustouflants !'],
    ['Mouvement du jour', 1, 'Erreur 403.'],
];

var stars = [
    '<img alt="1 étoile" src="img/stars1.png">',
    '<img alt="2 étoiles" src="img/stars2.png">',
    '<img alt="3 étoiles" src="img/stars3.png">',
    '<img alt="4 étoiles" src="img/stars4.png">',
    '<img alt="5 étoiles" src="img/stars5.png">'
]

var georgeBubbles = [
    'Le train de tes injures roule sur le rail de mon indifférence.',
    'Je préfère partir plutôt que d’entendre ça plutôt que d’être sourd.',
    'Monde de merde.',
    'Eh, tu sais à qui tu parles, là ?',
    'Vous savez ce que vous mangez, là ?',
    'Madame Felipe, la patronne, se coupe les morceaux de nichon pour en faire des ravioles.',
    'Tes excuses tu peux te les coller au cul, tout comme ton bifteck, sauf que le bifteck, ça sert à rien, le patron l’a déjà fait.',
    'C\'est ça, la puissance intellectuelle !... bac+2, les enfants !',
    'Tiens regarde ! Les Anglais ont débarqué. On va être obligé de passer par derrière, tu sais, par ce tunnel tout sombre qui sent pas très bon.',
    'Moi ce que je vois, c\'est que dans deux secondes je vais te botter le cul.',
    'J\'ai les bonbons qui collent au papier.'
]


jQuery(document).ready(function(){
    reviewSize = reviews.length;
    bubbleSize = georgeBubbles.length;

    setInterval("rollTheDice(reviewSize, modifyReview)", 10000); 
    setInterval("rollTheDice(bubbleSize, modifyBubble)", 10000); 
});

/**
 * Shuffle the function called
 * @param  {integer} max  Number max
 * @param  {string} func Function name
 * @return {void}
 */
function rollTheDice(max, func)
{
    var random = Math.floor(Math.random() * max);

    func(random);
}

/**
 * Modify the review quotes
 * @param  {integer} key Array key
 * @return {void}
 */
function modifyReview(key)
{
    var reviewElmt = jQuery("#intro #review");

    reviewElmt.fadeOut(function(){
        reviewElmt.find('q').html(reviews[key][2]);
        reviewElmt.find('.star').html(stars[parseInt(reviews[key][1]) - 1]);
        reviewElmt.find('.source').html(reviews[key][0]); 

        reviewElmt.fadeIn();
    });    
}

/**
 * Modify the george's quotes
 * @param  {integer} key Array key
 * @return {void}
 */
function modifyBubble(key)
{
    var bubbleElmt = jQuery("#main header q");

    bubbleElmt.fadeOut(function(){
        bubbleElmt.html(georgeBubbles[key]);
        bubbleElmt.fadeIn();
    });   
}