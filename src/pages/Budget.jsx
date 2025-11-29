import { useState } from 'react';
import data from "../data/paiements.json"
import info from "../data/information.json"
import {
  LayoutDashboard,
  ReceiptText,
  BarChartBig,
  Settings,
  Wallet,
  ArrowUp,
  ArrowDown,
  Menu,
  X, // Ajouté pour le bouton de fermeture du menu mobile
} from 'lucide-react';
import TransactionsListView from '../components/TransactionsListView';

// --- Définitions des couleurs personnalisées et du thème Dark Mode ---
const COLORS = {
  primary: '#137fec',
  'background-dark': '#101922',
  'dark-card': '#1a2836',
  'dark-text': '#ffffff',
  'dark-text-secondary': '#92adc9',
};

 const somme =data.reduce((somme , item)=> somme + item.montant,0)
 const tail=info.length
// --- Données Statiques (Imaginaires) ---

const NAV_LINKS = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { key: 'transactions', icon: ReceiptText, label: 'Transactions' },
  { key: 'reports', icon: BarChartBig, label: 'Rapports' },
  { key: 'settings', icon: Settings, label: 'Paramètres' },
];

const STATS_DATA = [
  { title: 'Solde Actuel', value: `${formate(somme)} GNF `, change: '+2.5% vs mois dernier', color: 'text-green-400', icon: Wallet },
  { title: 'Revenus (trimestre)', value: `${formate(25000*62)} GNF`, change: '+15% vs mois dernier', color: 'text-green-400', icon: ArrowUp },
  { title: 'Dépenses (ce mois-ci)', value: 'pas de depande', change: '+0% vs mois dernier', color: 'text-red-400', icon: ArrowDown },
];


function formate(n){
  return Number(n).toLocaleString("fr-FR")
}


// ==========================================================
// Composant 2 : StatCard (Carte de Statistique Réutilisable)
// ==========================================================
function StatCard({ title, value, change, color, Icon }) {
  return (
    <div className="card-modern shadow-card hover:shadow-glow">
      <div className="flex justify-between items-start">
        <p className="text-dark-text-secondary text-base font-medium leading-normal">{title}</p>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-dark-text tracking-tight text-4xl font-bold leading-tight mt-2">{value}</p>
      <p className={`${color} text-sm font-medium leading-normal mt-1`}>{change}</p>
    </div>
  );
}


// ==========================================================
// Composant 4 : DashboardView (Vue complète du Tableau de bord)
// ==========================================================
function DashboardView() {

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <p className="text-dark-text text-3xl sm:text-4xl font-extrabold leading-tight">Tableau de bord du budget</p>
          <p className="text-dark-text-secondary text-base font-normal leading-normal">Aperçu financier du mois en cours</p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} Icon={stat.icon} />
        ))}
      </div>
      
    </div>
  );
}


// ==========================================================
// Composant Principal : App
// Intégration des styles CSS pour garantir la cohérence
// ==========================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  // Utilisation d'un bloc style pour définir les classes personnalisées
  const customStyles = `
    /* Définitions des couleurs */
    .text-dark-text { color: ${COLORS['dark-text']}; }
    .text-dark-text-secondary { color: ${COLORS['dark-text-secondary']}; }
    .bg-dark-card { background-color: ${COLORS['dark-card']}; }
    
    /* Styles du bouton Primaire */
    .btn-primary { 
      background-color: ${COLORS.primary}; 
      color: white; 
      border-radius: 0.5rem;
      font-weight: 700;
      transition: background-color 0.2s;
    }
    .btn-primary:hover { background-color: #106fcc; }

    /* Styles du bouton Secondaire */
    .btn-secondary {
      background-color: ${COLORS['dark-card']};
      color: ${COLORS['dark-text']};
      border: 1px solid #233648;
      border-radius: 0.5rem;
      font-weight: 700;
      transition: background-color 0.2s;
    }
    .btn-secondary:hover { background-color: #2a3f55; }

    /* Carte moderne (fond sombre) */
    .card-modern {
      background-color: ${COLORS['dark-card']};
      border-radius: 0.75rem; /* xl */
    }

    /* Navigation effet glass */
    .glass-nav {
        background-color: rgba(26, 40, 54, 0.7); /* dark-card with transparency */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    /* Effets visuels */
    .shadow-glow {
      box-shadow: 0 0 10px rgba(19, 127, 236, 0.3); /* primary color glow */
    }
    
    .shadow-inner-glow {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    /* Particules d'arrière-plan */
    @keyframes move {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(300px, 100px) scale(1.2); }
        100% { transform: translate(0, 0) scale(1); }
    }
    .particle {
        position: absolute;
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(19, 127, 236, 0.1), transparent 70%);
        border-radius: 50%;
        opacity: 0.6;
        filter: blur(40px);
        animation: move 20s infinite alternate;
        z-index: 0;
    }
    .p1 { top: 10%; left: 5%; animation-duration: 25s; }
    .p2 { bottom: 20%; right: 10%; animation-duration: 18s; animation-delay: 5s; }
    .p3 { top: 50%; right: 40%; animation-duration: 30s; animation-delay: 10s; }
    .p4 { bottom: 5%; left: 30%; animation-duration: 22s; animation-delay: 2s; }

    /* Conteneur pour limiter la largeur sur desktop */
    .container-custom {
        max-width: 1280px; /* Equivalent à max-w-7xl ou un peu moins */
        margin-left: auto;
        margin-right: auto;
    }
  `;

  return (
    <div className={`relative min-h-screen font-inter bg-background-dark text-dark-text`}> 
      
      {/* 0. Styles CSS pour rendre le composant autonome */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* --- Particules d'arrière-plan --- */}
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>
      <div className="particle p4"></div>
      
      <div className="flex min-h-screen font-inter relative z-10">
        
        
        {/* 2. Contenu principal et Header mobile */}
        <div className="flex-1 flex flex-col">
            {/* Header Mobile (visible uniquement sur les petits écrans) */}
            <header className='lg:hidden flex justify-between items-center w-full p-4 glass-nav sticky top-0 z-20 border-b border-primary-800/50'>
                <h1 className="text-dark-text text-xl font-semibold">
                    {NAV_LINKS.find(link => link.key === currentPage)?.label || 'Budget Classe'}
                </h1>
                <button className='text-dark-text-secondary hover:text-primary' onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className='w-6 h-6'/>
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                <div className="container-custom">
                
                    {<DashboardView />}
                    { <TransactionsListView />}
                    
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}