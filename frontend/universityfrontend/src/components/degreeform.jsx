import { Button, TextField, Box } from "@mui/material";
import Typography from "@mui/material/Typography"
import { useState } from "react";

function DegreeForm() {
    const [reqMessage, setReqMessage] = useState("")
    function handleSubmit(e) {
        // prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form); 
        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/degree/', { method: form.method, body: formData })
        .then(response => {
            if (!response.ok) {
                setReqMessage("Form input is invalid")
            } else {
                setReqMessage("Success!")
                // navigate(`/cohort/${jsonData["id"]}`)
            }
        });
    }
    return (
        
        <Box component="form" method="post" align="center" onSubmit={handleSubmit} sx={{ mt: "6rem", mx: "20em"}}>
            <Typography variant="h2" gutterBottom sx={{
            background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
            'WebkitBackgroundClip': 'text',
            'WebkitTextFillColor': 'transparent',
            backgroundClip: 'text',
            fontWeight: 400,
            }}>
                Create Degree Form
            </Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            id="shortcode"
            label="Code"
            name="shortcode"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Course name"
            name="full_name"
            />
           
            <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
            >Create Degree</Button>
             <Typography color="red">{reqMessage}</Typography>

        </Box>
    )
}

export default DegreeForm