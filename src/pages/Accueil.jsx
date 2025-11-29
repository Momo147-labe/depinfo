import { useEffect, useState } from "react";
import { 
  BookOpen, 
  Download, 
  Users, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  Play
} from 'lucide-react';

const slides = [
  {
    image: "/dep.png",
    title: "Faculté d'Informatique",
    subtitle: "Licence 2 - Excellence Académique",
    description: "Formez-vous aux technologies de demain avec nos programmes universitaires innovants"
  },
  {
    image: "/images/promo2.jpg",
    title: "Innovation & Collaboration",
    subtitle: "Travail d'équipe et projets concrets",
    description: "Développez vos compétences à travers des projets universitaires collaboratifs"
  },
  {
    image: "/images/promo3.jpg",
    title: "Plateforme Étudiante",
    subtitle: "Cours, ressources et communauté",
    description: "Accédez à tous vos outils d'apprentissage universitaire en un seul endroit"
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Cours Interactifs",
    description: "Accédez aux cours, documents et supports pédagogiques de vos enseignants-chercheurs",
    color: "from-blue-500 to-indigo-600",
    stats: "25+ Cours"
  },
  {
    icon: Download,
    title: "Ressources Complètes",
    description: "Téléchargez exercices, PDF, slides et polycopiés pour vos études universitaires",
    color: "from-green-500 to-emerald-600",
    stats: "150+ Fichiers"
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Échangez, partagez et collaborez avec vos collègues étudiants",
    color: "from-purple-500 to-pink-600",
    stats: "62 Étudiants"
  }
];

const quickStats = [
  { icon: GraduationCap, label: "Étudiants", value: "62", color: "text-blue-500" },
  { icon: Calendar, label: "Semestre", value: "S4", color: "text-green-500" },
  { icon: TrendingUp, label: "Progression", value: "85%", color: "text-purple-500" },
  { icon: Award, label: "Projets", value: "12", color: "text-orange-500" }
];

export default function Accueil() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section avec Carousel */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={slides[index].image}
            alt="Hero"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 backdrop-blur-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Année Académique 2024-2025
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {slides[index].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-200 mb-4 font-medium">
                {slides[index].subtitle}
              </p>
              
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                {slides[index].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Commencer
                </button>
                <button className="inline-flex items-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-sm transition-all duration-300 border border-white/20">
                  En savoir plus
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index 
                  ? "bg-white scale-125" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="backdrop-blur-md bg-gray-800/80 rounded-2xl p-6 text-center shadow-xl border border-gray-700/30 hover:scale-105 transition-transform duration-300">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Votre Plateforme d'Apprentissage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez tous les outils et ressources nécessaires pour réussir votre parcours universitaire
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="backdrop-blur-md bg-gray-800/70 rounded-2xl p-8 shadow-xl border border-gray-700/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  
                  {/* Icon with Gradient */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {feature.title}
                      </h3>
                      <span className="text-sm font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded-lg">
                        {feature.stats}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <button className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group-hover:translate-x-1">
                    Explorer
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez notre communauté universitaire et accédez à tous vos outils d'apprentissage
          </p>
          <button className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
            <GraduationCap className="w-6 h-6 mr-2" />
            Accéder à la plateforme
          </button>
        </div>
      </div>
    </div>
  );
}