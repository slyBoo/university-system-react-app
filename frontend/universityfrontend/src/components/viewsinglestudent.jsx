import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Box, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import DisplayStudentGrades from "./displaystudentgrades";
import GradePage from "./changegrade";

function SingleStudent() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [student, setStudent] = useState(null);
    const [dummyState, setDummy] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/student/${id}`)
            .then(response => {
                if (response.status === 404) {
                    navigate('/notfound', { replace: true });
                    return null;
                } else {
                    return response.json()
                }
            })
            .then(data => {
                console.log()
                setStudent(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    , [id, navigate])
    
    const handleSubmit = (e) => {
        setDummy(e);
    }

    const displayStudent = () => {
        const parts = student.cohort.split('/');
        const cohort = parts[parts.length - 2];
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '5rem' }}>
                <Paper elevation={3} sx={{ p: 4, minWidth: '50%', textAlign: 'center', background: '#F9FAFB' }}>
                    <Typography variant="h3" sx={{ mb: 2, color: '#2E3A59' }}>Student Information</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ color: '#4F4F4F' }}>Student ID: {student.student_id}</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#4F4F4F' }}>First Name: {student.first_name}</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#4F4F4F' }}>Last Name: {student.last_name}</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#4F4F4F' }}>Cohort: {cohort}</Typography>
                        <Typography variant="subtitle1" sx={{ color: '#4F4F4F' }}>Email: {student.email}</Typography>
                    </Box>
                </Paper>
            </Container>
        );
    }
    if (isLoaded) {
        return (
            <div>
                <ul>
                    {displayStudent()}
                </ul>
                <GradePage onSubmit={handleSubmit}/>
                <DisplayStudentGrades student_id={student.student_id} formUpdate={dummyState} />
            </div>
        )
    }
}

export default SingleStudent;
