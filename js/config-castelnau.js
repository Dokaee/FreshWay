// Variables de configuration pour la carte, accessibles globalement
var mapCenter = [43.635725, 3.910948];
var initialZoom = 13;
var layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // URL réelle de la couche "avant"

var chartCategories = ['Bâti', 'Végétation', 'Imperméable', 'Sol Nu', 'Canopée'];

var polygonChartDataMapping = {
    "select-commune": {
        dataBefore: [9.6, 0, 11.4, 0], dataAfter: [11, 0, 12.5, 0],
        dataBeforeha: [107.66, 0, 123.67, 0], dataAfterha: [128.31, 0, 140.06, 0]},
    "Caylus": {
        dataBefore: [0.6, 93.3, 6.1, 0, 21.1], dataAfter: [17.8, 43.3, 37.5, 1.4, 15.35],
        dataBeforeha: [0.1, 20.9, 1.4, 0, 4.73], dataAfterha: [4.2, 9.0, 8.9, 0.4, 3.44]},
    "Palais des sports": {
        dataBefore: [2.9, 64.8, 17.9, 14.4, 13.19], dataAfter: [5.4, 71.6, 22.5, 0.5, 23.24],
        dataBeforeha: [2.1, 47.4, 13.1, 10.5, 9.65], dataAfterha: [3.8, 51.4, 17.6, 0.4, 17]},
    "Chemin du thym": {
        dataBefore: [7.2, 69.7, 23.1, 0, 7.08], dataAfter: [16.6, 37.1, 43.2, 3.1, 16.83],
        dataBeforeha: [0.2, 1.6, 0.5, 0, 0.16], dataAfterha: [0.38, 0.83, 0.98, 0.07, 0.38]},
    "Avenue de l'Europe": {
        dataBefore: [19.5, 31.7, 48.8, 0, 17.83], dataAfter: [29, 25, 43.4, 2.6, 11.79],
        dataBeforeha: [8.3, 13.5, 20.9, 0, 7.62], dataAfterha: [12.4, 10.6, 18.7, 1.0, 5.04]},
    "Eureka": {
        dataBefore: [6.0, 24.1, 0.7, 0, 13.05], dataAfter: [10.0, 16.1, 34.0, 39.9, 10.57],
        dataBeforeha: [4.5, 51.8, 18.8, 0, 9.67], dataAfterha: [7.2, 30.8, 24.5, 11.6, 7.83]}
};



var zone_etudiee = {geojsonData :secteurs_castelnau};
var commune = {geojsonData :castelnau_commune};

var zoneSpecificGeojsonData = {
    "Caylus": {
        before: caylus2005,
        after: caylus2022   
    },
    "Palais des sports": {
        before: palais_des_sports2005,
        after: palais_des_sports2022   
    },
    "Chemin du thym": {
        before: chemin_du_thymn2005,
        after: chemin_du_thymn2022  
    },
    "Avenue de l'Europe": {
        before: avenue_europe2005,
        after: avenue_europe2022    
    },
    "Eureka": {
        before: eureka2005,
        after: eureka2022    
    }
};

var annees = [2005, 2023];


vegetation = "Vegetation";
building = "Batiment";
waterTight = "Zone impermeable";
bareGrnd = "Sol nu";
canopee = "Canopée";

// Texte d'analyse dynamique pour chaque zone
var realZoneNames = ["Caylus", "Palais de sports", "Chemin du thym", "Avenue de l'Europe", "Eureka"];


// Texte d'analyse dynamique pour chaque zone
var zoneAnalysisText = {
    "select-commune": {
        html: `
            <div class="space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div class="order-2 lg:order-1">
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-l-4 border-blue-500">
                            <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                                <div class="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                                <div class="sm:text-2xl">Une transformation urbaine généralisée</div>
                            </h4>
                            <p class="text-gray-700 leading-relaxed sm:text-lg">
                                L'ensemble de la commune de Castelnau-le-Lez a connu une urbanisation significative entre 2005 et 2023. Cette dynamique se traduit par une augmentation notable des surfaces bâties et imperméabilisées (environ 37ha soit 53 terrains de football), principalement au détriment des espaces naturels.
                            </p>
                        </div>
                    </div>
                    <div class="order-1 lg:order-2">
                        <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                            <img src="/data/img/castelnau/3/5_zones étudiées.png" 
                                 alt="Vue de la commune" 
                                 class="w-full h-auto object-cover border border-gray-300">
                            <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                                Les 5 zones d'étude de la commune © FreshWay 2024
                            </figcaption>
                        </figure>
                    </div>
                </div>
                
                <div class="bg-amber-50 border border-amber-200 p-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mr-4">
                            <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-sm font-bold">!</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-amber-800 mb-2 sm:text-xl">Note méthodologique</h5>
                            <p class="text-sm text-amber-700 sm:text-lg">
                                Dans l'ensemble de la commune, la catégorie d'occupation du sol 'Imperméable' est calculée à partir de données sur la voirie.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "select-zones": {
        html: `
            <div class="bg-gradient-to-br from-slate-50 to-gray-50 p-6 border-l-4 border-slate-500">
                <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                    <div class="w-4 h-4 bg-slate-500 rounded-full mr-3"></div>
                    <div class="sm:text-2xl">Vue d'ensemble des transformations</div>
                </h4>
                <p class="text-gray-700 leading-relaxed sm:text-lg">
                    Nous avons identifié les zones qui ont le plus changé entre 2005 et 2023 et nous avons compté précisément l’évolution du minéral et du végétal sur ces zones. Cette section présente une vue d'ensemble des transformations pour toutes les zones d'étude. Chaque zone a des caractéristiques d'évolution uniques, mais la tendance générale est à la densification urbaine. Les surfaces végétalisées ont diminué d’environ 33 hectares. Sélectionnez une zone spécifique pour voir son analyse détaillée.
                </p>
            </div>
        `
    },
    "Caylus": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-red-50 to-orange-50 p-6 border-l-4 border-red-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Forte artificialisation d'un secteur naturel</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed mb-4 sm:text-lg">
                        La zone de Caylus est située au nord de la commune. Elle recoupe principalement le périmètre de la ZAC « Eco quartier Domaine de Caylus ». Elle a pour vocation principale de réaliser un quartier de logements équilibré en termes de typologie. La zone développe aussi des équipements publics ou d’intérêt collectif (source  PLU de Castelnau).
                    </p>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        Pour les constructions à usage d’habitation individuelle, au minimum 15 % de la superficie de la parcelle devra être laissée perméable. Ce pourcentage est porté à 30% minimum pour les parcelles de plus de 350m². Au moins un arbre de haute tige doit être planté tous les 40m² d’espace libre de constructions (PLU, ARTICLE 2AU12). La zone a été introduite en 2014 dans le PLU de Castelnau (REVISION SIMPLIFIEE « Domaine de Caylus » approuvée par délibération du 20 janvier 2014) voir figure suivante.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/castelnau/3/7_zones_plu_caylus.png" 
                             alt="Carte du PLU de 2007 révisé en 2014 pour la zone de Caylus" 
                             class="w-100 h-auto border border-gray-300 mx-auto block">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU de 2007 Révisé en 2014 pour permettre l’urbanisation de Caylus et la BDTopo 2021 © IGN, FreshWay 2024
                        </figcaption>
                    </figure>
                </div>

                <div class="bg-gray-50 p-6 border border-gray-200">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone a perdu de 12 ha en végétation sol (~ 17 terrains de foot) entre 2014 et 2021 – La végétation qui couvrait 93,3% du terrain n’en représente plus que 40%.
                    </p>
                </div>
            </div>
        `
    },
    "Palais des sports": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-l-4 border-green-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Construction de bâti & pousse de végétation</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        Cette zone est composée d’un terrain communal avec la grande salle des sports de Castelnau et un parcours de santé, un lycée (le lycée Pompidou), une caserne, une déchèterie et de l’autre côté du tram un EHPAD (terrain appartenant à la métropole). Toute la zone est classée UP : Équipements publics dans le PLU de 2007. 
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/castelnau/3/9_zones_plu_palais.png" 
                             alt="Carte du PLU sur la zone du Palais des Sports" 
                             class="w-100 h-auto border border-gray-300 mx-auto block">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zonage PLU sur le secteur du Palais des sports © FreshWay 2024
                        </figcaption>
                    </figure>
                </div>

                <div class="bg-green-50 p-6 border border-green-200">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone a gagné de la végétation +4ha  (~ 5,5 terrains de foot) malgré la construction de bâtiments (entre autres l’EHPAD) et du tram entre 2005 et 2021. La végétation a gagné du terrain sur des sols nus.
                    </p>
                </div>
            </div>
        `
    },
    "Chemin du thym": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-orange-50 to-red-50 p-6 border-l-4 border-orange-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Densification par "remembrement" parcellaire</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        Cette zone a été remembrée en 2017. De multiples terrains d’environ 1000m² ont été créés et vendus puis les constructions sont apparues. Ce processus de densification par découpage des parcelles est assez fréquent (processus Bimby).
                        <b>A noter que ces parcelles sont plus grandes que celles du quartier du Devois (Zone d’Action Concertée Allées Jules César) remembrée en 2005 où de nombreux terrains mesurent environ 500m² et moins pour les maisons mitoyennes :  entre 150 et 300m².</b>
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div class="space-y-4">
                        <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                            <img src="/data/img/castelnau/3/10_bdparcellaire_chemin-thymn.png" 
                                 alt="Image du parcellaire" 
                                 class="w-100 h-auto border border-gray-300 mx-auto block">
                            <figcaption class="text-center text-xs text-gray-500 mt-2">
                                © BDParcellaire du géoportail, FreshWay 2023
                            </figcaption>
                        </figure>
                    </div>
                    
                    <div class="space-y-4">
                        <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                            <img src="/data/img/castelnau/3/11_francecadastre_chemin-thymn.png" 
                                 alt="Image du cadastre" 
                                 class="w-full h-auto border border-gray-300">
                            <figcaption class="text-center text-xs text-gray-500 mt-2">
                                © France Cadastre, FreshWay 2023
                            </figcaption>
                        </figure>
                    </div>
                </div>

                <div class="bg-orange-50 p-6 border border-orange-200">
                    <p class="text-gray-700 leading-relaxed">
                        La zone a perdu 0.8ha de végétation (~1 terrain de foot)  entre  2005 et 2023. La zone est passée d’une couverture végétale de 70% à 36%. 
                    </p>
                </div>
            </div>
        `
    },
    "Avenue de l'Europe": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border-l-4 border-blue-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Transformation urbaine le long du tramway</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        L'avenue de l'Europe est historiquement la nationale qui relie Montpellier à Nîmes. Sur Castelnau, elle longe la voie SNCF que l'on voit dans les images ci-dessous. La ligne 2 du tram de Montpellier a été construite au centre de cette nationale sur Castelnau, elle a été inaugurée en décembre 2006.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
                    <div class="bg-white p-6 border border-gray-200 shadow-sm">
                        <h5 class="font-semibold text-lg text-gray-800 mb-3">Planification et transformation</h5>
                        <p class="text-gray-700 text-sm leading-relaxed mb-4 sm:text-lg">
                            Le PLU (approuvé en 2007) a donc préparé la transformation urbaine aux abords de cette voie en autorisant la construction de logements majoritairement R+2 (zone UB) et quelques R+3 aux carrefours (zone 1UB). Toute cette zone s’est progressivement transformée, les maisons individuelles arborées laissant progressivement la place à des immeubles au fur et à mesure des ventes. Le pourcentage de pleine terre dans le PLU de 2007 est de 20% ce qui ne permet pas de conserver des arbres existants lors de nouvelles constructions. La zone continue à être construite en 2025. La transformation de la zone aura pris presque 20 ans (de 2008 à 2025). 
                        </p>
                    </div>
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm items-center">
                        <img src="/data/img/castelnau/3/6_zones_plu_europe.jpg" 
                             alt="Carte des zones UB et 1UB du PLU de 2007 qui préparent la densification de la zone longeant le tramway" 
                             class="w-100 h-auto border border-gray-300 mx-auto block">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zones UB et 1UB du PLU de 2007 qui préparent la densification de la zone longeant le tramway © FreshWay 2024
                        </figcaption>
                    </figure>
                </div>

            </div>
        `
    },

    "Eureka": {
        html: `
            <div class="space-y-6">
                <div class="bg-white border border-gray-200 p-6 shadow-sm">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone identifiée comprend une partie du parc d’activité Jean Mermoz (UE) qui s’est densifiée et surtout la zone d’Extension du parc Eurêka qui s’est complètement transformée entre 2005 et 2024. La zone d’Extension d’Eureka fait l’objet de la Modification simplifiée n°3 du PLU de castelnau approuvé le 31 janvier 2020 “Le Projet Extension du Parc Eureka est une composante de la politique d’aménagement de sites d’activités et pôles de développement économique qui ont été définis par le Schéma de Cohérence Territoriale (SCOT), approuvé le 17 février 2006. Située au Sud-Ouest de la commune de Castelnau-le-Lez, elle vise à poursuivre un développement urbain en vue de l’installation d’activités économiques, dans un cadre paysager préservé. Elle s’inscrit également dans le périmètre de l’EcoCité, qui intéresse les Communes de Castelnau le Lez, Montpellier, Lattes et Pérols (..)” (source Rapport de présentation PLU Castelnau le Lez) .
                        <br/><br/>La zone d’Eureka est classée 1UAa dans le PLU. L’image ci-dessous montre le chantier en 2021, depuis des nouvelles constructions ont émergé dont l’EHPAD des muriers. La zone d’Eureka est une ZAC (Zone d'Aménagement Concertée) qui a été confiée par la métropole 3M à la SERM l'aménagement de la zone de 39ha. Le secteur doit  devenir un “quartier urbain doté d'une mixité fonctionnelle de logements, bureaux, commerces et activités, Eurêka offrira des services nouveaux dédiés à la population senior et à la problématique du « Bien-vieillir » “(communication 3M). Elle contient la micro forêt qui est une des réalisations remarquables que nous avons sélectionnées.
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <figure class="bg-white border border-gray-200 p-4">
                        <img src="/data/img/castelnau/3/8_zones_plu_eureka-1.png" alt="Carte du PLU pour la zone Eurêka" class="w-full h-auto shadow-md border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-4 font-medium">PLU de 2007 modifié en 2020 © FreshWay 2024</figcaption>
                    </figure>
                    <figure class="bg-white border border-gray-200 p-4">
                        <img src="/data/img/castelnau/3/8_zones_plu_eureka-2.png" alt="Photo aérienne de la zone Eurêka en 2021" class="w-full h-auto shadow-md border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-4 font-medium">Photo aérienne de 2021 © IGN</figcaption>
                    </figure>
                <div class="bg-gray-50 border border-gray-200 p-6 col-span-2">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">La zone Eureka est encore en cours d’aménagement en 2025. Entre 2005 et 2023, la zone a perdu 20ha de végétation sol sur 73ha, soit environ 30 terrains de foot. Les constructions sont encore en cours. En l’état actuel, la zone est très minérale.</p>
                </div>
                </div>
            </div>
        `
    }
};