// Variables de configuration pour la carte, accessibles globalement
var mapCenter = [48.864227, 2.445961];
var initialZoom = 13;
var layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // URL réelle de la couche "avant"

var chartCategories = ['Bâti', 'Végétation', 'Zone imperméable', 'Canopée'];

var polygonChartDataMapping = {
    "select-commune": {
        dataBefore: [26.70, 0, 12.46, 0], 
        dataAfter: [29.16, 0,13.29 ,0],
        dataBeforeha: [262.21, 0, 111.23, 0], 
        dataAfterha: [260.1, 0, 118.51, 0]
    },
    "Zone 1": {
        dataBefore: [48.88, 0.35, 43.09, 7.68], 
        dataAfter: [46.93, 0.45, 45.16, 7.47],
        dataBeforeha: [1.19, 0.0085, 1.05, 0.187], 
        dataAfterha: [1.14, 0.011, 1.10, 0.182]
    },
    "Zone 2": {
        dataBefore: [13.15, 0, 75.16, 11.69], 
        dataAfter: [35.96, 3.63, 52.88, 7.53],
        dataBeforeha: [0.518, 0, 2.96, 0.460], 
        dataAfterha: [1.42, 0.143, 2.08, 0.296]
    },
    "Zone 3": {
        dataBefore: [0.97, 61.48, 29.72, 7.84], 
        dataAfter: [17.62, 25.89, 50.26, 6.23],
        dataBeforeha: [0.073, 4.66, 2.25, 0.594], 
        dataAfterha: [1.33, 1.96, 3.80, 0.471]
    },
    "Zone 4": {
        dataBefore: [8.06, 35.33, 43.77, 12.84], 
        dataAfter: [12.80, 26.73, 46.46, 12.92],
        dataBeforeha: [0.654, 2.87, 3.55, 1.04], 
        dataAfterha: [1.04, 2.17, 3.77, 1.05]
    },
    "Zone 5": {
        dataBefore: [16.77, 20.35, 55.38, 7.50], 
        dataAfter: [25.16, 9.23, 55.20, 10.40],
        dataBeforeha: [0.413, 0.501, 1.36, 0.185], 
        dataAfterha: [0.620, 0.227, 1.36, 0.256]
    }
};



var zone_etudiee = {geojsonData :secteurs_montreuil};
var commune = {geojsonData :montreuil_commune};

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
    }
};

var annees = [2008, 2023];


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
                <div class="bg-white p-8 rounded-xl shadow-lg -mx-8 mt-8 mb-12 border-l-4 border-violet-500 ">
                    <p class="text-gray-700 leading-relaxed text-lg sm:text-lg mt-4">
                        L'ensemble de la commune de Montreuil a connu une urbanisation modérée entre 2008 et 2023. Cette dynamique se traduit par une augmentation des surfaces bâties et imperméabilisées (environ 5,08 ha soit 7 terrains de football).
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
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
            </div>
        `
    },

    "select-zones": {
        html: `
            <div class="bg-gradient-to-br from-slate-50 to-gray-50 p-6 border-l-4 border-slate-500">
                <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                    <div class="w-4 h-4 bg-slate-500 rounded-full mr-3"></div>
                    <div class="sm:text-2xl">Ensemble des zones étudiées</div>
                </h4>
                <p class="text-gray-700 leading-relaxed sm:text-lg">
                    Nous avons identifié les zones qui ont le plus changé entre 2008 et 2023 et nous avons compté précisément l’évolution du minéral et du végétal sur ces zones. Cette section présente une vue d'ensemble des transformations pour toutes les zones d'étude. Chaque zone a des caractéristiques d'évolution uniques, mais la tendance générale est à la densification urbaine. Les surfaces végétalisées ont diminué d’environ 3.5 hectares. Sélectionnez une zone spécifique pour voir son analyse. Quelques constructions ont été faites : construction d’une résidence étudiante, centre commercial Grand Angle, bâtiment de l’IUT et la Piscine du Murs à Pêches. La zone qui a été la plus modifiée sur la période 2008-2023 est la zone située dans la ZAC Boissière-Acacia, en bordure de Rosny. 
                </p>
            </div>
        `
    },

    "Zone 1": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-l-4 border-blue-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Renouvellement urbain en secteur dense (Avenue Faidherbe)</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed mb-4 sm:text-lg">
                        La zone 1 (avenue Faidherbe) a connu une transformation du bâti, avec la déconstruction de bâtiments, remplacés par la construction d’une résidence étudiante. Une opération du même type a été réalisée Avenue Pasteur dans la même zone PLU. Il s’agit d’opérations de renouvellement urbain avec destruction et reconstruction.
                    </p>
                    <p class="text-gray-700 leading-relaxed sm:text-lg">
                        La zone a connu plusieurs reclassements de zonage dans le PLU. Elle est classée en zone UMixte dans le PLU de 2015, UG(mixité) en 2018, UC(centralité) dans le PLU de 2021 et UM(ixte) en 2023. 
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/6_zone1_2011.png"
                             alt="Zone 1 orthophoto 2011"
                             width="464" height="389"
                             class="w-2/3 h-auto border border-gray-300 flex justify-center mx-auto block">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                            Orthophotographie Zone 1 (2011 - 2015) © IGN
                        </figcaption>
                    </figure>

                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/6_zone1_2015.png"
                             alt="Zone 1 orthophoto 2015"
                             width="448" height="391"
                             class="w-2/3 h-auto border border-gray-300 flex justify-center mx-auto block">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                            Orthophotographie Zone 1 actuelle (2025) © IGN
                        </figcaption>
                    </figure>
                </div>
            </div>
        `
    },

    "Zone 2": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border-l-4 border-emerald-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-emerald-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">ZAC & renouvellement (Zone 2)</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed sm:text-lg mb-4">
                        L’opération a démarré en 1998. Trois grandes tours ont été construites avant 2008, La zone a été renouvelée dans le cadre de la ZAC « Coeur de Ville » portée par la SEM du Conseil général de Seine-Saint-Denis Sequano Aménagement, le PLU révisé. Le centre commercial ‘Grand Angle’ a ouvert en 2012. 
                    </p>
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
                        <div class="sm:text-2xl">ZAC Boissière-Acacia : forte artificialisation</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed mb-4 sm:text-lg">
                        L’importante artificialisation dans la zone 3 est le résultat de la construction de logements dans le cadre de la ZAC Boissière-ACACIA (zone C de la figure ci-dessous). Il est prévu dans cette zone <u>7 ans de travaux et 1200 logements</u> (site Est Ensemble, 2025). Ces aménagements sont toujours en cours de construction en 2023. La construction est donc plus importante que les 2,7 ha sol que nous avions calculés en 2023.  
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/7_zone3.png"
                             alt="Zone 3 vue"
                             width="484" height="527"
                             class="w-2/3 h-auto border border-gray-300 flex justify-center mx-auto block">
                    </figure>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/7_zone3-2.png"
                             alt="Zone 3 vue"
                             width="484" height="527"
                             class="w-2/3 h-auto border border-gray-300 flex justify-center mx-auto block">
                    </figure>

                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/7_zone3-3.png"
                             alt="Zone 3 - Extrait PLUi"
                             width="602" height="606"
                             class="w-full h-auto border border-gray-300">
                    </figure>
                </div>
                <figcaption class="text-center text-sm text-gray-600 mt-4 bg-white py-3 px-4 rounded-lg shadow-sm">
                    Extrait- Réunion concertation Friche SEDIF du 9 octobre 2021 - Zone 3 et image Google StreetView © 2025
                </figcaption>

                <div class="bg-gray-50 p-6 border border-gray-200">
                    <p class="text-gray-700 leading-relaxed">
                        Ce secteur est classé UPMo2 dans le PLUi. A propos de la nature, il est écrit dans le PLUi de 2023 que “Une majorité de la superficie totale des toitures terrasses de plus de 100 m² doit être végétalisée et comporter au moins 30 cm de terre ou de support de culture” et que “Une part de 15 % minimum de la superficie du terrain doit être traitée en espace de pleine terre en évitant son morcellement”. “Les arbres à grand développement doivent être préservés, ou, quand leur abattage est nécessaire, deux arbres à développement équivalent doivent être replantés sur le terrain pour un arbre abattu, ⅓ au minimum des espaces verts de pleine terre doivent être plantés d’arbustes et/ou d’arbres”. Là encore on est dans des pourcentage de pleine terre très bas ce qui est étonnant compte tenu de l’engagement de la collectivité en faveur de la nature en ville. 
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/8_zone3_PLUI.jpg"
                             alt="Zone 3 vue"
                             width="484" height="527"
                             class="w-full h-auto border border-gray-300 flex justify-center mx-auto block">
                    </figure>

                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/8_zone3_PLUI-2.png"
                             alt="Zone 3 - Extrait PLUi"
                             width="602" height="606"
                             class="w-3/4 h-auto border border-gray-300 flex justify-center mx-auto block">
                    </figure>
                </div>
                <figcaption class="text-center text-sm text-gray-600 mt-4 bg-white py-3 px-4 rounded-lg shadow-sm">
                    PLUi 2023 Montreuil : vue d’ensemble et zoom sur la zone 3 UP Mo2 © Freshway 2025  
                </figcaption>
            </div>
        `
    },

    "Zone 4": {
        html: `
            <div class="space-y-8">
                <div class="bg-gradient-to-br from-purple-50 to-violet-50 p-6 border-l-4 border-violet-500">
                    <h4 class="font-soustitre text-xl text-gray-800 mb-4 flex items-center">
                        <div class="w-4 h-4 bg-violet-500 rounded-full mr-3"></div>
                        <div class="sm:text-2xl">Zone 4 — Piscine des Murs à Pêches et équipements</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed mb-4 sm:text-lg">
                        L’artificialisation et la perte de végétation est principalement le résultat de la construction de la piscine municipale la Piscine des Murs à Pêches comprenant un espace extérieur regroupant un plan d’eau sur plus de 1000m². Cette zone est actuellement classée UE (équipement). Dans le PLU de 2018 et de 2023 cette zone est en 15% de pleine terre. En 2018 elle était non réglementée pour la partie CES (coefficient de construction) et à 80% dans le PLUi de 2023.
                    </p>
                    <p class="text-gray-700 leading-relaxed sm:text-lg"> <i>
                        “La piscine des Murs à pêches, par le système de filtration entièrement naturel du bassin extérieur, est plus respectueuse de la santé des baigneurs, mieux inscrite dans le cycle naturel de l’eau et moins consommatrice de moyens matériels, humains et chimiques pour son entretien. Elle est également plus économe en énergie.” </i>Site Est-Ensemble, Juillet 2025. 
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/9_zone4_2006_2020.png"
                             alt="Zone 4 orthophotos 2006-2020"
                             width="555" height="503"
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                            Orthophotographie zone 4 (2006-2020) © IGN, IGN
                        </figcaption>
                    </figure>

                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/9_zone4_2011_2015.png"
                             alt="Zone 4 état actuel"
                             width="595" height="499"
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                            Orthophotographie zone 4 (2011-2015) © IGN
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm">
                        <img src="/data/img/montreuil/3/9_zone4_actuel.png"
                             alt="Zone 4 état actuel"
                             width="595" height="499"
                             class="w-full h-auto border border-gray-300">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                             Orthophotographie zone 4 état actuel © IGN
                        </figcaption>
                    </figure>
                    
                    <figure class="bg-white p-3 border border-gray-200 shadow-sm md:col-span-3">
                        <img src="/data/img/montreuil/3/9_zone4_piscine_est_ensemble.png"
                             alt="Zone 4 état actuel"
                             width="595" height="499"
                             class="w-1/2 h-auto border border-gray-300 flex justify-center mx-auto block">
                        <figcaption class="text-center text-xs text-gray-500 mt-2">
                            Zone 4 — Piscine des Murs à pêches © site Est-Ensemble, Juillet 2025 
                        </figcaption>
                    </figure>
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
                        <div class="sm:text-2xl">Zone 5 — Densification</div>
                    </h4>
                    <p class="text-gray-700 leading-relaxed mb-4 sm:text-lg">
                        La zone 5 a été densifiée par la construction d’un bâtiment de l’IUT de Montreuil entre 2008 et 2015, contribuant à une augmentation de la surface bâtie dans ce secteur.
                    </p>
                </div>
            </div>
        `
    }
};
