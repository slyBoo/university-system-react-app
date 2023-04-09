import { useState, useEffect } from "react";
import { Box, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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
                    All Modules
                </Typography>
                <List sx={{ margin: '0 auto', width: "30rem" }}>
                    {modules.map((module) => (
                        <ListItem key={module.code} sx={{ borderBottom: '1px solid divider' }}>
                            <ListItemText
                                primaryTypographyProps={{ sx: { fontWeight: 'fontWeightBold' } }}
                                secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                                primary={module.full_name}
                                secondary={`Code: ${module.code}`}
                            />
                            <Button
                                component={Link}
                                to={`/module/${module.code}`}
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
                {displayModules()}
            </ul>
        )
    }
}

export default AllModules;
