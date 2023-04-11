import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function DisplayStudentGrades({ student_id, formUpdate }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [grades, setGrades] = useState(null);
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/grade/?student=${student_id}`)
            .then(response => response.json())
            .then(data => {
                setGrades(data) // get the array of text out and set it as our state
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [student_id, formUpdate])

    const displayStudents = () => {
        if (grades == null) { return }
        return (
            <TableContainer component={Paper} sx={{ margin: '0 auto', maxWidth: 800, mb: "2rem" }}>
                <Table sx={{ bgcolor: 'background.paper' }}>
                    <TableHead sx={{ bgcolor: 'success.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'common.white' }}>Grade Id</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Module Code</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>CA Mark</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Exam Mark</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Total Mark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {grades.map((grade) => {
                            const parts = grade.module.split('/');
                            const modulecode = parts[parts.length - 2];
                            return (
                                <TableRow key={grade.id}>
                                    <TableCell>{grade.id}</TableCell>
                                    <TableCell>{modulecode}</TableCell>
                                    <TableCell>{grade.ca_mark}</TableCell>
                                    <TableCell>{grade.exam_mark}</TableCell>
                                    <TableCell>{grade.total_grade}</TableCell>
                                </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    if (isLoaded) {
        return (
            <>
                <Typography variant="h2" color="initial" gutterBottom sx={{ textAlign: "center" }}>
                    Module Grades
                </Typography>
                {displayStudents()}
            </>
        )
    }
}

export default DisplayStudentGrades;
