import { useState } from "react";
import { 
  Search, 
  Filter, 
  Users, 
  GraduationCap, 
  MapPin, 
  Calendar,
  Grid3X3,
  List,
  SortAsc
} from 'lucide-react';
import info from "../data/information.json";
import ProfilCard from "../components/ProfilCard";

export default function Etudiant() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // Filtrer et trier les étudiants
  const filteredStudents = info
    .filter(student => {
      const matchSearch = searchTerm === '' || 
        student.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricule?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchClass = filterClass === 'all' || student.classe === filterClass;
      
      return matchSearch && matchClass;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.nom} ${a.prenom}`.localeCompare(`${b.nom} ${b.prenom}`);
        case 'matricule':
          return a.matricule?.localeCompare(b.matricule) || 0;
        case 'classe':
          return a.classe?.localeCompare(b.classe) || 0;
        default:
          return 0;
      }
    });

  // Obtenir les classes uniques
  const uniqueClasses = [...new Set(info.map(student => student.classe).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Annuaire des Étudiants
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Découvrez tous les étudiants de la faculté d'informatique
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-md bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-gray-700/30">
            <Users className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <div className="text-2xl font-bold text-white mb-1">
              {info.length}
            </div>
            <div className="text-sm text-gray-400">
              Étudiants
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-gray-700/30">
            <GraduationCap className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <div className="text-2xl font-bold text-white mb-1">
              {uniqueClasses.length}
            </div>
            <div className="text-sm text-gray-400">
              Groupes
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-gray-700/30">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <div className="text-2xl font-bold text-white mb-1">
              L2
            </div>
            <div className="text-sm text-gray-400">
              Niveau
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-gray-700/30">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-orange-500" />
            <div className="text-2xl font-bold text-white mb-1">
              Info
            </div>
            <div className="text-sm text-gray-400">
              Faculté
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="backdrop-blur-md bg-gray-800/70 p-6 rounded-2xl shadow-xl border border-gray-700/30">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-gray-700/50 border border-gray-600/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Class Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="p-3 rounded-xl backdrop-blur-sm bg-gray-700/50 border border-gray-600/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              >
                <option value="all">Tous les groupes</option>
                {uniqueClasses.map(classe => (
                  <option key={classe} value={classe}>{classe}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SortAsc className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 rounded-xl backdrop-blur-sm bg-gray-700/50 border border-gray-600/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              >
                <option value="name">Nom</option>
                <option value="matricule">Matricule</option>
                <option value="classe">Groupe</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-gray-600'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Results Count */}
            <div className="text-sm font-medium text-gray-400">
              {filteredStudents.length} résultat{filteredStudents.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Students Grid/List */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Aucun étudiant trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredStudents.map((user, index) => (
              <div 
                key={index} 
                className={`${
                  viewMode === 'list' 
                    ? 'backdrop-blur-md bg-gray-800/70 rounded-2xl shadow-xl border border-gray-700/30 hover:shadow-2xl transition-all duration-300' 
                    : ''
                }`}
              >
                {viewMode === 'grid' ? (
                  <ProfilCard data={user} />
                ) : (
                  <div className="p-6 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {user.nom?.[0]}{user.prenom?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">
                        {user.nom} {user.prenom}
                      </h3>
                      <p className="text-gray-400">
                        {user.matricule} • {user.classe}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                        {user.classe}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}