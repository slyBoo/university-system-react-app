import { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

function AllCohorts() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [cohorts, setCohorts] = useState(null);
    console.log("test");
    useEffect(() => {
        // our code goes here
        fetch("http://127.0.0.1:8000/api/cohort/")
            .then(response => response.json())
            .then(data => {
                setCohorts(data) // get the array of text out and set it as our state
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [])
    const displayCohorts = () => {
        return (
            <Box
                sx={{
                    textAlign: 'center',

                }}
            >
                <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                        marginBottom: 2,
                        fontSize: '3rem',
                        background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
                        'WebkitBackgroundClip': 'text',
                        'WebkitTextFillColor': 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    All Cohorts
                </Typography>
                <List sx={{ margin: '0 auto', width: "30rem" }}>
                    {cohorts.map((cohort) => (
                        <ListItem key={cohort.id} sx={{ borderBottom: '1px solid divider' }}>
                            <ListItemText
                                primaryTypographyProps={{ sx: { fontWeight: 'fontWeightBold' } }}
                                secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                                primary={cohort.name}
                                secondary={`Code: ${cohort.id}, Year: ${cohort.year}`}
                            />
                            <Button
                                component={Link}
                                to={`/cohort/${cohort.id}`}
                                variant="outlined"
                                sx={{ marginLeft: 2, color: 'green', borderColor: 'green', '&:hover': {
                                    backgroundColor: 'green',
                                    color: 'white',
                                  } }}
                            >
                                View
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
    if (isLoaded) {
        return (
            <ul>
                {displayCohorts()}
            </ul>
        )
    }
}

export default AllCohorts;
