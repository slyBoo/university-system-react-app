import { useState, useEffect } from "react";

function AllModules() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [modules, setModules] = useState(null);
    useEffect(()=>{
        // our code goes here
        fetch("http://127.0.0.1:8000/api/module/")
        .then(response=>response.json())
        .then(data=>{
            setModules(data) // get the array of text out and set it as our state
            setIsLoaded(true);
        })
        .catch(err=>console.log(err))
        }
    , [])
    const displayModules = () =>{
        return modules.map(module=>
            <li key={module.code}> code= {module.code}, {module.full_name}, {module.delivered_to}, {module.ca_split}</li> // return the jsx to render
        )
    }
    if(isLoaded){
        return (
            <ul>
                {displayModules()}
            </ul>
        )
    }
}

export default AllModules;
