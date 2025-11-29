import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import data from "../data/data";

const Projets = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="container-custom">
        <AnimatedSection>
          {/* En-tête de section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mes <span className="text-gradient">Projets</span>
            </h2>
            <p className="text-dark-text-secondary text-lg max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations, alliant créativité et expertise technique
            </p>
          </motion.div>

          {/* Grille des projets */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.projets.map((projet, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="card-modern group cursor-pointer"
                aria-labelledby={`proj-${index}-title`}
              >
                {/* Header de la carte */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-primary-400 bg-primary-400/10 px-3 py-1 rounded-full">
                    {projet.equipe}
                  </span>
                </div>

                {/* Titre et description */}
                <h3 id={`proj-${index}-title`} className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors duration-300">
                  {projet.titre}
                </h3>

                {/* Technologies */}
                <div className="space-y-3 mb-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
                      Frontend
                    </span>
                    {(Array.isArray(projet.langage.frontend) 
                      ? projet.langage.frontend 
                      : [projet.langage.frontend]
                    ).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-md">
                      Backend
                    </span>
                    {(Array.isArray(projet.langage.backend) 
                      ? projet.langage.backend 
                      : [projet.langage.backend]
                    ).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-2 py-1 rounded-md">
                      Database
                    </span>
                    <span className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                      {projet.langage.baseDonnees}
                    </span>
                  </div>
                </div>

                {/* Bouton d'action */}
                <a 
                  href={projet.lien} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-white transition-colors duration-300 group/link"
                >
                  <span>Voir le projet</span>
                  <svg 
                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Projets;
