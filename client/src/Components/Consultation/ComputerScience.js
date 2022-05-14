import React from "react";
import { filiere } from "../../Constant.js";

const ComputerScience = () => {
  const ComputerScience = filiere.filter(
    (elt) => elt.nom === "COMPUTER SCIENCE"
  );
  console.log();
  return (
    <div>
      {ComputerScience[0].specialiteLicense.map((elt) => {
        return <div key={elt.id}> {elt.nom} </div>;
      })}
      <input type="checkbox" htmlFor="check"></input>
      <label id="check">choix</label>
    </div>
  );
};

export default ComputerScience;
