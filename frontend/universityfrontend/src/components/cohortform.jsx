import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography"
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

function CohortForm() {
    const [degrees, setDegrees] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedValues, setSelectedValues] = useState("");
    const [reqMessage, setReqMessage] = useState("")
    // const navigate = useNavigate();
    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValues(value);
    };
    useEffect(() => {
        // our code goes here
        fetch("http://127.0.0.1:8000/api/degree/")
            .then(response => response.json())
            .then(data => {
                setDegrees(data) // get the array of text out and set it as our state
                setIsLoaded(true);
            })
            .catch(err => console.log(err))
    }
        , [])

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
    function degreeSelector() {
        return degrees.map(degree =>
            <MenuItem key={degree.shortcode} value={`http://127.0.0.1:8000/api/degree/${degree.shortcode}/`}>{degree.shortcode}</MenuItem>
        )
    }
    function handleSubmit(e) {
        // prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const jsonData = {};
        for (let [key, value] of formData.entries()) {
            jsonData[key] = value;
        }
        jsonData["degree"] = selectedValues;
        console.log(JSON.stringify(jsonData));
        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/cohort/', { method: form.method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonData) })
        .then(response => {
            if (!response.ok) {
                setReqMessage("Form input is invalid")
            } else {
                setReqMessage("Success!")
                // navigate(`/cohort/${jsonData["id"]}`)
            }
        });
        
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
                    Create Cohort Form
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    label="ID"
                    name="id"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="year"
                    label="Year"
                    name="year"
                />
                <FormControl fullWidth id="degree">
                    <InputLabel id="degree">Degree</InputLabel>
                    <Select
                        labelId="degree"
                        label="Degree"
                        id="degree"
                        required
                        fullWidth
                        value={selectedValues}
                        onChange={handleChange}
                        sx={{ mt: "1rem" }}

                        MenuProps={
                            MenuProps
                        }
                    >
                        {degreeSelector()}
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
                >Create Cohort</Button>
                <Typography color="red">{reqMessage}</Typography>
            </Box>
        )
    }
}

export default CohortForm