import React ,{useRef} from 'react';
import Timetable from "../Components/Consultation/Timetable";
import { Outlet } from 'react-router';
import ReactToPrint from 'react-to-print';
import { exportComponentAsJPEG, exportComponentAsPNG } from 'react-component-export-image';

const AffichageEmploi = () => {
    const componentRef = useRef();
  return (
    <section>
        <Outlet/>
        <Timetable  ref={componentRef} className="steph"/>
        <div className="d-flex justify-content-center mt-3 mb-5 ">
          <button className="btn mx-2 boutonFill" onClick={() => exportComponentAsJPEG(componentRef)}>
        Exporter en JPG
      </button>
      <button className="btn mx-2 boutonFill" onClick={() => exportComponentAsPNG(componentRef)}>
        Exporter en PNG
      </button>
      <ReactToPrint
        trigger={() => <button className="btn  mx-2 boutonFill">Exporter en PDF</button>}
        content={() => componentRef.current}
      />

        </div>
    </section>
  )
}

export default AffichageEmploi