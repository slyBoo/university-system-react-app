import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import DisplayCohortStudents from "./displaycohortstudents";
import { Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function SingleCohort() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohort, setCohort] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/cohort/${id}`)
            .then(response => {
                if (response.status === 404) {
                    navigate('/notfound', { replace: true });
                    return null;
                } else {
                    return response.json()
                }
            })
            .then(data => {
                setCohort(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }
        , [id, navigate])
    const displayCohort = () => {
        const parts = cohort.degree.split('/');
        const degree = parts[parts.length - 2];
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '50px',
                    mb: '2rem'
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {cohort.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#F6F6F6',
                        borderRadius: '20px',
                        padding: '30px',
                        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.25)',
                        maxWidth: '600px',
                        width: '100%',
                    }}
                >
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        ID: {cohort.id}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                            Year:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {cohort.year}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>
                            Degree:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {degree}
                        </Typography>
                    </Box>
                        <Button
                            component={Link}
                            to={`/cohortmodules/${cohort.id}`}
                            variant="outlined"
                            sx={{
                                marginLeft: 2, color: 'blue', borderColor: 'blue', '&:hover': {
                                    backgroundColor: 'blue',
                                    color: 'white',
                                }
                            }}
                        >
                            View Modules
                        </Button>
                </Box>
            </Box>
        );
    }
    if (isLoaded) {
        return (
            <div>
                {displayCohort()}
                <DisplayCohortStudents cohort_id={id} />
            </div>
        )
    }
}

export default SingleCohort;
