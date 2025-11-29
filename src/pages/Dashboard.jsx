import React, { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/promo1.jpg",
    text: "Bienvenue au département informatique – Licence 2",
  },
  {
    image: "/images/promo2.jpg",
    text: "Travail d'équipe, innovation et excellence",
  },
  {
    image: "/images/promo3.jpg",
    text: "Suivez vos cours, ressources et activités",
  },
];

export default function Dashboard() {
  const [index, setIndex] = useState(0);

  // Défilement automatique toutes les 4 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-padding container-custom">

      {/* 🔥 CAROUSEL */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden glass-card shadow-card animate-fade-in">
        
        {/* Image */}
        <img
          src={slides[index].image}
          alt="slider"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/40 to-transparent" />

        {/* Texte du message */}
        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="text-xl md:text-2xl font-bold text-dark-text animate-slide-up">
            {slides[index].text}
          </h2>
        </div>

        {/* Points du slider */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-primary-400" : "bg-gray-400/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🔽 CONTENU DU TABLEAU DE BORD */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">

        {/* Carte 1 */}
        <div className="card-modern hover:shadow-card-hover animate-float">
          <h3 className="text-xl font-semibold text-primary-300">Cours</h3>
          <p className="text-dark-text-secondary mt-2">
            Accédez aux cours, documents et supports des professeurs.
          </p>
        </div>

        {/* Carte 2 */}
        <div className="card-modern hover:shadow-card-hover animate-float">
          <h3 className="text-xl font-semibold text-primary-300">Ressources</h3>
          <p className="text-dark-text-secondary mt-2">
            Téléchargez les exercices, PDF, slides et polycopiés.
          </p>
        </div>

        {/* Carte 3 */}
        <div className="card-modern hover:shadow-card-hover animate-float">
          <h3 className="text-xl font-semibold text-primary-300">Communauté</h3>
          <p className="text-dark-text-secondary mt-2">
            Discutez, partagez des infos ou posez des questions en classe.
          </p>
        </div>

      </div>

    </div>
  );
}
