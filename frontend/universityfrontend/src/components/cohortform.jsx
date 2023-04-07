import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography"

function CohortForm() {
    function handleSubmit(e) {
        // prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/cohort/', { method: form.method, body: formData });
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
            <TextField
            margin="normal"
            required
            fullWidth
            id="degree"
            label="Degree"
            name="degree"
            />
            <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            />

            <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
            >Create Cohort</Button>
        </Box>
    )
}

export default CohortForm