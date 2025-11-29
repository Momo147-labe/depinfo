import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Github,
  Globe,
  Instagram,
  User
} from "lucide-react";

export default function ProfilCard({ data }) {

  // Associer icônes et liens
  const mapContact = (key, value) => {
    const icons = {
      facebook: { icon: <Facebook size={22} />, link: "https://" + value },
      linkedin: { icon: <Linkedin size={22} />, link: "https://" + value },
      github: { icon: <Github size={22} />, link: "https://" + value },
      tiktok: { icon: <Instagram size={22} />, link: "https://" + value },
      portfolio: { icon: <Globe size={22} />, link: "https://" + value },
      email: { icon: <Mail size={22} />, link: "mailto:" + value },
      telephone: { icon: <Phone size={22} />, link: "tel:" + value[0] },
    };

    return icons[key] || { icon: <User />, link: "#" };
  };

  return (
    <div className="
      glass-card 
      rounded-xl 
      shadow-card 
      p-6 
      text-dark-text 
      animate-fade-in 
      transition 
      hover:shadow-card-hover
      border border-primary-900/10
    ">
      
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <img
          src={data.profil}
          alt="profil"
          className="
            w-32 h-32 
            rounded-full 
            border-4 border-primary-500/30 
            shadow-glow 
            object-cover
            animate-float
          "
        />

        <h2 className="mt-4 text-2xl font-bold text-gradient">
          {data.prenom} {data.nom}
        </h2>

        {/* Spécialités */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {data.specialite.map((s, i) => (
            <span
              key={i}
              className="
                px-3 py-1 
                rounded-full 
                text-xs 
                bg-primary-500/10 
                text-primary-300 
                border border-primary-500/20
              "
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Réseaux sociaux icônes seulement */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {data.contact.map((item, i) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          const { icon, link } = mapContact(key, value);

          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-3 
                rounded-full 
                bg-primary-500/10 
                hover:bg-primary-500/20 
                transition 
                border border-primary-500/10
                shadow-inner-glow
              "
            >
              {icon}
            </a>
          );
        })}
      </div>

      {/* Compétences */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-primary-300 mb-3">Compétences</h3>

        <div className="space-y-4">
          {data.competence.map((comp, i) => {
            const key = Object.keys(comp)[0];
            const values = comp[key];

            return (
              <div key={i}>
                <p className="font-bold text-sm text-primary-100 uppercase tracking-wide">
                  {key}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {values.map((val, index) => (
                    <span
                      key={index}
                      className="
                        px-2 py-1 
                        bg-dark-surface 
                        rounded-md 
                        text-xs 
                        border border-primary-500/15
                        text-dark-text-secondary
                      "
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

    </div>
  );
}
