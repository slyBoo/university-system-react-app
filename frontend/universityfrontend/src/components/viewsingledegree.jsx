import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import CohortsInDegree from "./cohortsindegrees";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SingleDegree() {
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const [degree, setDegree] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
            // our code goes here
            fetch(`http://127.0.0.1:8000/api/degree/${id}`)
            .then(response => {
              if (response.status === 404) {
                  navigate('/notfound', { replace: true });
                  return null;
              } else {
                  return response.json()
              }
          })
            .then(data=>{
                setDegree(data) // get the array of text out and set it as our state
                setIsLoaded(true)
            })
            .catch(err=>console.log(err))
        }
    , [id, navigate])
    const displayDegree = () =>{
        return (
            <Box
            sx={{
              borderRadius: 16,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              p: 3,
              textAlign: 'center',
              mb: "2rem"
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 2, color: '#1c1c1c' }}
            >
              {degree.full_name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold', color: '#4a4a4a', mb: 1 }}
            >
              Degree Code: {degree.shortcode}
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '8px',
                borderRadius: 8,
                bgcolor: '#d9d9d9',
                position: 'relative',
                overflow: 'hidden',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '60%',
                  bgcolor: '#3f51b5',
                  transition: 'all 0.3s ease-out',
                }}
              />
            </Box>
          </Box>
        )
    }
    if(isLoaded){
        return (
            <div>
                {displayDegree()}
                <CohortsInDegree degree_id={id}/>
            </div>
        )
    }
}

export default SingleDegree;
