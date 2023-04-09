import React from 'react';
import { Box, Typography } from '@mui/material';

function PageNotFound() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '80vh',
			}}
		>
			<Typography variant="h1"         sx={{
          mb: "1rem",
          background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
          'WebkitBackgroundClip': 'text',
          'WebkitTextFillColor': 'transparent',
          backgroundClip: 'text',
		  fontWeight: 400,
          fontSize: '20rem'
        }}>
				404!
			</Typography>
			<Typography variant="h4" sx={{ opacity: .4}}>
				The page that you are looking for cannot be found!
			</Typography>
		</Box>
	);
}

export default PageNotFound;