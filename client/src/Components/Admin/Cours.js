import React,{useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";

const Cours = () => {
    const csrftoken = Cookies.get('csrftoken');

    const headers={
      'X-CSRFToken': csrftoken
    }
    useEffect(()=>{
        axios.get('http://localhost:8000/api/cours')
        .then(res=>console.log(res.data))
        .catch(err=>console.error(err))
    },[])


    const handlePost=()=>{
        axios({
            method:'post',
            url:"http://localhost:8000/api/cours/",
            data:{code_ue:'inf 487',nom_salle:'S006',matricule_enseignants:'19M4444', 
            jour:'Lundi', heure_debut:'7h00', heure_fin:'9h55'},
            headers:headers,
            withCredentials:true
          })
          .then(res=>console.log(res))
          .catch(err=>console.error(err))
    }
  return (
   <section>
        <div>Cours</div>
    <button type="button" className="btn btn-primary" onClick={handlePost}>post</button>
   </section>
  )
}

export default Cours