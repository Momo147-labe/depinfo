import { useState } from 'react';
import data from "../data/paiements.json"
import info from "../data/information.json"
import depenses from "../data/depenses.json"
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
const totalDepenses = depenses.reduce((total, depense) => total + depense.montant, 0)
const soldeActuel = somme - totalDepenses
const tail=info.length

const NAV_LINKS = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { key: 'transactions', icon: ReceiptText, label: 'Transactions' },
  { key: 'reports', icon: BarChartBig, label: 'Rapports' },
  { key: 'settings', icon: Settings, label: 'Paramètres' },
];

const STATS_DATA = [
  { title: 'Solde Actuel', value: `${formate(soldeActuel)} GNF`, change: `${soldeActuel >= 0 ? '+' : ''}${((soldeActuel/somme)*100).toFixed(1)}%`, color: soldeActuel >= 0 ? 'text-green-400' : 'text-red-400', icon: Wallet },
  { title: 'Revenus totaux', value: `${formate(somme)} GNF`, change: `${data.length} paiements`, color: 'text-green-400', icon: ArrowUp },
  { title: 'Dépenses totales', value: `${formate(totalDepenses)} GNF`, change: `${depenses.length} transactions`, color: 'text-red-400', icon: ArrowDown },
  { title: 'Montant brut', value: `${formate(somme)} GNF`, change: 'Sans déduction', color: 'text-blue-400', icon: ReceiptText },
];

function formate(n){
  return Number(n).toLocaleString("fr-FR")
}

// ==========================================================
// Composant 2 : StatCard (Carte de Statistique Réutilisable)
// ==========================================================
function StatCard({ title, value, change, color, Icon }) {
  return (
    <div className="mx-auto max-w-sm sm:max-w-none card-modern p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
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
      <div className="card-modern p-6">
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
      </div>

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
// Composant 4 : DepensesTable (Tableau des dépenses)
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
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-3 sm:p-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          {/* Recherche */}
          <div className="flex-1 w-full sm:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            />
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 sm:flex-none p-2 sm:p-3 text-sm sm:text-base rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            >
              <option value="all">Toutes</option>
              <option value="paid">Payés</option>
              <option value="unpaid">En attente</option>
            </select>
          </div>

          {/* Statistiques rapides */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <ReceiptText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              <span className="font-medium">{filteredData.length}</span>
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
        <div className="hidden lg:block backdrop-blur-md bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm" style={{minWidth: '700px'}}>
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

        {/* Vue Mobile/Tablette - Cards */}
        <div className="lg:hidden space-y-3 sm:space-y-4 px-2 sm:px-0">
          {filteredData.map((eleve, index) => {
            const totalPaye = eleve.tranche1 + eleve.tranche2 + eleve.tranche3 + eleve.tranche4 + eleve.tranche5 + eleve.tranche6 + eleve.tranche7 + eleve.tranche8 + eleve.tranche9;
            
            return (
              <div key={index} className="mx-auto max-w-md sm:max-w-none backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 p-4">
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

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Détail des paiements</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {activeTranches.map(num => {
                      const tranche = eleve[`tranche${num}`];
                      return (
                        <div key={num} className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                          <span className="text-gray-600 dark:text-gray-400">T{num}</span>
                          <span className={`font-semibold ${
                            tranche > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {tranche > 0 ? `${formate(tranche)} GNF` : '-'}
                          </span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-0">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} Icon={stat.icon} />
        ))}
      </div>
      
      {/* Actions rapides - Mobile Card View */}
      <div className="card-modern p-4 sm:p-6">
        <h3 className="text-dark-text text-base sm:text-lg font-semibold mb-3 sm:mb-4">Actions rapides</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
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
// ==========================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customStyles = `
    .text-dark-text { color: #ffffff; }
    .text-dark-text-secondary { color: #92adc9; }
    .bg-dark-card { background-color: #1a2836; }
    
    .btn-primary { 
      background-color: ${COLORS.primary}; 
      color: white; 
      border-radius: 0.5rem;
      font-weight: 700;
      transition: background-color 0.2s;
    }
    .btn-primary:hover { background-color: #106fcc; }

    .btn-secondary {
      background-color: ${COLORS['dark-card']};
      color: ${COLORS['dark-text']};
      border: 1px solid #233648;
      border-radius: 0.5rem;
      font-weight: 700;
      transition: background-color 0.2s;
    }
    .btn-secondary:hover { background-color: #2a3f55; }

    .card-modern {
      background-color: #1a2836;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .glass-nav {
        background-color: rgba(26, 40, 54, 0.7);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .shadow-card {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .shadow-glow {
      box-shadow: 0 0 20px rgba(19, 127, 236, 0.4), 0 8px 32px rgba(0, 0, 0, 0.12);
    }

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

    .container-custom {
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
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

            <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
                <div className="container-custom max-w-7xl mx-auto">
                    <DashboardView />
                    <div className="mt-6 sm:mt-8">
                        <Charts />
                    </div>
                    <div className="mt-6 sm:mt-8">
                        <TransactionsTable />
                    </div>
                    <div className="mt-6 sm:mt-8">
                        <DepensesTable />
                    </div>
                </div>
            </main>
        </div>
      </div>
    </div>
  );
}