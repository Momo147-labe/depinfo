import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  MoreHorizontal,
} from 'lucide-react';
import data from "../data/paiements.json"
const getCategoryClasses = (categoryColor) => {
  switch (categoryColor) {
    case 2: return 'bg-primary-900/70 text-primary-300';
    case 1: return 'bg-green-900/70 text-green-300';
    case 3: return 'bg-indigo-900/70 text-indigo-300';
    case 4: return 'bg-orange-900/70 text-orange-300';
    default: return 'bg-gray-700/70 text-gray-300';
  }
};

const getAmountClasses = (amount) => amount.startsWith('+') ? 'text-green-400' : 'text-red-400';

const TRANSACTIONS_DATA = [
  { date: '15 Juin 2024', description: 'Licence Adobe Creative Cloud', category: 'Logiciels', categoryColor: 'blue', amount: '-€239.88' },
  { date: '12 Juin 2024', description: 'Subvention Régionale', category: 'Revenu', categoryColor: 'green', amount: '+€1,500.00' },
  { date: '10 Juin 2024', description: 'Achat de 5 souris ergonomiques', category: 'Matériel', categoryColor: 'indigo', amount: '-€345.50' },
  { date: '05 Juin 2024', description: 'Sortie au musée de la tech', category: 'Sorties', categoryColor: 'orange', amount: '-€150.00' },
  { date: '02 Juin 2024', description: 'Vente de gâteaux', category: 'Revenu', categoryColor: 'green', amount: '+€85.30' },
  { date: '28 Mai 2024', description: 'Remboursement de frais de transport', category: 'Revenu', categoryColor: 'green', amount: '+€45.00' },
  { date: '25 Mai 2024', description: 'Abonnement service de messagerie', category: 'Logiciels', categoryColor: 'blue', amount: '-€12.99' },
  { date: '20 Mai 2024', description: 'Achat de papeterie', category: 'Fournitures', categoryColor: 'gray', amount: '-€35.00' },
];


export default function TransactionsListView() {

  const [filterType, setFilterType] = useState('all');
  
  function formate(n){
  return Number(n).toLocaleString("fr-FR")
}

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-dark-text text-3xl md:text-4xl font-extrabold leading-tight">Liste des paiements</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 px-4 py-3">
        {/* SearchBar */}
        <div className="w-full md:flex-1">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
            <div className="text-dark-text-secondary flex bg-primary-900/40 items-center justify-center pl-4 rounded-l-lg border-r-0">
              <Search className='w-5 h-5'/>
            </div>
            <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-dark-text focus:outline-0 focus:ring-2 focus:ring-primary-400/50 border-none bg-primary-900/40 h-full placeholder:text-dark-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
                placeholder="Rechercher par description, catégorie..." 
                type='text'
            />
          </div>
        </div>
        
        {/* Date/Sort Buttons (Hidden on mobile for simplification) */}
        <div className="hidden md:flex items-center gap-2">
          <button className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg bg-primary-900/40 text-dark-text text-sm hover:bg-primary-900/60 transition-colors">
            <Calendar className='w-5 h-5'/>
            <span>Ce mois-ci</span>
            <ChevronDown className='w-4 h-4'/>
          </button>
          <button className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg bg-primary-900/40 text-dark-text text-sm hover:bg-primary-900/60 transition-colors">
            <ChevronDown className='w-4 h-4 rotate-180'/>
            <span>Trier par</span>
            <ChevronDown className='w-4 h-4'/>
          </button>
        </div>
      </div>
      
      {/* Segmented Buttons for Transaction Type */}
      <div className="flex px-4 py-3">
        <div className="flex h-10 w-full md:w-auto items-center justify-center rounded-lg bg-primary-900/40 p-1">
          {['all', 'spent', 'received'].map((type) => (
            <label key={type} className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-primary-900/70 has-[:checked]:shadow-sm has-[:checked]:text-dark-text text-dark-text-secondary text-sm font-medium leading-normal transition-colors"
                onClick={() => { setFilterType(type); setCurrentPage(1); }}>
              <span className="truncate">
                {type === 'all' ? 'Tous' : type === 'spent' ? 'Dépenses' : 'Revenus'}
              </span>
              <input 
                checked={filterType === type} 
                className="invisible w-0" 
                name="transaction-type" 
                type="radio" 
                readOnly
              />
            </label>
          ))}
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="px-4 py-3">
        <div className="overflow-x-auto rounded-lg border border-primary-900/50 card-modern p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-900/40 text-xs uppercase text-dark-text-secondary">
              <tr>
                <th className="px-6 py-3 font-medium" scope="col">N°</th>
                <th className="px-6 py-3 font-medium" scope="col">Date</th>
                <th className="px-6 py-3 font-medium" scope="col">Nom complet</th>
                <th className="px-6 py-3 font-medium" scope="col">Tranche</th>
                <th className="px-6 py-3 font-medium text-right" scope="col">Montant</th>
                <th className="px-6 py-3 font-medium text-right sr-only" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((transaction, index) => (
                <tr key={index} className="border-b border-primary-900/30 last:border-b-0 hover:bg-primary-900/20 transition-colors">
                  <td className="px-6 py-4 text-dark-text-secondary">{transaction.Numero}</td>
                   <td className="px-6 py-4 text-dark-text-secondary">{transaction.date}</td>
                  <td className="px-6 py-4 font-medium text-dark-text">{transaction["Nom Complet"]}</td>
                  <td className="px-6 py-4">
                    <span className={`${getCategoryClasses(transaction.tranche)} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>
                      {transaction.tranche}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold`}>
                    {formate(transaction.montant)} GNF
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-full hover:bg-primary-900/40 text-dark-text-secondary">
                      <MoreHorizontal className='w-5 h-5'/>
                    </button>
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                  <tr>
                      <td colSpan="5" className="py-8 text-center text-dark-text-secondary">Aucune transaction trouvée pour ce filtre.</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <nav aria-label="Table navigation" className="flex flex-wrap items-center justify-between p-4 gap-4">
        <span className="text-sm font-normal text-dark-text-secondary">
          Affichage de <span className="font-semibold text-dark-text">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, data.length)}</span> sur <span className="font-semibold text-dark-text">{data.length}</span>
        </span>
        <div className="inline-flex -space-x-px text-sm h-8">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight rounded-s-lg border border-primary-800/50 transition-colors
              ${currentPage === 1 
                ? 'text-dark-text-secondary/50 bg-primary-900/10 cursor-not-allowed' 
                : 'text-dark-text hover:bg-primary-900/40 bg-primary-900/20'
              }`}
          >
            Précédent
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`hidden sm:flex items-center justify-center px-3 h-8 leading-tight border border-primary-800/50 transition-colors
                  ${currentPage === index + 1
                    ? 'text-white bg-primary-500 hover:bg-primary-600'
                    : 'text-dark-text hover:bg-primary-900/40 bg-primary-900/20'
                  }`}
            >
                {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`flex items-center justify-center px-3 h-8 leading-tight rounded-e-lg border border-primary-800/50 transition-colors
              ${currentPage === totalPages || totalPages === 0
                ? 'text-dark-text-secondary/50 bg-primary-900/10 cursor-not-allowed' 
                : 'text-dark-text hover:bg-primary-900/40 bg-primary-900/20'
              }`}
          >
            Suivant
          </button>
        </div>
      </nav>
    </div>
  );
}