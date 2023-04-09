import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function CohortsInDegree({ degree_id }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohorts, setCohorts] = useState(null);
    console.log(degree_id)
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degree_id}`)
            .then(response => response.json())
            .then(data => {
                setCohorts(data) // get the array of text out and set it as our state
                console.log(data);
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [degree_id])

    if (isLoaded) {
        return (
            <TableContainer component={Paper} sx={{ margin: '0 auto', maxWidth: 800 }}>
                <Table sx={{ bgcolor: 'background.paper' }}>
                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'common.white' }}>Cohort ID</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Name</TableCell>
                            <TableCell sx={{ color: 'common.white' }}>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cohorts.map((cohort) => (
                            <TableRow key={cohort.id}>
                                <TableCell>{cohort.id}</TableCell>
                                <TableCell>{cohort.name}</TableCell>
                                <TableCell>{cohort.year}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default CohortsInDegree;
