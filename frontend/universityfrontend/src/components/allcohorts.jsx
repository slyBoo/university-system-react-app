import { useState, useEffect } from "react";

function AllCohorts() {
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
    )
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohorts, setCohorts] = useState(null);
    const displayCohorts = () =>{
        return cohorts.map(cohort=>
            <li key={cohort.id}>id={cohort.id}, {cohort.name}, {cohort.year}, {cohort.degree}</li> // return the jsx to render
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

export default AllCohorts;
