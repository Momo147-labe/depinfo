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
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Loader2,
  AlertCircle
} from 'lucide-react';

// --- Définitions des couleurs personnalisées et du thème Dark Mode ---
const COLORS = {
  primary: '#137fec',
  'background-dark': '#101922',
  'dark-card': '#1a2836',
  'dark-text': '#ffffff',
  'dark-text-secondary': '#92adc9',
};

 const somme = data.reduce((somme, item) => somme + (item.tranche1 + item.tranche2 + item.tranche3 + item.tranche4), 0)
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
    <div className="card-modern p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-dark-text-secondary text-sm font-medium uppercase tracking-wide">{title}</p>
        </div>
        <div className="p-2 rounded-lg bg-opacity-20" style={{backgroundColor: color === 'text-green-400' ? '#10b981' : color === 'text-red-400' ? '#ef4444' : '#137fec'}}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-dark-text text-2xl sm:text-3xl font-bold leading-tight">{value}</p>
        <p className={`${color} text-xs font-medium flex items-center gap-1`}>
          {change.includes('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change}
        </p>
      </div>
    </div>
  );
}


// ==========================================================
// Composant 3 : TransactionsTable (Tableau des transactions)
// ==========================================================
function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Filtrer les données selon la recherche et le statut
  const filteredData = data.filter(eleve => {
    const matchSearch = searchTerm === '' || 
      eleve["Nom Complet"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eleve.Numero?.toString().includes(searchTerm);
    
    const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4;
    
    if (filterStatus === 'all') return matchSearch;
    if (filterStatus === 'paid') return matchSearch && totalPaye === 100000;
    if (filterStatus === 'unpaid') return matchSearch && totalPaye < 100000;
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
            <ReceiptText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Liste des Transactions
          </h2>
        </div>
        <p className="text-dark-text-secondary text-base">Historique complet des paiements</p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou numéro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            />
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            >
              <option value="all">Toutes les transactions</option>
              <option value="paid">Paiements reçus</option>
              <option value="unpaid">En attente</option>
            </select>
          </div>

          {/* Statistiques rapides */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <ReceiptText className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{filteredData.length} transactions</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xl">Chargement des données...</span>
          </div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Aucun résultat trouvé</h3>
          <p className="text-gray-500 dark:text-gray-500">Aucune transaction ne correspond à vos critères de recherche.</p>
        </div>
      ) : (
      <>
        {/* Vue Desktop - Tableau */}
        <div className="hidden lg:block backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm table-fixed">
              <colgroup>
                <col className="w-20" />
                <col className="w-28" />
                <col className="w-40" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-36" />
              </colgroup>
              <thead className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/30 dark:to-indigo-900/30">
                <tr>
                  <th className="px-3 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <span>N°</span>
                  </th>
                  <th className="px-3 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Date</span>
                    </div>
                  </th>
                  <th className="px-3 py-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">Nom & Prénom</th>
                  <th className="px-3 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <span>Tranche 1</span>
                  </th>
                  <th className="px-3 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <span>Tranche 2</span>
                  </th>
                  <th className="px-3 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <span>Tranche 3</span>
                  </th>
                  <th className="px-3 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <span>Tranche 4</span>
                  </th>
                  <th className="px-3 py-4 text-right font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-gray-600/50">
                    <div className="flex items-center justify-end gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Total Payé</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((eleve, index) => {
                  const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4;
                  
                  return (
                    <tr key={index} className="hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-100/50 dark:border-gray-700/50">
                      <td className="px-3 py-4 text-left font-medium text-gray-900 dark:text-white">{eleve.Numero}</td>
                      <td className="px-3 py-4 text-left text-gray-600 dark:text-gray-400">{eleve.date}</td>
                      <td className="px-3 py-4 text-left">
                        <div className="font-medium text-gray-900 dark:text-white truncate">{eleve["Nom Complet"]}</div>
                      </td>
                      <td className={`px-3 py-4 text-right font-semibold ${
                        eleve.tranche1 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <div className="whitespace-nowrap">
                          {eleve.tranche1 > 0 ? `${formate(eleve.tranche1)} GNF` : '-'}
                        </div>
                      </td>
                      <td className={`px-3 py-4 text-right font-semibold ${
                        eleve.tranche2 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <div className="whitespace-nowrap">
                          {eleve.tranche2 > 0 ? `${formate(eleve.tranche2)} GNF` : '-'}
                        </div>
                      </td>
                      <td className={`px-3 py-4 text-right font-semibold ${
                        eleve.tranche3 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <div className="whitespace-nowrap">
                          {eleve.tranche3 > 0 ? `${formate(eleve.tranche3)} GNF` : '-'}
                        </div>
                      </td>
                      <td className={`px-3 py-4 text-right font-semibold ${
                        eleve.tranche4 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        <div className="whitespace-nowrap">
                          {eleve.tranche4 > 0 ? `${formate(eleve.tranche4)} GNF` : '-'}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-right font-bold text-lg text-blue-600 dark:text-blue-400">
                        <div className="whitespace-nowrap">
                          {formate(totalPaye)} GNF
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vue Mobile - Cards */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((eleve, index) => {
            const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4;
            
            return (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-4 hover:shadow-2xl transition-all duration-300">
                {/* En-tête de la card */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200/30 dark:border-gray-600/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                      {eleve.Numero}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {eleve["Nom Complet"]}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {eleve.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Détail des tranches */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Détail des paiements</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                      <span className="text-gray-600 dark:text-gray-400">Tranche 1</span>
                      <span className={`font-semibold ${
                        eleve.tranche1 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {eleve.tranche1 > 0 ? `${formate(eleve.tranche1)} GNF` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                      <span className="text-gray-600 dark:text-gray-400">Tranche 2</span>
                      <span className={`font-semibold ${
                        eleve.tranche2 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {eleve.tranche2 > 0 ? `${formate(eleve.tranche2)} GNF` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                      <span className="text-gray-600 dark:text-gray-400">Tranche 3</span>
                      <span className={`font-semibold ${
                        eleve.tranche3 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {eleve.tranche3 > 0 ? `${formate(eleve.tranche3)} GNF` : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                      <span className="text-gray-600 dark:text-gray-400">Tranche 4</span>
                      <span className={`font-semibold ${
                        eleve.tranche4 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {eleve.tranche4 > 0 ? `${formate(eleve.tranche4)} GNF` : '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Montant total */}
                <div className="text-center p-4 rounded-xl bg-blue-50/50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Total payé</span>
                  </div>
                  <p className="font-bold text-2xl text-blue-700 dark:text-blue-300">
                    {formate(totalPaye)} GNF
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </>
      )}
    </div>
  );
}

// ==========================================================
// Composant 4 : DashboardView (Vue complète du Tableau de bord)
// ==========================================================
function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Header avec gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8">
        <div className="relative z-10">
          <h1 className="text-white text-2xl sm:text-4xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-blue-100 text-sm sm:text-base opacity-90">Gérez vos finances en toute simplicité</p>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      {/* Stats Cards - Vue responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} Icon={stat.icon} />
        ))}
      </div>
      
      {/* Actions rapides - Mobile Card View */}
      <div className="card-modern p-6">
        <h3 className="text-dark-text text-lg font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="btn-primary p-3 text-sm rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform">
            <Wallet className="w-5 h-5" />
            <span>Ajouter</span>
          </button>
          <button className="btn-secondary p-3 text-sm rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform">
            <BarChartBig className="w-5 h-5" />
            <span>Rapport</span>
          </button>
          <button className="btn-secondary p-3 text-sm rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform">
            <Settings className="w-5 h-5" />
            <span>Réglages</span>
          </button>
          <button className="btn-secondary p-3 text-sm rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform">
            <ReceiptText className="w-5 h-5" />
            <span>Historique</span>
          </button>
        </div>
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
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    /* Navigation effet glass */
    .glass-nav {
        background-color: rgba(26, 40, 54, 0.7); /* dark-card with transparency */
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    /* Effets visuels */
    .shadow-card {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .shadow-glow {
      box-shadow: 0 0 20px rgba(19, 127, 236, 0.4), 0 8px 32px rgba(0, 0, 0, 0.12);
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
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                <div className="container-custom max-w-7xl">
                    <DashboardView />
                    <div className="mt-8">
                        <TransactionsTable />
                    </div>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}