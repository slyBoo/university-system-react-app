import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Button, List, ListItem, ListItemText, Box, Typography, Paper, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleModule() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [module, setModule] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/module/${id}`)
            .then(response => {
                if (response.status === 404) {
                    navigate('/notfound', { replace: true });
                    return null;
                } else {
                    return response.json()
                }
            })
            .then(data => {
                setModule(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err => console.log(err));
    }
        , [id, navigate])

    const displayModule = () => {
        return (
            <>
                <Typography variant="h1" sx={{
                    background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
                    'WebkitBackgroundClip': 'text',
                    'WebkitTextFillColor': 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 400, mb: 2, color: '#2E3A59', textAlign: 'center'
                }}>Module Information</Typography>
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '5rem' }}>
                    <Paper elevation={3} sx={{ p: 4, minWidth: '50%', textAlign: 'center', background: '#F9FAFB' }}>
                        <Typography variant="h3" sx={{ mb: 2, color: '#2E3A59' }}>{module.full_name}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography variant="subtitle1" sx={{ color: '#4F4F4F', fontSize: 20 }}>Module code: {module.code}</Typography>
                            <Typography variant="subtitle1" sx={{ color: '#4F4F4F', fontSize: 20 }}>Continuous assessment split: {module.ca_split}</Typography>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    mb: 0,
                                    background: '-webkit-linear-gradient(#7f50c7, #ff6a00)',
                                    'WebkitBackgroundClip': 'text',
                                    'WebkitTextFillColor': 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                Cohorts that have this module:
                            </Typography>
                            <List sx={{ mt: 0, margin: '0 auto', width: "30rem" }}>
                                {module.delivered_to.map((cohort, i) => {
                                    const parts = cohort.split('/');
                                    const cohortCode = parts[parts.length - 2];
                                    return (
                                        <ListItem key={i} sx={{ borderBottom: '1px solid divider' }}>
                                            <ListItemText
                                                primaryTypographyProps={{ sx: { fontSize: 20, fontWeight: 'fontWeightBold', textAlign: "center" } }}
                                                secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                                                primary={`${i + 1}: ${cohortCode}`}
                                            />
                                            <Button
                                                component={Link}
                                                to={`/cohort/${cohortCode}`}
                                                variant="outlined"
                                                sx={{
                                                    marginLeft: 2, color: 'green', borderColor: 'green', '&:hover': {
                                                        backgroundColor: 'green',
                                                        color: 'white',
                                                    }
                                                }}
                                            >
                                                View
                                            </Button>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Box>
                    </Paper>
                </Container>

            </>
        );
    }
    if (isLoaded) {
        return (
            <div>
                {displayModule()}
            </div>
        )
    }
}

export default SingleModule;
