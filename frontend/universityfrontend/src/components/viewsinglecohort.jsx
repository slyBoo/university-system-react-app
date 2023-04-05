import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import DisplayCohortStudents from "./displaycohortstudents";

function SingleCohort() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohort, setCohort] = useState(null);
    useEffect(()=>{
            // our code goes here
            fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
            .then(response=>response.json())
            .then(data=>{
                setCohort(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err=>console.log(err))
        }
    , [id])
    const displayCohort = () =>{
        return (
            <div key={cohort.id}>
                <p>{cohort.name}, {cohort.year}, {cohort.degree}</p>
                
            </div>
        )
    }
    if(isLoaded){
        return (
            <div>
                <ul>
                    {displayCohort()}
                </ul>
                <DisplayCohortStudents cohort_id={id}/>
            </div>
        )
    }
}

export default SingleCohort;
