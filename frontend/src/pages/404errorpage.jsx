import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Title from '../components/Title'; // Assuming you already have this component
import 'react-toastify/dist/ReactToastify.css'
const NotFound = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#1E1E1E',
        color: '#FFF8E7',
      }}
    >
      <Box>
        <Title text1="PAGE" text2="NOT FOUND" />
        <Typography
          variant="h6"
          sx={{ marginTop: 2, color: '#CFC4B9' }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
      </Box>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          marginTop: 4,
          backgroundColor: '#D4AF37',
          color: '#FFF8E7',
          '&:hover': {
            backgroundColor: '#BFA253',
          },
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
