import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography"
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

function StudentForm() {
    const [cohorts, setCohorts] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedValues, setSelectedValues] = useState("");
    const [reqMessage, setReqMessage] = useState("");
    // const navigate = useNavigate();
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
        jsonData["cohort"] = selectedValues;
        console.log(JSON.stringify(jsonData));
        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/student/', { method: form.method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonData) })   
        .then(response => {
            if (!response.ok) {
                setReqMessage("Form input is invalid")
            } else {
                setReqMessage("Success")
            }
        });
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
                    Create Student Form
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="student_id"
                    label="Student ID"
                    name="student_id"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First name"
                    name="first_name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last name"
                    name="last_name"
                />
                <FormControl fullWidth id="cohort">
                    <InputLabel id="cohort">Cohorts</InputLabel>
                    <Select
                        labelId="cohort"
                        label="Cohort"
                        id="cohort"
                        required
                        fullWidth
                        value={selectedValues}
                        onChange={handleChange}
                        sx={{ mt: "1rem" }}

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
                >Create Student</Button>
                <Typography color="red">{reqMessage}</Typography>
            </Box>
        )
    }
}

export default StudentForm