import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography"
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { useState, useEffect } from "react";

function GradeStudent() {
    const [modules, setModules] = useState(null);
    const [students, setStudents] = useState(null);
    const [cohorts, setCohorts] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedModule, setSelectedModule] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCohort, setSelectedCohort] = useState("");

    const handleModuleChange = (event) => {
        const { value } = event.target;
        setSelectedModule(value);
    };
    const handleCohortChange = (event) => {
        const { value } = event.target;
        setSelectedCohort(value);
    };

    const handleStudentChange = (event) => {
        const { value } = event.target;
        setSelectedStudent(value);
    };
    useEffect(() => {
        const fetchData = () => {
            // Fetch both data1 and data2
            Promise.all([
                fetch("http://127.0.0.1:8000/api/module/")
                    .then(response1 => response1.json()),
                fetch("http://127.0.0.1:8000/api/student/")
                    .then(response2 => response2.json()),
                fetch("http://127.0.0.1:8000/api/cohort/")
                    .then(response3 => response3.json())
            ])
                .then(([data1, data2, data3]) => {
                    // Update state with both data1 and data2
                    setModules(data1);
                    setStudents(data2);
                    setCohorts(data3);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => {
                    // Set loading to false when both fetch requests are complete
                    setIsLoaded(true);
                });
        };

        fetchData();
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
    function moduleSelector() {
        return modules.map(module =>
            <MenuItem key={module.code} value={`http://127.0.0.1:8000/api/module/${module.code}/`}>{module.code}</MenuItem>
        )
    }

    function studentSelector() {
        return students.map(student =>
            <MenuItem key={student.student_id} value={`http://127.0.0.1:8000/api/student/${student.student_id}/`}>{student.first_name} {student.last_name}</MenuItem>
        )
    }

    function cohortSelector() {
        return cohorts.map(cohort =>
            <MenuItem key={cohort.id} value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}>{cohort.name}</MenuItem>
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
        jsonData["module"] = selectedModule;
        jsonData["student"] = selectedStudent;
        jsonData["cohort"] = selectedCohort;
        console.log(JSON.stringify(jsonData));
        // pass form data as a fetch body diretly;
        fetch('http://127.0.0.1:8000/api/grade/', { method: form.method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonData) });
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
                    Assign a Grade to a Student
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ca_mark"
                    label="CA Mark"
                    name="ca_mark"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="exam_mark"
                    label="Exam Mark"
                    name="exam_mark"
                />
                <FormControl fullWidth id="cohort">
                    <InputLabel id="cohort">Cohort</InputLabel>
                    <Select
                        labelId="cohort"
                        label="Cohort"
                        id="cohort"
                        required
                        fullWidth
                        value={selectedCohort}
                        onChange={handleCohortChange}
                        sx={{ mt: "1rem" }}

                        MenuProps={
                            MenuProps
                        }
                    >
                        {cohortSelector()}
                    </Select>
                </FormControl>
                <FormControl fullWidth id="module">
                    <InputLabel id="module">Module</InputLabel>
                    <Select
                        labelId="module"
                        label="Module"
                        id="module"
                        required
                        fullWidth
                        value={selectedModule}
                        onChange={handleModuleChange}
                        sx={{ mt: "1rem" }}

                        MenuProps={
                            MenuProps
                        }
                    >
                        {moduleSelector()}
                    </Select>
                </FormControl>
                <FormControl fullWidth id="Student">
                    <InputLabel id="student">Student</InputLabel>
                    <Select
                        labelId="student"
                        label="Student"
                        id="student"
                        required
                        fullWidth
                        value={selectedStudent}
                        onChange={handleStudentChange}
                        sx={{ mt: "1rem" }}

                        MenuProps={
                            MenuProps
                        }
                    >
                        {studentSelector()}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    sx={{ display: "flex", ml: "auto", mr: 0, mt: 3, mb: 2 }}
                >Assign Grade</Button>
            </Box>
        )
    }
}

export default GradeStudent