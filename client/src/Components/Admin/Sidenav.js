import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { adminSidenavElements } from "../../Constant";
import { useNavigate } from "react-router";
import {useSelector} from "react-redux"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Sidenav = () => {
  const classes = useStyles();
  const [open, setOpen] = useState("");
  const navigate = useNavigate();
  const handleOpen = (nom) => {
    open === nom ? setOpen("") : setOpen(nom);
  };

  const files= useSelector(state=>state.SidenavDisplay);

  const recognize = (name) => {
    if (name === "DASHBOARD") return "dashboard";
    else if(name==="Ajout d'un cours") return "ajout-cours-graphique"
    else if (name === "Salles de cours") return "liste-salles";
    else if (name === "mode graphique") return "ajout-cours-graphique";
    else if (name === "Enseignants") return "liste-enseignants";
    else if (name === "Filieres") return "liste-filieres";
    else if (name === "Unite d'enseignement") return "liste-ue";
    else if (name === "Specialités") return "liste-specialites";
    else if (name === "Groupes") return "liste-groupes";
    else if ( name === "Niveaux" ) return "liste-niveaux";
    else if ( name === "Cours" ) return "liste-cours";





    else return "autre";
  };
  const handleRedirect = (name) => {
    navigate("/admin/" + recognize(name));
  };
  return (
    <section className="adminSidenav  "  style={files.open===false?{display:"none"}:{}}>
      <p className=" adminName text-center" style={{ color: "white" }}>
        ADMIN DASHBOARD
      </p>
      <div className="px-2">
        {adminSidenavElements.map((elt) => {
          return (
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              key={elt.id}
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  {elt.subHeader}
                </ListSubheader>
              }
              className={classes.root}
            >
              {elt.items.map((item) => {
                return (
                  <div key={item.id}>
                    {item.subElements !== undefined ? (
                      <div key={item.id}>
                        <ListItem
                          key={item.id}
                          button
                          onClick={() => handleOpen(item.name)}
                        >
                          <div className="ms-1 me-3 ">{item.icon}</div>
                          <ListItemText primary={item.name} />
                          {open !== item.name ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                          in={open === item.name}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="li" disablePadding>
                            {item.subElements.map((subEl) => {
                              return (
                                <ListItem
                                  button
                                  className={classes.nested}
                                  key={subEl.id}
                                  onClick={() => handleRedirect(subEl.name)}
                                >
                                  <div className="ms-1 me-3 ">{subEl.icon}</div>
                                  <ListItemText primary={subEl.name} />
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </div>
                    ) : (
                      <ListItem
                        key={item.id}
                        button
                        onClick={() => handleRedirect(item.name)}
                      >
                        <div className="ms-1 me-3 ">{item.icon}</div>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    )}
                  </div>
                );
              })}
            </List>
          );
        })}
      </div>
    </section>
  );
};

export default Sidenav;
