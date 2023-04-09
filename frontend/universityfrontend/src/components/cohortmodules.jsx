import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const CohortModules = () => {
    const [modules, setModules] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        // our code goes here
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${id}`)
            .then(response => response.json())
            .then(data => {
                setModules(data) // get the array of text out and set it as our state
                console.log(data);
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [id])

    if (isLoaded) {
        return (

            <Box sx={{ bgcolor: '#f5f5f5', p: 3 }}>
                <Typography variant="h4" sx={{ color: '#003049', fontWeight: 'bold', mb: 2 }}>
                    Modules for {id}
                </Typography>
                <List>
                    {modules.map(module => (
                        <ListItem key={module.code} sx={{ borderBottom: '1px solid #f2f2f2' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {module.code}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" sx={{ color: '#333333' }}>
                                        {module.full_name}
                                    </Typography>
                                }
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333333', mr: 1 }}>
                                    CA Split
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#003049' }}>
                                    {module.ca_split}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
};

export default CohortModules;
