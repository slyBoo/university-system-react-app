import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

function DeleteCohortPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohorts, setCohorts] = useState(null);
    const [sendDeleteRequest, setSendDeleteRequest] = useState(null);
    console.log("test");
    
    const makeDeleteReq = (id)=>{
        fetch(`http://127.0.0.1:8000/api/cohort/${id}`, { method: 'DELETE' })
        .then(()=>setSendDeleteRequest(id))
        console.log("Deleted ");
    }
    
    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/cohort/")
        .then(response=>response.json())
        .then(data=>{
            setCohorts(data) // get the array of text out and set it as our state
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
        }
    , [sendDeleteRequest])

    const displayCohorts = () =>{
        return cohorts.map(cohort=>
            <div key={cohort.id}>
                <li>id={cohort.id}, {cohort.name}, {cohort.year}, {cohort.degree}</li>
                <Button variant="outlined" color="error" onClick={()=>makeDeleteReq(cohort.id)}>Delete</Button>
            </div>
        )
    }
    if(isLoaded){
        return (
            <ul>
                {displayCohorts()}
            </ul>
        )
    }
}

export default DeleteCohortPage;
