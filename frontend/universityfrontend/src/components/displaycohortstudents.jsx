import { useState, useEffect } from "react";

function DisplayCohortStudents({cohort_id}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [students, setStudents] = useState(null);
    useEffect(()=>{
            // our code goes here
            fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort_id}`)
            .then(response=>response.json())
            .then(data=>{
                setStudents(data) // get the array of text out and set it as our state
                console.log(data);
                setIsLoaded(true);
            })
            .catch(err=>console.log(err))
            }
    , [cohort_id])
    const displayStudents = () =>{
        // {
        //     "student_id": "string",
        //     "first_name": "string",
        //     "last_name": "string",
        //     "cohort": "string",
        //     "email": "string"
        //   }
        if (students == null) { return }
        return students.map(student=>
            <div key={student.student_id}>
                <li>id={student.student_id}, {student.first_name} {student.last_name}</li>
            </div>
        )
    }
    if(isLoaded){
        return (
            <ul>
                {displayStudents()}
            </ul>
        )
    }
}

export default DisplayCohortStudents;
