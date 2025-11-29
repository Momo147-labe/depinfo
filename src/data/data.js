const data = {
  langages: [
    { titre: "HTML/CSS", annee: "2 ans", logo: "/htmlcss.jpg",niveau:"intermediaire" },
    { titre: "JavaScript", annee: "2 ans", logo: "/javascript.jpg" ,niveau:"intermediaire"},
    { titre: "TypeScript", annee: "1 an", logo: "/typescript.jpg" ,niveau:"debutant"},
    { titre: "ReactJS", annee: "2 ans", logo: "/reactjs.jpg" ,niveau:"intermdebutantediaire"},
    { titre: "React Native", annee: "2 ans", logo: "/reactNative.jpg" ,niveau:"debutant"},
    { titre: "NodeJS", annee: "2 ans", logo: "/nodejs.jpg", nbreProjet: 2 ,niveau:"intermediaire"},
    { titre: "Supabase", annee: "1 an", logo: "/supabase.jpg", nbreProjet: 1 ,niveau:"debutant"},
    { titre: "MongoDB", annee: "2 ans", logo: "/mongodb.jpg", nbreProjet: 3 ,niveau:"intermediaire"},
    { titre: "MySQL", annee: "1 an", logo: "/mysql.jpg", nbreProjet: 3 ,niveau:"intermediaire"},
    { titre: "SQLite", annee: "1 an", logo: "/sqlite.jpg", nbreProjet: 2 ,niveau:"debutant"},
    { titre: "Langage C", annee: "1 an", logo: "/langageC.jpg", nbreProjet: 2 ,niveau:"debutant"},
  ],
  formation:[
     {
      date:"Session 2024 / Établi le 23/07/2024 / Fait à Conakry, le 25/07/2024",
      titre:"Diplôme de Bachelier du second Degré",
      organisateur:"MINISTERE DE L'ENSEIGNEMENT PRÉ-UNIVERSITAIRE ET DE L'ALPHABETISATION / Direction Générale des Examens et Contrôle Scolaire",
      description:"Obtenu dans le profil SCIENCES MATHÉMATIQUES avec la mention ASSEZ BIEN.",
      certificat:"/certificat/bacdevant.jpg"
     },
      {
      date:"S'est déroulée du 16 au 17 mai 2025",
      titre:"Certificat de formation",
      organisateur:"Université de Labé (mentionnée sur le certificat) et CJP (Club des Jeunes Informaticiens)",
      description:"Formation intitulée : Comment protéger son Réseaux LAN avec un pare-feu",
      certificat:"/certificat/cjp1.jpg"
     },
      {
      date:"Date d'obtention : 21 NOV. 2025",
      titre:"CERTIFICATION JAVASCRIPT",
      organisateur:"CodinGame Filiale de : CoderPad Signé par : Frédéric Desmoulins, CEO de CodinGame",
      description:"Ce document atteste que Fode Momo Soumah a validé ses compétences en résolution de problèmes avec JavaScript. Il s'agit d'une certification délivrée par CodinGame.",
      certificat:"/certificat/codingame.png"
     },
      {
      date:"Date d'obtention : 22 NOV. 2025",
      titre:"CERTIFICATION PYTHON 3",
      organisateur:"CodinGame Filiale de : CoderPad Signé par : Frédéric Desmoulins, CEO de CodinGame",
      description:"Ce document atteste que Fode Momo Soumah a validé ses compétences en résolution de problèmes avec python 3. Il s'agit d'une certification délivrée par CodinGame.",
      certificat:"/certificat/python.png"
     },
   ],
  info: {
    nom: "Soumah",
    prenom: "Fodé Momo",
    email: "fodemomos11@gmail.com",
    phone: ["627172530", "666761076"],
    adresse: "Labé (Hafia)",
    description:"Je suis étudiant en Licence 2 Informatique à l’Université de Labé, en Guinée Conakry. Passionné par le développement web et mobile, j’ai construit mon parcours autour des technologies modernes comme React, React Native (Expo), Node.js, ainsi que des bases de données telles que MongoDB, SQLite, MySQL et plus récemment Supabase / PostgreSQL.Au fil de ma formation, j’ai développé des compétences en algorithme, langage C, UML, probabilité et statistique, ainsi qu’en maintenance informatique.Mon objectif est de créer des solutions numériques performantes, intuitives et accessibles, tout en continuant à apprendre et à évoluer dans le domaine des technologies.",
    profile: "/momo.png",
  },
  projets: [
    {
      titre: "Gestion de l'école",
      langage: {
        frontend: ["ReactJS", "TailwindCSS"],
        backend: ["NodeJS", "Express"],
        baseDonnees: "MongoDB",
      },
      lien: "https://eliteschool.onrender.com/",
      equipe: "Seul",
      isActive: true,
    },
    {
      titre: "ClassMate",
      langage: {
        frontend: "React Native",
        backend: ["NodeJS", "Express"],
        baseDonnees: "SQLite",
      },
      lien: "https://classmate.onrender.com/",
      equipe: "Seul",
      isActive: true,
    },
  ],
};

export default data;
