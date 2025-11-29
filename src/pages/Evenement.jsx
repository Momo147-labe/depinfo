import { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Filter,
  ChevronRight,
  Star,
  BookOpen,
  Presentation,
  Trophy,
  Coffee,
  Briefcase
} from 'lucide-react';
import eventsData from '../data/evenements.json';

const eventTypes = [
  { id: 'all', label: 'Tous les événements', color: 'bg-gray-500' },
  { id: 'conference', label: 'Conférences', color: 'bg-blue-500' },
  { id: 'workshop', label: 'Ateliers', color: 'bg-green-500' },
  { id: 'competition', label: 'Concours', color: 'bg-purple-500' },
  { id: 'social', label: 'Événements sociaux', color: 'bg-orange-500' },
  { id: 'career', label: 'Orientation carrière', color: 'bg-red-500' }
];



const getEventIcon = (type) => {
  switch (type) {
    case 'conference': return Presentation;
    case 'workshop': return BookOpen;
    case 'competition': return Trophy;
    case 'social': return Coffee;
    case 'career': return Briefcase;
    default: return Calendar;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function Evenement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const filteredEvents = eventsData.filter(event => {
    const matchSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchType = filterType === 'all' || event.type === filterType;
    
    return matchSearch && matchType;
  });

  const featuredEvents = eventsData.filter(event => event.featured);
  const upcomingEvents = eventsData.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Événements Universitaires
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Découvrez tous les événements de la faculté d'informatique
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-white/20">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {eventsData.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Événements
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-white/20">
            <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {featuredEvents.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              À la une
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-white/20">
            <Users className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {eventsData.reduce((sum, event) => sum + event.attendees, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Participants
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl p-6 text-center shadow-xl border border-white/20">
            <Presentation className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {eventTypes.length - 1}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Catégories
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-xl border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un événement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 border border-white/30 dark:border-gray-600/30 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              >
                {eventTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Événements à la une
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => {
                const EventIcon = getEventIcon(event.type);
                const eventTypeInfo = eventTypes.find(t => t.id === event.type);
                
                return (
                  <div key={event.id} className="group relative backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                        <Star className="w-3 h-3 mr-1" />
                        À la une
                      </span>
                    </div>

                    {/* Event Image */}
                    <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${eventTypeInfo?.color}`}>
                          <EventIcon className="w-3 h-3 mr-1" />
                          {eventTypeInfo?.label}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.maxAttendees} participants</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 group-hover:scale-105">
                        S'inscrire
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tous les événements
          </h2>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Aucun événement trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const EventIcon = getEventIcon(event.type);
                const eventTypeInfo = eventTypes.find(t => t.id === event.type);
                
                return (
                  <div key={event.id} className="group backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    
                    {/* Event Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${eventTypeInfo?.color}`}>
                          <EventIcon className="w-3 h-3 mr-1" />
                          {eventTypeInfo?.label}
                        </span>
                        {event.featured && (
                          <Star className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Details */}
                    <div className="px-6 pb-6">
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.maxAttendees} participants</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Places disponibles</span>
                          <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className="w-full inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 font-semibold border border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                        Voir les détails
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}