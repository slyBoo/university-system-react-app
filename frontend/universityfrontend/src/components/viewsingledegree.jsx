import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"

function SingleDegree() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [degree, setDegree] = useState(null);
    useEffect(()=>{
            // our code goes here
            fetch(`http://127.0.0.1:8000/api/degree/${id}`)
            .then(response=>response.json())
            .then(data=>{
                setDegree(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err=>console.log(err))
        }
    , [id])
    const displayDegree = () =>{
        return (
            <div key={degree.shortcode}>
                <p>{degree.full_name}, {degree.shortcode}</p>
                
            </div>
        )
    }
    if(isLoaded){
        return (
            <div>
                <ul>
                    {displayDegree()}
                </ul>
            </div>
        )
    }
}

export default SingleDegree;
