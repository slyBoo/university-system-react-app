import { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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
                    All Degrees
                </Typography>
                <List sx={{ margin: '0 auto', width: "30rem" }}>
                    {degrees.map((degree) => (
                        <ListItem key={degree.shortcode} sx={{ borderBottom: '1px solid divider' }}>
                            <ListItemText
                                primaryTypographyProps={{ sx: { fontWeight: 'fontWeightBold' } }}
                                secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                                primary={degree.full_name}
                                secondary={`Code: ${degree.shortcode}`}
                            />
                            <Button
                                component={Link}
                                to={`/degree/${degree.shortcode}`}
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
    if(isLoaded){
        return (
            <ul>
                {displayDegrees()}
            </ul>
        )
    }
}

export default AllDegrees;
