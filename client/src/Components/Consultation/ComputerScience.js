import React,{useState} from 'react';
import TextField from '@mui/material/TextField';


export default function ComputerScience() {

  const [test,setTest]=useState('rien')

  return (
   <section className="d-flex justify-content-center my-5">
      <TextField id="outlined-basic" label="test" variant="outlined" size="small" value={test} onChange={(e)=>setTest(e.target.value)} name="test" />
   </section>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

