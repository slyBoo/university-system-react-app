import { Typography, Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";


function ModuleForm() {
    const [cohorts, setCohorts] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);    
    const [selectedValues, setSelectedValues] = useState([]);

    const handleChange = (event) => {
      const { value } = event.target;
      setSelectedValues(value);
    };
    const menuStyle = {
        maxHeight: 200,
        overflowY: "auto",
        '& ul': {
          padding: 0,
          margin: 0
        }
      }
    
    const MenuProps = {
    MenuListProps: {
        style: menuStyle
    }
    }
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

    function handleSubmit(e) {
        // prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const jsonData = {};
        for (let [key, value] of formData.entries()) {
          jsonData[key] = value;
        }
        jsonData["delivered_to"] = selectedValues;
        console.log(JSON.stringify(jsonData));
        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/module/', { method: form.method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonData) });
    }

    function cohortSelector() {
        return cohorts.map(cohort =>
            <MenuItem key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>{cohort.name}</MenuItem>
        )
    }
    if (isLoaded) {

        return (

            <Box component="form" method="post" align="center" onSubmit={handleSubmit} sx={{ mt: "6rem", mx: "20em" }}>
                <Typography variant="h2" gutterBottom sx={{
                    background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
                    'WebkitBackgroundClip': 'text',
                    'WebkitTextFillColor': 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 400,
                }}>
                    Create Module Form
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="full_name"
                    label="Module name"
                    name="full_name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ca_split"
                    label="Continous assessment split"
                    name="ca_split"
                />
                <FormControl fullWidth id="delivered_to">
                    <InputLabel id="delivered_to">Cohorts assigned</InputLabel>
                    <Select
                        labelId="delivered_to"
                        label="Cohorts assigned"
                        id="delivered_to"
                        multiple
                        required
                        fullWidth
                        value={selectedValues}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{mt:"1rem"}}
                        
                        MenuProps={
                            MenuProps  
                        }
                        >
                        {cohortSelector()}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
                    >Create Module</Button>
            </Box>
        )
    }
}

export default ModuleForm