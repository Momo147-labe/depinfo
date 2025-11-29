import React from "react";
import { motion } from "framer-motion";
import { Wallet, PlusCircle, ArrowRight, PieChart } from "lucide-react";

export default function Budget() {
  return (
    <section className="container-custom py-20">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          glass-card p-8 mb-12 rounded-xl
          border border-primary-500/10 shadow-card
        "
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-dark-text">Budget</h1>
            <p className="text-dark-text-secondary">
              Outils et visualisations pour la gestion financière du département.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card 1 */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="card-modern"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dark-text">
              Suivi Global
            </h2>
            <PieChart className="w-6 h-6 text-primary-400" />
          </div>
          <p className="text-dark-text-secondary">
            Visualise les dépenses totales, les revenus et l’évolution du budget.
          </p>
          <button className="mt-5 btn-secondary flex items-center gap-2">
            Voir le tableau <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="card-modern"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dark-text">
              Ajouter une dépense
            </h2>
            <PlusCircle className="w-6 h-6 text-primary-400" />
          </div>
          <p className="text-dark-text-secondary">
            Enregistre rapidement les dépenses ou contributions des étudiants.
          </p>
          <button className="mt-5 btn-primary flex items-center gap-2">
            Ajouter <PlusCircle size={16} />
          </button>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="card-modern"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dark-text">
              Historique
            </h2>
            <Wallet className="w-6 h-6 text-primary-400" />
          </div>
          <p className="text-dark-text-secondary">
            Consulte les transactions passées ainsi que les justificatifs.
          </p>
          <button className="mt-5 btn-secondary flex items-center gap-2">
            Voir l’historique <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
