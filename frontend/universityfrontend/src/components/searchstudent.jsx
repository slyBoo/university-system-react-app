import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, IconButton, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch data from API with the search term
    // fetch(`http://127.0.0.1:8000/api/student/${searchTerm}/`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Do something with the fetched data, such as update state
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error(error);
    //   });
    navigate(`/student/${searchTerm}`);
    // window.location.replace(`/student/${searchTerm}`);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (

    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mt: "10rem",
    }}>
      <Typography variant="h1" fontWeight={600} gutterBottom sx={{
        background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
        'WebkitBackgroundClip': 'text',
        'WebkitTextFillColor': 'transparent',
        backgroundClip: 'text',
      }}>
        Search Student ID
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '40rem' }} >
        <TextField
          label="Search Student ID"
          value={searchTerm}
          onChange={handleChange}
          variant="standard"
          color="warning"
          InputProps={{
            endAdornment: (
              <IconButton type="submit" aria-label="search">
                <SearchIcon color="warning"/>
              </IconButton>
            ),
          }}
          sx={{
            width: '100%', color: '#ffc0cb', border: 0,
            outline: 0
          }}
        />
      </form>
    </Box>
  );
}

export default SearchForm;
