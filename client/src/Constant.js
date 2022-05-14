import Math from "./assets/math.jpg";
import Info from "./assets/info.jpg";
import Chimie from "./assets/chimie.jpg";
import Physique from "./assets/physique.jpg";
import Biosciences from "./assets/bios.jpg";

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
