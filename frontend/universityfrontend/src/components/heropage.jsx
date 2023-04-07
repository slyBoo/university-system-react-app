import React from 'react';
import { Button, Box, Typography } from '@mui/material';

function HeroPage() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Typography variant="h1"         sx={{
          mb: 4,
          background: '-webkit-linear-gradient(#ee0979, #ff6a00)',
          'WebkitBackgroundClip': 'text',
          'WebkitTextFillColor': 'transparent',
          backgroundClip: 'text',
		  fontWeight: 400,
        }}>
				Welcome to my site!
			</Typography>
			<Typography variant="h4" sx={{ mb: 4 }}>
				This is a hero page built with Material-UI.
			</Typography>
			<Button variant="contained" color="primary">
				Get started
			</Button>
		</Box>
	);
}

export default HeroPage;