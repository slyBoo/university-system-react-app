import { useState, useEffect } from "react";

function AllDegrees() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [degrees, setDegrees] = useState(null);
    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/degree/")
        .then(response=>response.json())
        .then(data=>{
            setDegrees(data) // get the array of text out and set it as our state
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
        }
    , [])
    const displayDegrees = () =>{
        return degrees.map(degree=>
            <li key={degree.shortcode}>shortcode={degree.shortcode}, {degree.full_name}</li> // return the jsx to render
        )
    }
    if(isLoaded){
        return (
            <ul>
                {displayDegrees()}
            </ul>
        )
    }
}

export default AllDegrees;
