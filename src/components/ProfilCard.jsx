import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Github,
  Globe,
  Instagram,
  User,
  MapPin,
  GraduationCap,
  Star,
  Award
} from "lucide-react";

export default function ProfilCard({ data }) {

  // Associer icônes et liens
  const mapContact = (key, value) => {
    const icons = {
      facebook: { icon: <Facebook size={18} />, link: "https://" + value, color: "text-blue-500 hover:text-blue-600" },
      linkedin: { icon: <Linkedin size={18} />, link: "https://" + value, color: "text-blue-600 hover:text-blue-700" },
      github: { icon: <Github size={18} />, link: "https://" + value, color: "text-gray-300 hover:text-white" },
      tiktok: { icon: <Instagram size={18} />, link: "https://" + value, color: "text-pink-500 hover:text-pink-600" },
      portfolio: { icon: <Globe size={18} />, link: "https://" + value, color: "text-green-500 hover:text-green-600" },
      email: { icon: <Mail size={18} />, link: "mailto:" + value, color: "text-red-500 hover:text-red-600" },
      telephone: { icon: <Phone size={18} />, link: "tel:" + value[0], color: "text-purple-500 hover:text-purple-600" },
    };

    return icons[key] || { icon: <User size={18} />, link: "#", color: "text-gray-500" };
  };

  return (
    <div className="group relative backdrop-blur-md bg-gray-800/70 rounded-2xl shadow-xl border border-gray-700/30 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        
        {/* Header avec photo et infos principales */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src={data.profil}
              alt="profil"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>

          <h2 className="mt-4 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {data.prenom} {data.nom}
          </h2>

          {/* Matricule et classe */}
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-400">
            <GraduationCap className="w-4 h-4" />
            <span>{data.matricule}</span>
            {data.classe && (
              <>
                <span>•</span>
                <span className="px-2 py-1 rounded-full bg-blue-900/30 text-blue-300 text-xs font-medium">
                  {data.classe}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Spécialités */}
        {data.specialite && data.specialite.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-gray-300">Spécialités</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.specialite.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-900/30 to-pink-900/30 text-purple-300 border border-purple-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Réseaux sociaux */}
        {data.contact && data.contact.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {data.contact.map((item, i) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                const { icon, link, color } = mapContact(key, value);

                return (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-all duration-300 hover:scale-110 shadow-sm ${color}`}
                    title={key}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Compétences */}
        {data.competence && data.competence.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-gray-300">Compétences</h3>
            </div>

            <div className="space-y-3">
              {data.competence.map((comp, i) => {
                const key = Object.keys(comp)[0];
                const values = comp[key];

                return (
                  <div key={i} className="bg-gray-700/30 rounded-lg p-3">
                    <p className="font-medium text-xs text-gray-400 uppercase tracking-wide mb-2">
                      {key}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {values.map((val, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-600 rounded-md text-xs text-gray-300 border border-gray-500 hover:bg-blue-900/30 transition-colors"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer avec action */}
        <div className="mt-6 pt-4 border-t border-gray-600/50">
          <button className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg">
            Voir le profil
          </button>
        </div>
      </div>
    </div>
  );
}