export default data ={
    langages:[
         {titre:"HTML/CSS",annee:"2 ans",logo:"./assets/html/css.jpeg"},
         {titre:"Javascript",annee:"2 ans",logo:"./assets/javascript.jpeg"},
         {titre:"Typescript",annee:"2 ans",logo:"./assets/typescritp.jpeg"},
         {titre:"Reactjs",annee:"2 ans",logo:"./assets/reactjs.jpeg"},
         {titre:"React Native",annee:"2 ans",logo:"./assets/reacjNative.jpeg"},
         {titre:"Langage C",annee:"1 ans",logo:"./assets/c.jpeg",nbreProjet:2},
    ],
    backend:[
        {titre:"NodeJs",annee:"2 ans",logo:"./assets/nodejs.jpeg",nbreProjet:2},
        {titre:"Supabase",annee:"2 ans",logo:"./assets/supa.jpeg",nbreProjet:1}
    ],
    baseDonnes:[
        {titre:"Mongodb",anne:"2 ans",logo:"./assets/mongo.jpeg",nbreProjet:3},
        {titre:"Msql",anne:"1 ans",logo:"./assets/slq.jpeg",nbreProjet:3},
        {titre:"Sqlite",anne:"1 ans",logo:"./assets/sqlite.jpeg",nbreProjet:2}
    ],
    formation:[
      {titre:"Developpenment web", date:"23/23/2023",description:"lore",certificat:"./assets/dw.jpeg"}
    ],
    info:{
        nom:"Soumah",
        prenom:"Fode Momo",
        email:"fodemomos11@gmail.com",
        phone:["627172530","666761076"],
        addresse:"Labé (hafia)",
        profile:"./assets/profile.jpeg"
    },
    projets:[
        {
            titre:"Gestion de l'ecole",
            langage:{
                frontent:["Reactjs", "tailwindCss"],
                backend:["Nodejs","express"],
                baseDonnes:"mongodb"
            },
            lient:"https://https://eliteschool.onrender.com/",
            equipe:"seul",
            isActive:true
        },
        {
            titre:"ClassMate",
            langage:{
                frontent:"React Native",
                backend:["Nodejs","express"],
                baseDonnes:"sqlite"
            },
            lient:"https://https://eliteschool.onrender.com/",
            equipe:"seul",
            isActive:true
        },
    ]
}