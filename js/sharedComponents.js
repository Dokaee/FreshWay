// 1. Créer un fichier components/shared.js
const SharedComponents = {
    header: `
        <meta charset="utf-8">    
        <header class="bg-site-primary fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 ease-in-out" id="main-header">
            <div class="container mx-auto flex items-center justify-between px-6 py-10 lg:py-4">
                <a href="/index.html" class="text-white text-4xl font-bold font-logo lg:text-2xl">FreshWay</a>
                
                <div class="flex lg:hidden">
                    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white" id="mobile-menu-button" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                <nav class="hidden lg:flex items-center font-corps space-x-2" id="main-navigation">
                    <a href="/index.html" class="text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-teal-700 ${window.location.pathname === '/index.html' || window.location.pathname === '/' ? 'bg-teal-600' : ''}">À PROPOS</a>
                    
                    <div class="relative group">
                        <button class="text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-teal-700 ${window.location.pathname.startsWith('/pages/villes') ? 'bg-teal-600' : ''} inline-flex items-center">
                            VILLES ÉTUDIÉES
                            <svg class="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div class="absolute left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a href="/pages/villes/castelnau.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${window.location.pathname === '/pages/villes/castelnau.html' ? 'bg-gray-200' : ''}" role="menuitem">Castelnau-le-Lez</a>
                                <a href="/pages/villes/pontault.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${window.location.pathname === '/pages/villes/pontault.html' ? 'bg-gray-200' : ''}" role="menuitem">Pontault-Combault</a>
                                <a href="/pages/villes/sarcelles.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${window.location.pathname === '/pages/villes/sarcelles.html' ? 'bg-gray-200' : ''}" role="menuitem">Sarcelles</a>
                                <a href="/pages/villes/montreuil.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${window.location.pathname === '/pages/villes/montreuil.html' ? 'bg-gray-200' : ''}" role="menuitem">Montreuil</a>
                                </div>
                        </div>
                    </div>

                    <a href="/pages/other/synthese.html" class="text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-teal-700 ${window.location.pathname === '/pages/other/synthese.html' ? 'bg-teal-600' : ''}">SYNTHÈSE</a>
                    <a href="/pages/other/debat.html" class="text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-teal-700 ${window.location.pathname === '/pages/other/debat.html' ? 'bg-teal-600' : ''}">DÉBATS & PISTES</a>
                    <a href="/pages/other/publications.html" class="text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-teal-700 ${window.location.pathname === '/pages/other/publications.html' ? 'bg-teal-600' : ''}">PUBLICATIONS</a>
                </nav>
            </div>


            <meta charset="utf-8">
            <div class="lg:hidden hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/index.html" class="text-white block font-semibold px-3 py-4 rounded-md text-xl font-medium hover:bg-teal-700 ${window.location.pathname === '/index.html' || window.location.pathname === '/' ? 'bg-teal-600' : ''}">À PROPOS</a>
                    
                    <div class="relative">
                        <button class="text-white block font-semibold px-3 py-4 rounded-md text-xl font-medium w-full text-left" id="mobile-cities-menu-button">
                            VILLES ÉTUDIÉES
                            <svg class="ml-2 h-4 w-4 inline-block float-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <div class="hidden" id="mobile-cities-submenu">
                            <a href="/pages/villes/castelnau.html" class="block px-4 py-2 text-xl text-white hover:bg-teal-700 ${window.location.pathname === '/pages/villes/castelnau.html' ? 'bg-teal-700' : ''}">Castelnau-le-Lez</a>
                            <a href="/pages/villes/pontault.html" class="block px-4 py-2 text-xl text-white hover:bg-teal-700 ${window.location.pathname === '/pages/villes/pontault.html' ? 'bg-teal-700' : ''}">Pontault-Combault</a>
                            <a href="/pages/villes/sarcelles.html" class="block px-4 py-2 text-xl text-white hover:bg-teal-700 ${window.location.pathname === '/pages/villes/sarcelles.html' ? 'bg-teal-700' : ''}">Sarcelles</a>
                            <a href="/pages/villes/montreuil.html" class="block px-4 py-2 text-xl text-white hover:bg-teal-700 ${window.location.pathname === '/pages/villes/montreuil.html' ? 'bg-teal-700' : ''}">Montreuil</a>
                        </div>
                    </div>

                    <a href="/pages/other/synthese.html" class="text-white block font-semibold px-3 py-4 rounded-md text-xl font-medium hover:bg-teal-700 ${window.location.pathname === '/pages/other/synthese.html' ? 'bg-teal-600' : ''}">SYNTHÈSE</a>
                    <a href="/pages/other/debat.html" class="text-white block font-semibold px-3 py-4 rounded-md text-xl font-medium hover:bg-teal-700 ${window.location.pathname === '/pages/other/debat.html' ? 'bg-teal-600' : ''}">DÉBATS &  PISTES</a>
                    <a href="/pages/other/publications.html" class="text-white block font-semibold px-3 py-4 rounded-md text-xl font-medium hover:bg-teal-700 ${window.location.pathname === '/pages/other/publications.html' ? 'bg-teal-600' : ''}">PUBLICATIONS</a>
                </div>
            </div>
        </header>
    `,

    footer: `
        <meta charset="utf-8">
        <footer class="bg-teal-800 text-white py-4">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-lg font-bold mb-4">FreshWay</h3>
                        <p class="text-teal-200 mb-4 text-sm">Analyse des trajectoires de rafraîchissement urbain.</p>
                        <p class="text-teal-200 text-sm">© <span id="current-year"></span> FreshWay</p>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold mb-4">Liens rapides</h3>
                        <ul class="space-y-2 text-sm">
                            <li><a href="/" class="text-teal-200 hover:text-white transition duration-200">Accueil</a></li>
                            <li><a href="/pages/other/synthese.html" class="text-teal-200 hover:text-white transition duration-200">Synthèse</a></li>
                            <li><a href="/pages/other/publications.html" class="text-teal-200 hover:text-white transition duration-200">Publications</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-bold mb-2">Contact</h3>
                        <address class="not-italic text-teal-200 text-sm">
                            <p class="mb-2">Anne Ruas</p>
                            <p>Adresse: 14-20 Bd Newton<br>77420 Champs-sur-Marne, France</p>
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    `,


    load() {
        // Injection du header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = this.header;
        }

        // Injection du footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = this.footer;
        }

        // Mettre à jour l'année
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        // Initialiser les comportements interactifs du header
        this.initComponentsListeners();
    },

    initComponentsListeners() {
        this.initMobileMenu();
        this.initHeaderScroll();
    },
    

    initHeaderScroll() {
        const header = document.getElementById('main-header');
        if (!header) return;

        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
                // Défilement vers le bas -> cache le header
                header.classList.add('-translate-y-full');
            } else {
                // Défilement vers le haut -> montre le header
                header.classList.remove('-translate-y-full');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    },

    initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileCitiesMenuButton = document.getElementById('mobile-cities-menu-button');
        const mobileCitiesSubmenu = document.getElementById('mobile-cities-submenu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        if (mobileCitiesMenuButton && mobileCitiesSubmenu) {
            mobileCitiesMenuButton.addEventListener('click', () => {
                mobileCitiesSubmenu.classList.toggle('hidden');
            });
        }
    }
};

// Auto-load au chargement de la page
document.addEventListener('DOMContentLoaded', () => SharedComponents.load());