import Math from "./assets/math.jpg";
import Info from "./assets/info.jpg";
import Chimie from "./assets/chimie.jpg";
import Physique from "./assets/physique.jpg";
import Biosciences from "./assets/bios.jpg";
import { Dashboard , PersonRounded, Computer ,BarChart} from "@material-ui/icons";
import {BsTablet,BsBookFill} from "react-icons/bs"

export const filiere = [
  {
    id: 1,
    nom: "COMPUTER SCIENCE",
    img: Info,
    url: "/computer-science",
    specialiteLicense: [
        {
            id:10,
            nom:"système d'information et genie logiciel"
        },
        {
            id:11,
            nom:"Reseau"
        },
        {
            id:12,
            nom:"Securite"
        },
        {
            id:13,
            nom:"DataScience"
        }
    ]
  },
  {
    id: 2,
    nom: "MATHEMATICS",
    img: Math,
    url: "/mathematics",
    specialiteLicense: [
        {
            id:10,
            nom:"Algebre"
        },
        {
            id:11,
            nom:"Analyse"
        }
    ]
  },
  {
    id: 3,
    nom: "PHYSICS",
    img: Physique,
    url: "/physics",
    specialiteLicense: [
        {
            id:10,
            nom:"physique1"
        },
        {
            id:11,
            nom:"physique2"
        }
    ]
  },
  {
    id: 4,
    nom: "CHEMISTRY",
    img: Chimie,
    url: "/chemistry",
    specialiteLicense: [
        {
            id:10,
            nom:"Chimie1"
        },
        {
            id:11,
            nom:"Chimie2"
        }
    ]
  },
  {
    id: 5,
    nom: "BIOSCIENCE",
    img: Biosciences,
    url: "/bioscience",
    specialiteLicense: [
        {
            id:10,
            nom:"bios1"
        },
        {
            id:11,
            nom:"bios2"
        }
    ]
  },
];



export const adminSidenavElements=[
    {
        id:"1",     
        subHeader:"Dashboard",
        items:[
            {
                id:"1",
                icon:<Dashboard/>,
                name:"Dashboard",
            }
        ]
       
    },
    {
       
        id:"2",     
        subHeader:"Graphique",
        items:[
            {
              id:"2",
              icon:<BsTablet/>,
              name:"Ajout d'un cours"
            }
        ]
    },
    {
        id:"3",     
        subHeader:"Liste",
        items:[
            {
                id:"2",
                icon:<Computer/>,
                name:"Filieres"
            },
            {
              id:"8",
              icon:<BarChart/>,
              name:"Niveaux"
            },
            {
                id:"3",
                icon:<PersonRounded/>,
                name:"Enseignants"
            },
            {
                id:"4",
                icon:<BsBookFill  className="ms-1"/>,
                name:"Salles de cours"
            },
            {
              id:"5",
              icon:<BsBookFill  className="ms-1"/>,
              name:"Unite d'enseignement"
          },
          {
            id:"6",
            icon:<BsBookFill  className="ms-1"/>,
            name:"Specialités"
        },
        {
          id:"7",
          icon:<BsBookFill  className="ms-1"/>,
          name:"Groupes"
      },
      {
        id:"9",
        icon:<BsBookFill  className="ms-1"/>,
        name:"Cours"
    },
           
        ]
    }
]


export const listeSalles=[{
  id:1,
  name:"AMPHI 502"
},
{
  id:2,
  name:"AMPHI 1001"
},
{
  id:3,
  name:"AMPHI 250"
},
{
  id:4,
  name:"AMPHI 350"
},
{
  id:4,
  name:"S006"
}]



export const horairesDebut =[{
  id:1,
  heureDebut:"7h00"
},
{
  id:2,
  heureDebut:"10h00"
},
{
  id:3,
  heureDebut:"13h00"
},
{
  id:4,
  heureDebut:"16h00"
},
{
  id:5,
  heureDebut:"19h00"
},



]

export const horairesFin =[{
  id:1,
  heureFin:"9h55"
},
{
  id:2,
  heureFin:"12h55"
},
{
  id:3,
  heureFin:"15h55"
},
{
  id:4,
  heureFin:"18h55"
},
{
  id:5,
  heureFin:"21h55"
}]


export const Jour=[{
    id:1,
    jour:'LUN'
},
{
  id:2,
  jour:'MAR'
},
{
  id:3,
  jour:'MER'
},
{
  id:4,
  jour:'JEU'
},
{
  id:5,
  jour:'VEN'
},
{
  id:6,
  jour:'SAM'
},
{
  id:7,
  jour:'DIM'
}]


export const fakeData = [
  {
    id_cours: 3,
    jour: "LUN",
    heure_debut: "07:00:00",
    heure_fin: "09:55:00",
    is_td: false,
    is_virtuel: false,
    enseignants: [{
      matricule: "19M2214",
      nom: "enseignant 1",
      prenom: "prenom enseignant 1",
    }],
    salle: { nom: "A 250", capacite: 300 },
    ue: { code: "inf 176", intitule: "intitulé 1" },
    description: "",
    groupe:null
  },
  {
    id_cours: 3,
    jour: "LUN",
    heure_debut: "07:00:00",
    heure_fin: "09:55:00",
    is_td: false,
    is_virtuel: false,
    enseignants: [{
      matricule: "19O2214",
      nom: "enseignant 10",
      prenom: "prenom enseignant 10",
    }],
    salle: { nom: "S006", capacite: 300 },
    ue: { code: "inf 789", intitule: "intitulé 10" },
    description: "",
    groupe:null
  },
  {
    id_cours: 5,
    jour: "JEU",
    heure_debut: "07:00:00",
    heure_fin: "09:55:00",
    is_td: false,
    is_virtuel: false,
    enseignants: [{
      matricule: "19M2215",
      nom: "enseignant 2",
      prenom: "prenom enseignant 2",
    }],
    salle: { nom: "A 300", capacite: 300 },
    ue: { code: "inf 17658", intitule: "intitulé 2" },
    description: "",
    groupe:'G1'

  },
  {
    id_cours: 5,
    jour: "MAR",
    heure_debut: "10:00:00",
    heure_fin: "12:55:00",
    is_td: false,
    is_virtuel: false,
    enseignants: [{
      matricule: "19M2218",
      nom: "enseignant 3",
      prenom: "prenom enseignant 3",
    },
    {
      matricule: "19M2219",
      nom: "enseignant 4",
      prenom: "prenom enseignant 3",
    }],
    salle: { nom: "A 3005", capacite: 300 },
    ue: { code: "inf 79", intitule: "intitulé 3" },
    description: "",
    groupe:null

  },
];

