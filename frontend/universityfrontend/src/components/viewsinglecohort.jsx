import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function SingleCohort() {
    const { id } = useParams()
    useEffect(()=>{
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
        .then(response=>response.json())
        .then(data=>{
            setCohort(data) // get the array of text out and set it as our state
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
        }
    )
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohort, setCohort] = useState();
    const displayCohort = () =>{
        return (
            <p key={cohort.id}>{cohort.name}, {cohort.year}, {cohort.degree}</p> // return the jsx to render
        )
    }
    if(isLoaded){
        return (
            <ul>
                {displayCohort()}
            </ul>
        )
    }
}

export default SingleCohort;
