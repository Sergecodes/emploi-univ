import React from "react";
import "../Style/emplois.css";
import { Preview, print } from "react-html2pdf";

function Emplois() {
  const timeTable = document.getElementById("timeTable");

  return (
    <div>
      <div className="container">
        <div className="row">
          c est cici maintenant queje vais entrer les informations de mon
          tableay
          <Preview id="timeTable">
            <table className="tableau-style">
              <thead>
                <tr>
                  <th></th>
                  <th>Lundi</th>
                  <th>Mardi</th>
                  <th>Mercredi</th>
                  <th>Jeudi</th>
                  <th>Vendredi</th>
                  <th>Samedi</th>
                  <th>Dimanche</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>08h-12h</th>
                  <td></td> <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </Preview>
        </div>
        <button
          style={{ margin: "20px" }}
          className="btn btn-success"
          onClick={() => print("emplois de temps", "timeTable")}
        >
          Telecharger
        </button>
      </div>
    </div>
  );
}

export default Emplois;
