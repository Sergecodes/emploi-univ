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
            data:{code_ue:'inf 487',nom_salle:'S006',enseignants:['19M4444'], 
            jour:'LUN', heure_debut:'7h00', heure_fin:'9h55'},
            headers:headers,
            withCredentials:true
          })
          .then(res=>console.log(res))
          .catch(err=>console.error(err))
    }
    const handleUe=()=>{
      const name='inf 487'
      axios({
        method:'post',
        url:`http://localhost:8000/api/cours/${encodeURIComponent(name)}/`,
        data:{new_code_ue:'inf 487',new_nom_salle:'S008',enseignants:['19M4444'], 
        new_jour:'MAR', new_heure_debut:'7h00', new_heure_fin:'9h45', new_is_td:false},
        headers:headers,
        withCredentials:true
      })
      .then(res=>console.log(res))
      .catch(err=>console.error(err))
  }

const handleDelete=()=>{
  const name='inf 487'
  axios({
    method:'delete',
    url:`http://localhost:8000/api/cours/${encodeURIComponent(name)}/`,
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
    <button type="button" className="btn btn-primary" onClick={handleUe}>ue</button>
    <button type="button" className="btn btn-primary" onClick={handleDelete}>delete</button>


   </section>
  )
}

export default Cours