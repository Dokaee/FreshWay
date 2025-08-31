// Variables de configuration pour la carte, accessibles globalement
var mapCenter = [48.989548, 2.382102];
var initialZoom = 13;
var layerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // URL réelle de la couche "avant"

var chartCategories = ['Bâti', 'Végétation', 'Zone imperméable', 'Canopée'];

var polygonChartDataMapping = {
    "select-commune": {
        dataBefore: [13.69, 0, 11.43, 0], dataAfter: [14.88, 0, 13.45, 0],  
        dataBeforeha: [115.3, 0, 96.3, 0], dataAfterha: [125.3, 0, 113.3, 0]}, 
    "Zone 1": {
        dataBefore: [4.93, 82.59, 12.47, 2.57], dataAfter: [14.31, 41.43, 4.26, 4.73],
        dataBeforeha: [0.47, 7.82, 1.18, 0.24],dataAfterha: [1.35, 4.62, 3.46, 4.17]},
    "Zone 2": {
        dataBefore: [20.09, 26.27, 53.63, 5.53],dataAfter: [37.46, 13.23, 49.31, 3.67],
        dataBeforeha: [0.3, 0.39, 0.81, 0.08],dataAfterha: [0.57, 0.2, 0.75, 0.06]},
    "Zone 3": {
        dataBefore: [2.61, 85.42, 11.97, 8.13],dataAfter: [38.1, 27.1, 34.8, 8.01],
        dataBeforeha: [0.35, 11.5, 1.61, 1.09],dataAfterha: [5.13, 3.65, 4.69, 1.08]},
    "Zone 4": {
        dataBefore: [19.08, 70.65, 10.27, 21.33],dataAfter: [26.73, 63.06, 10.21, 12.35],
        dataBeforeha: [0.77, 2.85, 0.41, 0.86],dataAfterha: [1.08, 2.55, 0.41, 0.5]}
};



var zone_etudiee = {geojsonData :secteurs_sarcelles};
var commune = {geojsonData :sarcelles_commune};

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
    }
};

var annees = [2008, 2022];


vegetation = "Végétation";
building = "Bâti";
waterTight = "Zone impermeable";
canopee = "Canopée";
hydrography = "Hydrographie";



// Texte d'analyse dynamique pour chaque zone

var zoneAnalysisText = {
	"select-commune": {
		html: `
<h4 class="font-soustitre text-xl text-gray-800 mt-6 mb-4">Autres OAP (Orientations d’Aménagement et de Programmation) en cours :</h4>
<div class="space-y-6">
	<div class="bg-white p-4 rounded-lg border">
		<p><strong>OAP Cèdre Bleu :</strong> vise à construire entre 250 et 280 logements collectifs, entre 10 et 15 logements individuels, un équipement culturel, une école et un parc public. Il est noté qu’il faudra conserver les arbres remarquables et limiter l’imperméabilisation (OAP du PLU 2022).</p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
			<figure>
				<img src="/data/img/sarcelles/3/12_OAP_cedre-google.png" alt="Vue satellite OAP Cèdre Bleu" class="rounded-lg shadow-md w-full">
				<figcaption class="text-xs text-center text-gray-500 mt-2">Vue satellite OAP Cèdre Bleu ©Google</figcaption>
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/12_OAP_cedre-PLU.png" alt="Zonage PLU 2022 OAP Cèdre Bleu" class="rounded-lg shadow-md w-full">
				<figcaption class="text-xs text-center text-gray-500 mt-2">Zonage PLU 2022 OAP Cèdre Bleu</figcaption>
			</figure>
		</div>
	</div>

	<div class="bg-white p-4 rounded-lg border">
		<p><strong>OAP Pointe Trois-Quart / Les Mureaux :</strong> La point trois quart est une zone très défavorisée, dont une partie se situe sous un important réseau électrique à haute tension. La zone est divisée dans le PLU en trois sections : une zone d’activité au nord, une zone verte au centre et une zone de logement au sud. Le projet vise “à construire 300 logements pour répondre aux besoins en logements neufs sur Sarcelles, désenclaver le quartier, Maintenir les activités existantes, faire un nouveau parc pour les sarcellois sous les lignes hautes tensions”. Selon la mairie, ce projet sera long car il y a un “long travail de remembrement à faire”. Des premiers logements ont été construits en 2024. Il est écrit qu’il faut “Paysager les îlots pour limiter l’impact des effets d’îlots de chaleur”. (OAP du PLU 2022) </p>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
			<figure>
				<img src="/data/img/sarcelles/3/13_OAP_trois_quarts-google.png" alt="Vue satellite OAP Pointe Trois-Quart" class="rounded-lg shadow-md w-full">
				<figcaption class="text-xs text-center text-gray-500 mt-2">Vue satellite OAP Pointe Trois-Quart ©Google</figcaption>
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/13_OAP_trois_PLU.png" alt="Zonage PLU 2022 OAP Pointe Trois-Quart" class="rounded-lg shadow-md w-full">
				<figcaption class="text-xs text-center text-gray-500 mt-2">Zonage PLU 2022 OAP Pointe Trois-Quart</figcaption>
			</figure>
		</div>
	</div>

	<div class="bg-white p-6 sm:p-8 rounded-lg border">
        <p class="text-gray-700 leading-relaxed text-lg sm:text-base">
            <strong>OAP Le Haut du Roy :</strong> La zone de l’OAP le haut du roy est classée AU et N. Elle est enclavée entre une zone pavillonnaire et le quartier des Lochères. Elle est traversée par le Petit Rosne avec un lit bétonné. L’objectif du projet est de rouvrir le petit Rosne et de construire 220 logements (R+2 et 5+3), une crèche, une école et un EhPAD. il est écrit qu’il faut “Réserver une emprise inconstructible de 15 m de part et d’autre du talweg (point le plus bas) du Petit Rosne” et “Paysager les îlots pour limiter l’impact des effets d’îlots de chaleur”. (OAP du PLU 2022)
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
			<figure>
				<img src="/data/img/sarcelles/3/14_OAP_h_roy-google.png" alt="Vue satellite - OAP Le Haut du Roy" class="rounded-lg shadow-md w-full">
                <figcaption class="text-xs text-center text-gray-500 mt-2">Vue satellite - OAP Le Haut du Roy</figcaption>
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/14_OAP_h_roy-PLU.png" alt="Zonage PLU 2022 - OAP Le Haut du Roy" class="rounded-lg shadow-md w-full">
                <figcaption class="text-xs text-center text-gray-500 mt-2">Zonage PLU 2022 - OAP Le Haut du Roy</figcaption>
			</figure>
            <figure>
				<img src="/data/img/sarcelles/3/14_OAP_h_roy-pourcPT.png" alt="Proportions de pleine terre - OAP Le Haut du Roy" class="rounded-lg shadow-md w-full">
                <figcaption class="text-xs text-center text-gray-500 mt-2">Proportions de pleine terre - OAP Le Haut du Roy</figcaption>
			</figure>
		</div>
    </div>

    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
        <h4 class="font-semibold text-lg text-amber-900 mb-3 flex items-center">
            Focus sur les 3 OAP
        </h4>
        <p class="text-amber-800 leading-relaxed">
            On notera que pour ces 3 OAP, le pourcentage de pleine terre n’est pas défini dans le PLU de 2022 .
        </p>
    </div>

</div>
`
	},

	"select-zones": {
		html: `
<p class="text-gray-700 leading-relaxed sm:text-lg">
	Les zones 1 à 4 traduisent les processus d’urbanisation de Sarcelles : l'étalement urbain pour l’installation de zones commerciales (zones 1 et 3) et la densification du cœur de ville pour sa revitalisation (zones 2 et 4). L'ensemble de ces zones témoigne d'une perte nette de végétation de 11.5 ha entre 2008 et 2022.
</p>
`
	},

	"Zone 1": {
		html: `
<p class="text-gray-700 leading-relaxed sm:text-lg">
	<strong>Les zones 1 et 3 sont à côté l’une de l’autre. Ce sont aujourd’hui des zones commerciales dont les modifications avaient déjà été prévues dans le PLU de 2008. </strong> 
</p>
<p class="text-gray-700 leading-relaxed sm:text-lg">
	La zone 1 se situe à la ‘pointe trois quart’ de Sarcelles, dans un zone <strong>à urbaniser</strong> en 2008 (IAU) et en <strong>zones d’activités</strong> dans le PLU de 2022 avec une petite partie en zone naturelle (sud de la zone 1) et où passe des grosses infrastructures électriques. Les constructions entre 2008 et 2022 sont un garage, un collège,  un EHPAD et un cinéma et son parking (qui couvre la zone naturelle). L’imperméabilisation est importante. Le sud de la zone devait accueillir une route départementale (le BIP Boulevard du Parisis) qui a connu une vive opposition des habitants et qui n’a finalement pas été construite. <strong>Cette zone 1 va être encore urbanisée (information entretien juillet 2024).</strong> 
</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
	<div class="col-span-2">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<figure>
				<img src="/data/img/sarcelles/3/5_zone1_PLU_2008.png" alt="Zonage PLU 2008 - Zone 1" class="rounded-lg shadow-md w-full">
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/5_zone1_PLU_2008-2.png" alt="Zonage PLU 2008 - Zone 1" class="rounded-lg shadow-md w-full">
			</figure>
		</div>
		<figcaption class="text-xs text-center text-gray-500 mt-2">
			Zone 1 - zonages déclarés dans la version du PLU de 2008 (gauche) et dans la version du PLU de 2022 (droite) © Freshway 2025
		</figcaption>
	</div>
	<div class="col-span-2 mt-6">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<figure>
				<img src="/data/img/sarcelles/3/5_zone1_rep_fonciere.png" alt="Zonage PLU 2022 - Zone 1" class="rounded-lg shadow-md w-full">
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/5_zone1_rep_fonciere-2.png" alt="Zonage PLU 2008 - Zone 1" class="rounded-lg shadow-md w-2/3 h-auto mx-auto">
			</figure>
		</div>
		<figcaption class="text-xs text-center text-gray-500 mt-2">
			Zone 1 - Répartition foncière en 2022 (gauche) et vue satellite ©Google 2025
		</figcaption>
	</div>
</div>
<br/>
<div class="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
    <p class="text-amber-800 leading-relaxed">
        De façon étonnante les deux parkings 1 et 2 ont été imperméabilisés alors que ces zones sont en zone naturelle dans le PLU de 2022. 
    </p>
</div>

`
	},

	"Zone 2": {
		html: `
<p class="text-gray-700 leading-relaxed sm:text-lg">
	La zone 2 est comprise dans le cœur de la ville de Sarcelles. Elle est inclue dans la zone de <strong>l’OAP village</strong> du PLU de 2022. La zone est construite dans une zone avec un coefficient de pleine terre de 10% ce qui ne permet pas de conserver les arbres. La zone est déjà très imperméable en 2008, mais le projet correspond à la densification et la revitalisation du cœur de ville. La densification est bien visible dans la figure suivante. 
</p>
<p class="text-gray-700 leading-relaxed sm:text-lg mt-4">
	Cette zone de l’OAP village est amenée à se densifier. Elle est proche de la ligne H. Les bâtiments existants sont vétustes. Des maisons ont de grands jardins. 1000 ou 2000 logements de plus en R+3 ou R+4 sont envisagés dans cette zone.  
</p>
<figure class="mt-6">
	<img src="/data/img/sarcelles/3/7_zone2_google.png" alt="Vue de la densification Rue Montfleury" class="rounded-lg shadow-md w-full">
	<figcaption class="text-xs text-center text-gray-500 mt-2">Zone 2 - Rue Montfleury ©Google maps - ©Google Street View, 2024</figcaption>
</figure>
`
	},

	"Zone 3": {
		html: `
<p class="text-gray-700 leading-relaxed sm:text-lg">
	<strong>Les zones 1 et 3 sont à côté l’une de l’autre. Ce sont aujourd’hui des zones commerciales dont les modifications avaient déjà été prévues dans le PLU de 2008. </strong> 
</p><br/>
<p class="text-gray-700 leading-relaxed sm:text-lg">
	La zone 3 est en zone industrielle en 2008 et 2022. La zone accueille maintenant le supermarché Auchan et d’autres grandes enseignes.
</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
	<div class="col-span-2">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure>
				<img src="/data/img/sarcelles/3/6_zone1_rep_fonciere.png" alt="Zonage PLU 2008 - Zone 1" class="rounded-lg shadow-md w-full">
			</figure>
			<figure>
				<img src="/data/img/sarcelles/3/6_zone1_rep_fonciere-2.png" alt="Répartition foncière Zone 3" class="rounded-lg shadow-md w-3/4 mx-auto">
			</figure>
		</div>
        <figcaption class="text-xs text-center text-gray-500 mt-2">Zone 3 - Répartition foncière en 2022 © Freshway 2025</figcaption>
    </div>
</div>
<br/>
<div class="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-l-4 border-amber-500 shadow-lg">
    <p class="text-amber-800 leading-relaxed">
        La quasi-totalité de la zone 3 est occupée par les activités (industriel et commercial) mais sans présence d’OAP. Ces deux zones ont été modifiées sans OAP. 
    </p>
</div>
`
	},

	"Zone 4": {
		html: `
<p class="text-gray-700 leading-relaxed sm:text-lg">
	La zone 4 illustre également la densification de cœur d’îlot. Le PLU a été découpé entre 2008 et 2022. Aux deux zones urbaines (UA - quartier du village et UG - zone pavillonnaire) a été ajoutée une zone naturelle (N).
</p>
<p class="text-gray-700 leading-relaxed sm:text-lg mt-4">
	<strong>La zone quartier de village (UA) est en pleine terre à 10%</strong>, Elle a été plus densifiée que l’autre partie (UG à 50% de pleine terre).  
</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
	<figure class="group text-center lg:col-span-1">
		<img src="/data/img/sarcelles/3/8_zone4_PLU_2008.png" alt="Zonage PLU 2008 - Zone 4" class="rounded-lg shadow-md w-full">
		<figcaption class="text-xs text-center text-gray-500 mt-2">Zonages déclarés dans la version du PLU de 2008</figcaption>
	</figure>
	<figure class="group text-center lg:col-span-1">
		<img src="/data/img/sarcelles/3/8_zone4_PLU_2022.png" alt="Zonage PLU 2022 - Zone 4" class="rounded-lg shadow-md w-full">
		<figcaption class="text-xs text-center text-gray-500 mt-2">Zonages déclarés dans la version du PLU de 2022</figcaption>
	</figure>
</div>

<div class="grid grid-cols-1 md:grid-cols-8 gap-4 mt-6">
	<figure class="group text-center col-span-1 md:col-span-4 lg:col-span-4">
		<img src="/data/img/sarcelles/3/10_zone4_rep_fonciere.png" alt="Zonage PLU 2008 - Zone 4" class="rounded-lg shadow-md w-full">
        <figcaption class="text-xs text-center text-gray-500 mt-2">Zone 4 - Répartition foncière en 2022 </figcaption>
	</figure>
	<figure class="group text-center col-span-1 md:col-span-2 lg:col-span-2">
		<img src="/data/img/sarcelles/3/10_zone4_rep_fonciere-2.png" alt="Zonage PLU 2022 - Zone 4" class="rounded-lg shadow-md w-full">
        <figcaption class="text-xs text-center text-gray-500 mt-2">Zone 4 - Pourcentage minimum de pleine terre en 2022  </figcaption>
	</figure>
    <figure class="group text-center col-span-1 md:col-span-2 lg:col-span-2">
		<img src="/data/img/sarcelles/3/10_zone4_rep_fonciere-3.png" alt="Zonage PLU 2022 - Zone 4" class="rounded-lg shadow-md w-full">
        <figcaption class="text-xs text-center text-gray-500 mt-2">Zone 4 - Limite de l’OAP ‘le village’  </figcaption>
	</figure>
</div>

<figure class="mt-6">
	<img src="/data/img/sarcelles/3/11_zone4_google.png" alt="Vue de la densification Rue Victor Hugo" class="rounded-lg shadow-md w-full">
	<figcaption class="text-xs text-center text-gray-500 mt-2">Zone 4 - Rue Victor Hugo ©Google maps - ©Google Street View, 2024</figcaption>
</figure>
`
	}
};
