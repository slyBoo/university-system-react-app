import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography"

function StudentForm() {
    function handleSubmit(e) {
        // prevent the browser from reloading the page
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/student/', { method: form.method, body: formData });
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
            /><TextField
            margin="normal"
            required
            fullWidth
            id="cohort"
            label="Cohort"
            name="cohort"
            />
           
            <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
            >Create Student</Button>
        </Box>
    )
}

export default StudentForm