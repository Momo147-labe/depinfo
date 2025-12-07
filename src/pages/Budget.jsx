import { useState } from 'react';
import data from "../data/paiements.json"
import info from "../data/information.json"
import depenses from "../data/depenses.json"
import autrerevenue from "../data/autrerevenue.json"
import {
  LayoutDashboard,
  ReceiptText,
  BarChartBig,
  Settings,
  Wallet,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
  TrendingUp,
  PieChart,
  Calendar
} from 'lucide-react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Users, 
  DollarSign, 
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

const somme = data.reduce((somme, item) => somme + (item.tranche1 + item.tranche2 + item.tranche3 + item.tranche4 + item.tranche5 + item.tranche6 + item.tranche7 + item.tranche8 + item.tranche9), 0)
const totalAutreRevenue = autrerevenue.reduce((total, revenu) => total + revenu.montant, 0)
const totalDepenses = depenses.reduce((total, depense) => total + depense.montant, 0)
const revenus = somme + totalAutreRevenue
const soldeActuel = revenus - totalDepenses
const tail=info.length

const NAV_LINKS = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { key: 'transactions', icon: ReceiptText, label: 'Transactions' },
  { key: 'reports', icon: BarChartBig, label: 'Rapports' },
  { key: 'settings', icon: Settings, label: 'Paramètres' },
];

const STATS_DATA = [
  { title: 'Solde Actuel', value: `${formate(soldeActuel)} GNF`, change: `${soldeActuel >= 0 ? '+' : ''}${((soldeActuel/revenus)*100).toFixed(1)}%`, color: soldeActuel >= 0 ? 'text-green-400' : 'text-red-400', icon: Wallet },
  { title: 'Revenus totaux', value: `${formate(revenus)} GNF`, change: `${data.length + autrerevenue.length} sources`, color: 'text-green-400', icon: ArrowUp },
  { title: 'Dépenses totales', value: `${formate(totalDepenses)} GNF`, change: `${depenses.length} transactions`, color: 'text-red-400', icon: ArrowDown },
  { title: 'Autres revenus', value: `${formate(totalAutreRevenue)} GNF`, change: `${autrerevenue.length} sources`, color: 'text-purple-400', icon: ReceiptText },
];

function formate(n){
  return Number(n).toLocaleString("fr-FR")
}

// ==========================================================
// Composant 2 : StatCard (Carte de Statistique Réutilisable)
// ==========================================================
function StatCard({ title, value, change, color, Icon }) {
  const getIconBg = () => {
    if (color === 'text-green-400') return 'from-emerald-500 to-green-500';
    if (color === 'text-red-400') return 'from-red-500 to-rose-500';
    if (color === 'text-purple-400') return 'from-purple-500 to-violet-500';
    return 'from-blue-500 to-indigo-500';
  };

  return (
    <div className="card-modern p-6 hover-lift hover:shadow-glow group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${getIconBg()} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-white text-2xl sm:text-3xl font-bold">{value}</p>
        <div className={`${color} text-sm font-medium flex items-center gap-2`}>
          {change.includes('+') ? 
            <ArrowUp className="w-4 h-4" /> : 
            <ArrowDown className="w-4 h-4" />
          }
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// Composant 3 : Charts (Graphiques des Tranches)
// ==========================================================
function Charts() {
  // Calcul des totaux par tranche
  const trancheData = [
    { name: 'T1', total: data.reduce((sum, student) => sum + student.tranche1, 0), color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-400' },
    { name: 'T2', total: data.reduce((sum, student) => sum + student.tranche2, 0), color: 'bg-green-500', gradient: 'from-green-500 to-green-400' },
    { name: 'T3', total: data.reduce((sum, student) => sum + student.tranche3, 0), color: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-400' },
    { name: 'T4', total: data.reduce((sum, student) => sum + student.tranche4, 0), color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-400' },
    { name: 'T5', total: data.reduce((sum, student) => sum + student.tranche5, 0), color: 'bg-red-500', gradient: 'from-red-500 to-red-400' },
    { name: 'T6', total: data.reduce((sum, student) => sum + student.tranche6, 0), color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-400' },
    { name: 'T7', total: data.reduce((sum, student) => sum + student.tranche7, 0), color: 'bg-pink-500', gradient: 'from-pink-500 to-pink-400' },
    { name: 'T8', total: data.reduce((sum, student) => sum + student.tranche8, 0), color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-400' },
    { name: 'T9', total: data.reduce((sum, student) => sum + student.tranche9, 0), color: 'bg-teal-500', gradient: 'from-teal-500 to-teal-400' }
  ];

  const maxTotal = Math.max(...trancheData.map(t => t.total));

  return (
    <div className="space-y-8">
      {/* Graphique en barres - Comparaison des tranches */}
      {/* <div className="card-modern p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChartBig className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Comparaison des Tranches de Paiement</h3>
        </div>
        
        <div className="flex items-end justify-between h-64 gap-4">
          {trancheData.map((tranche, index) => {
            const height = (tranche.total / maxTotal) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs text-gray-400 mb-2">
                    {formate(tranche.total)} GNF
                  </span>
                  <div 
                    className={`w-full bg-gradient-to-t ${tranche.gradient} rounded-t-lg transition-all duration-1000`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-sm text-gray-300 mt-2">{tranche.name}</span>
              </div>
            );
          })}
        </div>
      </div> */}

      {/* Statistiques des tranches */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-modern p-6">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Répartition par Tranche</h3>
          </div>
          
          <div className="space-y-4">
            {trancheData.map((tranche, index) => {
              const percentage = ((tranche.total / somme) * 100).toFixed(1);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${tranche.color}`} />
                      <span className="text-sm text-gray-300">{tranche.name}</span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      {formate(tranche.total)} GNF ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${tranche.gradient} h-2 rounded-full transition-all duration-1000`}
                      style={{width: `${percentage}%`}}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Moyennes par tranche */}
        <div className="card-modern p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Moyennes par Tranche</h3>
          </div>
          
          <div className="space-y-4">
            {trancheData.map((tranche, index) => {
              const moyenne = Math.round(tranche.total / data.length);
              return (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${tranche.color}`} />
                    <span className="text-gray-300">{tranche.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {formate(moyenne)} GNF
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// Composant 4 : AutreRevenueTable (Tableau des autres revenus)
// ==========================================================
function AutreRevenueTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredRevenus = autrerevenue.filter(revenu => {
    return searchTerm === '' || 
      revenu.auteur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revenu.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      revenu.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
            <ArrowUp className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Autres Revenus
          </h2>
        </div>
        <p className="text-dark-text-secondary text-base">Sources de revenus supplémentaires</p>
      </div>

      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-3 sm:p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          <div className="flex-1 w-full sm:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par source, auteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
              <span className="font-medium">{filteredRevenus.length} revenu{filteredRevenus.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredRevenus.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun revenu trouvé</h3>
        </div>
      ) : (
      <>
        {/* Vue Desktop - Tableau */}
        <div className="hidden lg:block backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Auteur</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Source</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Description</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-300">Montant</th>
                </tr>
              </thead>
              <tbody>
                {filteredRevenus.map((revenu, index) => (
                  <tr key={revenu.id} className="hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-100/50 dark:border-gray-700/50">
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{revenu.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{revenu.auteur}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{revenu.source}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{revenu.description || '-'}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600 dark:text-green-400">
                      +{formate(revenu.montant)} GNF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vue Mobile - Cards */}
        <div className="lg:hidden space-y-3 sm:space-y-4 px-2 sm:px-0">
          {filteredRevenus.map((revenu, index) => (
            <div key={revenu.id} className="mx-auto max-w-md sm:max-w-none backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-4 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200/30 dark:border-gray-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    <ArrowUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {revenu.auteur}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {revenu.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    +{formate(revenu.montant)} GNF
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Source:</span>
                  <p className="text-gray-900 dark:text-white font-medium">{revenu.source}</p>
                </div>
                {revenu.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{revenu.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
      )}
    </div>
  );
}

// ==========================================================
// Composant 5 : DepensesTable (Tableau des dépenses)
// ==========================================================
function DepensesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredDepenses = depenses.filter(depense => {
    return searchTerm === '' || 
      depense.auteur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depense.cause?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depense.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg">
            <ArrowDown className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Transactions de Dépenses
          </h2>
        </div>
        <p className="text-dark-text-secondary text-base">Historique des sorties d'argent</p>
      </div>

      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par auteur, cause ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <ArrowDown className="w-4 h-4 text-red-500" />
              <span className="font-medium">{filteredDepenses.length} dépense{filteredDepenses.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredDepenses.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucune dépense trouvée</h3>
        </div>
      ) : (
      <>
        {/* Vue Desktop - Tableau */}
        <div className="hidden lg:block backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-red-500/10 to-pink-500/10">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Auteur</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Cause</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-300">Description</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-700 dark:text-gray-300">Montant</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepenses.map((depense, index) => (
                  <tr key={depense.id} className="hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 border-b border-gray-100/50 dark:border-gray-700/50">
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{depense.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{depense.auteur}</td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{depense.cause}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{depense.description || '-'}</td>
                    <td className="px-6 py-4 text-right font-bold text-red-600 dark:text-red-400">
                      -{formate(depense.montant)} GNF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vue Mobile - Cards */}
        <div className="lg:hidden space-y-4">
          {filteredDepenses.map((depense, index) => (
            <div key={depense.id} className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-4 hover:shadow-2xl transition-all duration-300">
              {/* En-tête de la card */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200/30 dark:border-gray-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    <ArrowDown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {depense.auteur}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {depense.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">
                    -{formate(depense.montant)} GNF
                  </div>
                </div>
              </div>

              {/* Détails */}
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cause:</span>
                  <p className="text-gray-900 dark:text-white font-medium">{depense.cause}</p>
                </div>
                {depense.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{depense.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
      )}
    </div>
  );
}

// ==========================================================
// Composant 5 : TransactionsTable (Tableau des transactions)
// ==========================================================
function TransactionsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Calculer les tranches actives (qui ont au moins un paiement)
  const activeTranches = [];
  for (let i = 1; i <= 9; i++) {
    const hasPayment = data.some(eleve => eleve[`tranche${i}`] > 0);
    if (hasPayment) {
      activeTranches.push(i);
    }
  }

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
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes</option>
              <option value="paid">Payés</option>
              <option value="unpaid">En attente</option>
            </select>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredData.length} résultats
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
        {/* Vue Desktop */}
        <div className="hidden lg:block backdrop-blur-md bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{minWidth: '700px'}}>
              <colgroup>
                <col style={{width: '60px'}} />
                <col style={{width: '100px'}} />
                <col style={{minWidth: '150px'}} />
                {activeTranches.map(() => <col key={Math.random()} style={{width: '50px'}} />)}
                <col style={{width: '120px'}} />
              </colgroup>
              <thead className="bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 dark:from-blue-800/40 dark:via-indigo-800/40 dark:to-purple-800/40">
                <tr>
                  <th className="px-4 py-5 text-left font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>N°</span>
                    </div>
                  </th>
                  <th className="px-4 py-5 text-left font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Date</span>
                    </div>
                  </th>
                  <th className="px-4 py-5 text-left font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Nom & Prénom</span>
                    </div>
                  </th>
                  {activeTranches.map(num => (
                    <th key={num} className="px-3 py-5 text-center font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-200/50 dark:border-blue-700/50">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{num}</div>
                        <span className="text-xs">T{num}</span>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-5 text-right font-bold text-gray-800 dark:text-gray-200 border-b-2 border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center justify-end gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>Total</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((eleve, index) => {
                  const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4 + eleve.tranche5 + eleve.tranche6 + eleve.tranche7 + eleve.tranche8 + eleve.tranche9;
                  
                  return (
                    <tr key={index} className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 border-b border-gray-200/30 dark:border-gray-700/30 hover:shadow-lg">
                      <td className="px-4 py-5 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                            {eleve.Numero}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-left">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{eleve.date}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-left">
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                          {eleve["Nom Complet"]}
                        </div>
                      </td>
                      {activeTranches.map(num => {
                        const tranche = eleve[`tranche${num}`];
                        return (
                          <td key={num} className="px-3 py-5 text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                              tranche > 0 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                              {tranche > 0 ? '✓' : '×'}
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-4 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg">
                            {formate(totalPaye)} GNF
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vue Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((eleve, index) => {
            const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4 + eleve.tranche5 + eleve.tranche6 + eleve.tranche7 + eleve.tranche8 + eleve.tranche9;
            
            return (
              <div key={index} className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-6">
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

                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Détail des paiements</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    {activeTranches.map(num => {
                      const tranche = eleve[`tranche${num}`];
                      return (
                        <div key={num} className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                          <span className="text-gray-600 dark:text-gray-400">T{num}</span>
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                              tranche > 0 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            }`}>
                              {tranche > 0 ? '✓' : '×'}
                            </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

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
      {/* Header moderne */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 lg:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative z-10">
          <h1 className="text-white text-3xl lg:text-5xl font-bold mb-4 text-gradient">Tableau de bord</h1>
          <p className="text-slate-300 text-lg lg:text-xl">Gestion financière intelligente</p>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} Icon={stat.icon} />
        ))}
      </div>
      
      {/* Actions rapides */}
      {/* <div className="card-modern p-6">
        <h3 className="text-white text-lg font-semibold mb-6">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="btn-primary p-4 flex flex-col items-center gap-3 group">
            <Wallet className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Ajouter</span>
          </button>
          <button className="btn-secondary p-4 flex flex-col items-center gap-3 group">
            <BarChartBig className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Rapport</span>
          </button>
          <button className="btn-secondary p-4 flex flex-col items-center gap-3 group">
            <Settings className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Réglages</span>
          </button>
          <button className="btn-secondary p-4 flex flex-col items-center gap-3 group">
            <ReceiptText className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Historique</span>
          </button>
        </div>
      </div> */}
    </div>
  );
}

// ==========================================================
// Composant Principal : App
// ==========================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customStyles = `
    * {
      scrollbar-width: thin;
      scrollbar-color: #4f46e5 #1f2937;
    }
    
    *::-webkit-scrollbar {
      width: 6px;
    }
    
    *::-webkit-scrollbar-track {
      background: #1f2937;
    }
    
    *::-webkit-scrollbar-thumb {
      background: #4f46e5;
      border-radius: 3px;
    }

    .card-modern {
      background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 1.5rem;
      backdrop-filter: blur(20px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.05);
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 0.75rem;
      color: white;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
    }

    .btn-secondary {
      background: rgba(30, 41, 59, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 0.75rem;
      color: #e2e8f0;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .btn-secondary:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.5);
      transform: translateY(-1px);
    }

    .glass-nav {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(99, 102, 241, 0.2);
    }

    .shadow-card {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    }
    
    .shadow-glow {
      box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), 0 10px 40px rgba(0, 0, 0, 0.15);
    }

    .text-gradient {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .particle {
      position: absolute;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(60px);
      animation: float 20s ease-in-out infinite;
      z-index: 0;
    }
    
    .p1 { top: 10%; left: 10%; animation-delay: 0s; }
    .p2 { top: 60%; right: 10%; animation-delay: 7s; }
    .p3 { bottom: 10%; left: 20%; animation-delay: 14s; }
    .p4 { top: 30%; right: 30%; animation-delay: 21s; }

    .animate-pulse-slow {
      animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-4px);
    }
  `;

  return (
    <div className={`relative min-h-screen font-inter bg-slate-900 text-white`}> 
      
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>
      <div className="particle p4"></div>
      
      <div className="flex min-h-screen font-inter relative z-10">
        <div className="flex-1 flex flex-col">
            <header className='lg:hidden flex justify-between items-center w-full p-4 glass-nav sticky top-0 z-20 border-b border-primary-800/50'>
                <h1 className="text-dark-text text-xl font-semibold">
                    {NAV_LINKS.find(link => link.key === currentPage)?.label || 'Budget Classe'}
                </h1>
                <button className='text-dark-text-secondary hover:text-primary' onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className='w-6 h-6'/>
                </button>
            </header>

            <main className="flex-1 justify-between items-center px-4 py-6 sm:px-6 lg:px-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <DashboardView />
                    <div className="mt-8 space-y-8">
                        <Charts />
                        <TransactionsTable />
                        <AutreRevenueTable />
                        <DepensesTable />
                    </div>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}