# FreshWay
Dump du code entier du site web de Freshway

Arborescence simplifiée & explications du site (à télécharger pour voir proprement)

/
├ .htaccess
├ index.html (page d'accueil)
├ css/
│  └─ styles.css (feuille de style)
├ js/ (contient toutes les pages javascript du site – le dynamisme tabeau/carte)
│  └─ config-castelnau.js (Contient les chiffres du tableau et la partie dynamique de la traj. d'espace physique)
├ lib/ (librairies essentielles au fonctionnement et à la pérennité du site)
├ pages/ (contient toutes les autres pages du site)
│  ├ other/ (les pages autres que celles des villes)
│  └─ villes/ (pages des villes)
└─ data/ (contient les données géographiques + les images utilisées dans le site)
   ├ castelnau/ (les données géographiques)
   ├ montreuil/
   ├ pontault/
   ├ sarcelles/
   └─ img/ (les images classées par pages)
      ├ index
      ├ synthese
      ├ debat
      ├ castelnau/1/, 2/, 3/, 4/ (figures & cartes en fonction des trajectoires)
      ├ pontault/1/, 2/, 3/, 4/
      ├ montreuil/1/, 2/, 3/, 4/
      └─ sarcelles/1/, 2/, 3/, 4/
