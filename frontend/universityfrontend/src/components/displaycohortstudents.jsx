import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function DisplayCohortStudents({ cohort_id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [students, setStudents] = useState(null);
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort_id}`)
            .then(response => response.json())
            .then(data => {
                setStudents(data) // get the array of text out and set it as our state
                console.log(data);
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [cohort_id])

    const displayStudents = () => {
        if (students == null) { return }
        return (
            <TableContainer component={Paper} sx={{ margin: '0 auto', maxWidth: 800, mb: "2rem" }}>
                <Table sx={{ bgcolor: 'background.paper' }}>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'common.white' }}>Student ID</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>First Name</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Last Name</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.student_id}>
                                <TableCell>{student.student_id}</TableCell>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    if (isLoaded) {
        return (
            <>
                <Typography variant="h2" color="initial" gutterBottom sx={{textAlign:"center"}}>
                    Students in Cohort
                </Typography>
                {displayStudents()}
            </>
        )
    }
}

export default DisplayCohortStudents;
