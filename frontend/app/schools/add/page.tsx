'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {Loading} from '../../components/Loading';
import { Navbar } from '../../components/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { requestSchool } from '../../db';
import {Login} from "../../components/Login"
import {Register} from "../../components/Register"

export default function AddschoolPage() {
  const [schoolName, setSchoolName] = useState('');
  const [cafe, setCafe] = useState('');
  const router = useRouter();
  const {user} = useAuth();
  const maxInputLength = 50;
  const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  
  if(isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log(`school name = ${schoolName}, cafe = ${cafe}`);
    e.preventDefault();
    requestSchool(user,schoolName,cafe);
  };

  return (
    <div>
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
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
          Add a school
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            fullWidth
            label="School name"
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
            label="One dining option you would like to review"
            variant="outlined"
            value={cafe}
            slotProps={{
              htmlInput: {
                maxLength: 50,
                type: 'string'
              }
            }}
            onChange={(e) => setCafe(e.target.value)}
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
            Add school
          </Button>
        </Box>
      </Box>
      {/* <Login isOpen={isLoginOpen} onClose={toggleLogin} /> */}
      {/* <Register isOpen={isRegisterOpen} onClose={toggleRegister} /> */}
    </div>
  );
}
