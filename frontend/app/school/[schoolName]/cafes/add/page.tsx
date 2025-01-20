'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import {Loading} from '../../../../components/Loading';
import { Navbar } from '../../../../components/NavBar';
import { Footer } from '../../../../components/Footer';
import { useAuth } from '../../../../contexts/AuthContext';
import { requestCafe } from '../../../../db';
import {Login} from "../../../../components/Login"
import {Register} from "../../../../components/Register"
import { useEffect } from 'react';

export default function AddCafe({ params }: { params: Promise<{ schoolName: string }> }) {
  //const { schoolName } = React.use(params);
  //const decodedSchoolName = decodeURIComponent(schoolName);
  const [decodedSchoolName, setDecodedSchoolName] = useState<string>('');

  useEffect(() => {
    params.then((resolvedParams) => {
      const { schoolName } = resolvedParams;
      setDecodedSchoolName(decodeURIComponent(schoolName));
    });
  }, [params]);

  console.log(`decodedSchoolName = ${decodedSchoolName}`);
  const [cafeName, setCafeName] = useState('');
  const router = useRouter();
  const {user} = useAuth();
  const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  const maxInputLength = 50;
  
  if(isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    console.log(`school name = ${decodedSchoolName}, cafe = ${cafeName}`);
    e.preventDefault();
    requestCafe(user,decodedSchoolName,cafeName);
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
            value={cafeName}
            slotProps={{
              htmlInput: {
                maxLength: 50,
                type: 'string'
              }
            }}
            onChange={(e) => setCafeName(e.target.value)}
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
            Add dining option 
          </Button>
        </Box>
       {/* Centered Back Button */}
       <Button
          onClick={() => router.back()}
          variant="outlined"
          sx={{
            mt: 2,
            color: '#F59E0B',
            borderColor: '#F59E0B',
            '&:hover': {
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderColor: '#D97706',
            },
          }}
        >
          {`Go back to ${decodedSchoolName} page`}
        </Button>
      </Box>
      {/* <Login isOpen={isLoginOpen} onClose={toggleLogin} /> */}
      {/* <Register isOpen={isRegisterOpen} onClose={toggleRegister} /> */}
      <Footer />
    </div>
  );
}
