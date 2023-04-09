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
				Introducing University System!
			</Typography>
			<Typography variant="h4" sx={{ mb: 4 }}>
				A site for Universities built by Universities!
			</Typography>
		</Box>
	);
}

export default HeroPage;