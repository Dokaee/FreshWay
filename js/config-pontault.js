// Variables de configuration pour la carte, accessibles globalement
var mapCenter = [48.786283, 2.612397];
var initialZoom = 13;
var layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // URL réelle de la couche "avant"

var chartCategories = ['Bâti', 'Végétation', 'Zone imperméable', 'Hydrographie', 'Canopée'];

var polygonChartDataMapping = {
    "select-commune": {
        dataBefore: [9.16, 0, 7.1, 0, 0], 
        dataAfter: [11.84, 0, 8.29, 0, 0],
        dataBeforeha: [125.2, 0, 96.3, 0, 0], 
        dataAfterha: [161.5, 0, 113.1, 0, 0]
    },
    "Zone 1": {
        dataBefore: [10.184, 47.848, 41.968, 0, 6.671], 
        dataAfter: [10.087, 42.897, 46.102, 0.913, 9.982],
        dataBeforeha: [0.950, 4.463, 3.914, 0, 0.622], 
        dataAfterha: [0.941, 4.001, 4.300, 0.085, 0.931]
    },
    "Zone 2": {
        dataBefore: [21.835, 44.916, 33.249, 0, 2.568], 
        dataAfter: [33.018, 4.244, 61.659, 1.079, 3.375],
        dataBeforeha: [0.966, 1.988, 1.471, 0, 0.114], 
        dataAfterha: [1.461, 0.188, 2.729, 0.048, 0.149]
    },
    "Zone 3": {
        dataBefore: [5.743, 56.866, 37.392, 0, 2.098], 
        dataAfter: [28.495, 15.655, 55.851, 0, 0.122],
        dataBeforeha: [0.914, 9.051, 5.951, 0, 0.334], 
        dataAfterha: [4.535, 2.492, 8.889, 0, 0.019]
    },
    "Zone 4": {
        dataBefore: [5.620, 35.295, 59.085, 0, 25.306], 
        dataAfter: [6.385, 20.761, 72.855, 0, 13.318],
        dataBeforeha: [1.013, 6.364, 10.654, 0, 4.563], 
        dataAfterha: [1.151, 3.744, 13.137, 0, 2.401]
    },
    "Zone 5": {
        dataBefore: [24.174, 35.395, 40.431, 0, 1.623], 
        dataAfter: [24.371, 39.517, 36.112, 0, 1.121],
        dataBeforeha: [9.344, 13.681, 15.628, 0, 0.627], 
        dataAfterha: [9.420, 15.275, 13.958, 0, 0.433]
    },
    "Zone 6": {
        dataBefore: [27.712, 44.063, 28.225, 0, 4.434], 
        dataAfter: [25.863, 55.640, 18.497, 0, 4.802],
        dataBeforeha: [1.076, 1.710, 1.095, 0, 0.172], 
        dataAfterha: [1.004, 2.160, 0.718, 0, 0.186]
    },
    "Zone 7": {
        dataBefore: [25.502, 55.915, 18.583, 0, 11.621], 
        dataAfter: [28.045, 51.850, 20.105, 0, 9.274],
        dataBeforeha: [0.855, 1.875, 0.623, 0, 0.390], 
        dataAfterha: [0.941, 1.739, 0.674, 0, 0.311]
    }
};



var zone_etudiee = {geojsonData :secteurs_pontault};
var commune = {geojsonData :pontault_commune};

var zoneSpecificGeojsonData = {
    "Zone 1": {
        before: zone1_2008,
        after: zone1_2022    
    },
    "Zone 2": {
        before: zone2_2008,
        after: zone2_2022    
    },
    "Zone 3": {
        before: zone3_2008,
        after: zone3_2022    
    },
    "Zone 4": {
        before: zone4_2008,
        after: zone4_2022    
    },
    "Zone 5": {
        before: zone5_2008,
        after: zone5_2022    
    },
    "Zone 6": {
        before: zone6_2008,
        after: zone6_2022    
    },
    "Zone 7": {
        before: zone7_2008,
        after: zone7_2022    
    }
};

var annees = [2008, 2022];


vegetation = "Végétation";
building = "Bati";
waterTight = "Zone impermeable";
canopee = "Canopée";
hydrography = "Hydrographie";


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
                                Par rapport aux autres villes étudiées dans ce projet, Pontault-Combault est moins minérale que les autres (20,2% de minéralité sol (routes et bâti) (castelnau 23,9%, Sarcelles 28,3%, Montreuil 42,4%). <b>On peut considérer que Pontault a un fort capital fraîcheur,</b> d’autant plus qu’elle est entourée de ville également moyennement minérale. 
                            </p>
                        </div>
                    </div>
                    <div class="order-1 lg:order-2">
                        <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                            <img src="/data/img/pontault/1/2_carte_schématique.jpg" 
                                 alt="Vue d'ensemble sur Pontault Combault, 2022" 
                                 class="w-full h-auto object-cover border border-gray-300">
                            <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                                Vue d'ensemble sur Pontault Combault, 2022 © Freshway, 2025
                            </figcaption>
                        </figure>
                    </div>
                </div>
                
                <div class="bg-red-50 border border-red-200 p-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mr-4">
                            <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-sm font-bold">!</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-red-800 mb-2 sm:text-xl">Évolution de la minéralité</h5>
                            <p class="text-sm text-red-700 sm:text-lg">
                                Entre 2008 et 2022, la minéralisation a été intense, elle équivaut à 28 ha soit l'équivalent de 40 terrains de foot.
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
                    Nous avons identifié 7 zones qui ont le plus changé entre 2006 et 2023. Cette section présente une vue d'ensemble des transformations pour toutes les zones d'étude. Les zones 1, 2 et 3 sont des zones d'activités qui se sont développées au sud de la N4, accueillant des grandes enseignes comme Décathlon, Boulanger, Leclerc. Sélectionnez une zone spécifique pour voir son analyse détaillée.
                </p>
            </div>
        `
    },
    "Zone 1": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-orange-50 to-red-50 p-6 border-l-4 border-orange-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Développement de zone d'activités commerciales</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone de droite est une zone commerciale (le parc d'activité du bois Notre Dame composé de Décathlon, Burger King, Picard). La zone de gauche UDa 4 est une zone de renouvellement urbain composée de quelques habitations individuelles, d'un hôtel et de terrains vagues. Une route a été construite au sud.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/5_zone1_PLU_2006.png" 
                             alt="Zone 1 - zonages déclarés dans la version du PLU de 2006" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 1 - PLU de 2006 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/5_zone1_PLU_2023.png" 
                             alt="Zone 1 - zonages déclarés dans la version du PLU de 2023" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 1 - PLU de 2023 © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/6_zone1_repart_fonciere.png" 
                             alt="Zone 1 - Répartition foncière" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 1 - Répartition foncière © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/7_zone1_rt_paris_1.png" 
                             alt="Zoom sur les zones de terrains vagues - Route de Paris" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Terrains vagues - Route de Paris © Google Street View, 2024
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/7_zone1_rt_paris_2.png" 
                             alt="Zoom sur les zones de terrains vagues - Route de Paris" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Terrains vagues - Route de Paris © Google Street View, 2024
                        </figcaption>
                    </figure>
                </div>
            </div>
        `
    },
    "Zone 2": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border-l-4 border-blue-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Parc d'activité du pavé de Pontault</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone est le parc d'activité du pavé de Pontault. Entre 2006 et 2023 cette zone est passée de zone de caractère non commercial (UXc) et requalification à UXa (zone d'activités artisanales ou commerciales) à secteur activité qui accueille le centre commercial des 4 chênes (et le grand magasin Leclerc).
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/8_zone2_PLU_2006.png" 
                             alt="Zone 2 - zonages déclarés dans la version du PLU de 2006" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 2 - PLU de 2006 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/8_zone2_PLU_2023.png" 
                             alt="Zone 2 - zonages déclarés dans la version du PLU de 2023" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 2 - PLU de 2023 © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-center">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/6_zone2_repart_fonciere.png" 
                             alt="Zone 2 - Répartition foncière" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Zone 2 - Répartition foncière © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>
            </div>
        `
    },
    "Zone 3": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-red-50 to-orange-50 p-6 border-l-4 border-red-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Zone la plus minéralisée</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La quasi-totalité de la zone 3 a changé. Cela est dû au changement du type de zonage dans le PLU. La zone est passée de "UXb : Restructuration et requalification en urbain" à "UXa : (zone d'activités artisanales ou commerciales). Des trois zones (1, 2, 3) celle-ci est celle qui s'est le plus minéralisée (perte de 6,6ha de nature).
                    </p>
                </div>

            </div>
        `
    },
    "Zone 4": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 border-l-4 border-amber-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-amber-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Coupe en zone naturelle protégée</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone 4 est incluse en 2006 en zone NI "du secteur dit « zone Jean Cocteau », correspondant à un ensemble d'entreprises implantées en zone à vocation naturelle au SDRIF" qui devient zone AUb 'à Urbaniser' en 2022. On peut voir sur les photos décrivant la zone 4 qu'une zone naturelle dans le PLU de 2006 et de 2022, très boisée en 2008 a été coupée. Elle reste protégée en 2022.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/9_zone4_PLU_2006.png" 
                             alt="PLU de 2006" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU de 2006 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/9_zone4_PLU_2022.png" 
                             alt="PLU de 2022" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU de 2022 © Freshway, 2025
                        </figcaption>
                    </figure>

                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/9_zone4_google.png" 
                             alt="Photo Google de la coupe en 2024" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Photo Google de la coupe en 2024
                        </figcaption>
                    </figure>
                </div>

                <div class="bg-amber-50 border border-amber-200 p-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0 mr-4">
                            <div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                <span class="text-white text-sm font-bold">!</span>
                            </div>
                        </div>
                        <div>
                            <h5 class="font-semibold text-amber-800 mb-2 sm:text-xl">Situation particulière</h5>
                            <p class="text-sm text-amber-700 sm:text-lg">
                                Cette coupe est étonnante compte tenu de la classification de la zone aussi bien en 2006 qu'en 2022. Par ailleurs, lors de l'entretien de juin 2024 il a été dit que "sur Cocteau, il y a déjà du bâti illégal, qu'il s'agit de régulariser".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "Zone 5": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-l-4 border-green-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">ZAC de Pontillault - Végétalisation progressive</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone 5 est située dans la ZAC de Pontillault. Entre 2008 et 2022 (BDtopo) de nouveaux bâtiments ont été construits. La zone UXb de 2022 est plus grande que la Zone UXd de 2006. Cette zone accueille surtout des magasins des professionnels de la construction. Cette zone s'est plutôt végétalisée pendant les dernières années.
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/10_zone5_PLU_2022.png" 
                             alt="PLU de la zone 5 de 2022" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU de la zone 5 de 2022 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/10_zone5_PPT.png" 
                             alt="OAP au sud de la zone 5 dans la ZAC de Pontillault" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            OAP au sud de la zone 5 dans la ZAC de Pontillault et son pourcentage de pleine terre © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>

                <div class="bg-amber-50 border border-amber-200 p-6">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        <strong>Extension prévue :</strong> La zone au sud de cette zone est une zone d'activité 'À Urbaniser' dans le PLU 2022 : zone AUa. Il s'agit d'une extension du parc d'activité de Pontillault ce qui confirme le grignotage prévu de cette zone. Sur la carte, on voit qu'il s'agit d'une OAP dont le pourcentage de pleine terre minimale est de 10% ce qui ne permettra pas d'obliger à conserver de la végétation.
                    </p>
                </div>
            </div>
        `
    },
    "Zone 6": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border-l-4 border-purple-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Densification en zone urbaine centrale</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        Le PLU de 2006 a été modifié pour permettre cette densification ( passage de UDc Tissu homogène d’activité à UD :  Tissu discontinu et de densité relative. Cette transformation  est la fin d’une importante restructuration du quartier (figure suivante image de droite) et la création de logements collectifs de faible hauteur (2 étages et un attique (R+2+C)).
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/11_zone6_PLU_2006.png" 
                             alt="PLU et BDtopo de 2006" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU et BDtopo de 2006 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/11_zone6_PLU_2022.png" 
                             alt="PLU et BDtopo de 2022" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU et BDtopo de 2022 © Freshway, 2025
                        </figcaption>
                    </figure>

                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/11_zone6_ortophoto.png" 
                             alt="Orthophoto IGN 2000-2005 du chantier de restructuration" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            Orthophoto IGN 2000-2005 du chantier de restructuration pour la construction de logements collectifs © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>
            </div>
        `
    },
    "Zone 7": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 border-l-4 border-teal-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-teal-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Densification progressive en tissu urbain</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        Comme pour la zone 6 la zone 7 est une zone de densification progressive en remplaçant des maisons individuelles par des petits bâtiments (3 étages).  L’image suivante montre que le  projet prévu en 2006 (UDb Rue des Berchères) a été réduit spatialement et qu’en 2022 les nouvelles constructions étaient construites. Les modifications du PLU ont dû être faites entre 2011 et 2019. 
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/12_zone7_PLU_2006.png" 
                             alt="PLU de 2006 et BDtopo de 2008" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            PLU de 2006 et BDtopo de 2008 © Freshway, 2025
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-4 border border-gray-200 shadow-sm">
                        <img src="/data/img/pontault/3/12_zone7_PLU_2022.png" 
                             alt="BDtopo de 2022 et PLU 2023" 
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-sm text-gray-500 mt-3 font-medium">
                            BDtopo de 2022 et PLU 2023 © Freshway, 2025
                        </figcaption>
                    </figure>
                </div>

                <div class="bg-teal-50 p-6 border border-teal-200">
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        <strong>Évolution du projet :</strong> Le projet initial prévu en 2006 a été adapté et réduit spatialement, montrant une approche plus mesurée de la densification urbaine.
                    </p>
                </div>
            </div>
        `
    }
};