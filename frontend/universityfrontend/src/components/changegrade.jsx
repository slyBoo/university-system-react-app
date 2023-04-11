import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function GradePage({ onSubmit }) {
    const [gradeId, setGradeId] = useState("");
    const [error, setError] = useState(null);

    const handleIdChange = (event) => {
        setGradeId(event.target.value);
    };
    const handleSubmit = (e) => {
        // Make API request to update student grade using fetch

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        onSubmit(formData);
        fetch(`http://127.0.0.1:8000/api/grade/${gradeId}/`, {
            method: "PATCH",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update grade. Please try again.");
                }
                // Handle successful response
                console.log(response.data);
                // Show success message to user
                setError("Grade updated successfully.");
            })
            .catch((error) => {
                // Handle error
                console.error(error);
                // Show error message to user
                setError(error.message);
            });
    };

    return (
        <Box                 sx={{
            maxWidth: "60rem",
            mx: "auto",
            mt: "64px",
            p: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
        }}>
            <Typography textAlign="center" variant="h4" sx={{fontWeight: 400}}>Set Module Grade</Typography>
            <Box display="flex" component="form" method="patch" align="center" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Grade ID"
                    name="id"
                    value={gradeId}
                    onChange={handleIdChange}
                    sx={{ mr: "1rem" }}
                />
                <TextField
                    fullWidth
                    label="CA Split"
                    id="ca_mark"
                    name="ca_mark"
                    sx={{ mr: "1rem" }}

                />
                <TextField
                    fullWidth
                    label="Exam Mark"
                    id="exam_mark"
                    name="exam_mark"
                    sx={{ mr: "1rem" }}

                />
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                >
                    Update
                </Button>
            </Box>
            {error && (
                <Typography textAlign="center" variant="h5" sx={{ color:"red", my: "1rem" }}>{error}</Typography>
            )}
        </Box>
    );
};

export default GradePage;
