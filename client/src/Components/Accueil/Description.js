import React from "react";
import filter from "../../assets/filter.png";
import pdf from "../../assets/pdf.png";
import png from "../../assets/png-format.png";
import { RiMenuUnfoldLine} from "react-icons/ri";
import { Link } from "react-router-dom";

const Description = () => {
  return (
    <section className="mt-5  description ">
      <div className="row">
        <div className="col-12 col-sm-6 pt-5 pb-3">
          <div className="d-flex justify-content-center ">
            <img
              src={pdf}
              alt="pdf"
              style={{ width: "35%", height: "140px" }}
            />
            <img
              src={png}
              alt="png"
              style={{ width: "35%", height: "140px" }}
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 pt-5 pb-3">
          <div>
            <p className="fs-4 functionalityDescription">
              Search for your corresponding <br />
              timetable, view and export either <br />
              on pdf format or on JPG format <br />
              🎉🎉🎉🎉🎉🎉
            </p>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12 col-sm-6 py-3">
          <div className="d-flex justify-content-center ">
            <img
              src={filter}
              alt="png"
              style={{ width: "40%", height: "140px" }}
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 py-3 ">
          <div>
            <p className="fs-4 functionalityDescription">
              Use the filter option <br />
              to get a specify information <br />
              based on your need
              <br />
            </p>
            <div className=" functionalityButton ">
              <Link to="/filter">
                <button
                  type="button"
                  className="btn filt d-flex align-items-center"
                  style={{
                    backgroundColor: "var(--secondaryBlue)",
                    color: "white",
                  }}
                >

                  <RiMenuUnfoldLine className="me-2" /> Filter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
