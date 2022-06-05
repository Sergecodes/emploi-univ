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
              id:"5",
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

/* table



import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}




*/
