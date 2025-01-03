'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {Loading} from '../../../../components/Loading';
import { Navbar } from '../../../../components/NavBar';
import { Footer } from '../../../../components/Footer';
import { useAuth } from '../../../../contexts/AuthContext';
import { requestSchool } from '../../../../db';
import {Login} from "../../../../components/Login"
import {Register} from "../../../../components/Register"

export default function AddCafe() {
  const [schoolName, setSchoolName] = useState('');
  const [cafe, setCafe] = useState('');
  const router = useRouter();
  const {user} = useAuth();
  const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  const maxInputLength = 50;
  
  if(isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log(`school name = ${schoolName}, cafe = ${cafe}`);
    e.preventDefault();
    requestSchool(user,schoolName,cafe);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <Box 
        sx={{ 
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
          padding: '2rem 1rem', // Adjusted padding
          marginTop: '4rem', // Added margin at the top
          flexGrow: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
          Add a dining option 
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Dining option name"
            variant="outlined"
            value={schoolName}
            slotProps={{
              htmlInput: {
                maxLength: 50,
                type: 'string'
              }
            }}
            onChange={(e) => setSchoolName(e.target.value)}
            required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#F59E0B' },
                '&:hover fieldset': { borderColor: '#F59E0B' },
                '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
              },
            }}
          />

          <TextField
            fullWidth
            label="Anything we should know? (optional)"
            variant="outlined"
            value={cafe}
            slotProps={{
              htmlInput: {
                maxLength: 50,
                type: 'string'
              }
            }}
            onChange={(e) => setCafe(e.target.value)}
            // required
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#F59E0B' },
                '&:hover fieldset': { borderColor: '#F59E0B' },
                '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
              },
            }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 3, 
              mb: 2, 
              backgroundColor: '#F59E0B',
              '&:hover': {
                backgroundColor: '#D97706',
              },
            }}
          >
            Add dining option 
          </Button>
        </Box>
      </Box>
      {/* <Login isOpen={isLoginOpen} onClose={toggleLogin} /> */}
      {/* <Register isOpen={isRegisterOpen} onClose={toggleRegister} /> */}
      <Footer />
    </div>
  );
}
