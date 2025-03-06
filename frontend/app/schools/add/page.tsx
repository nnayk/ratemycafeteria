'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Loading } from '../../components/Loading';
import { Navbar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { requestSchool, cleanUrl } from '../../db';
import { log } from "../../utils/logger"; 

export default function AddschoolPage() {
  const [schoolName, setSchoolName] = useState('');
  const [cafe, setCafe] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const maxInputLength = 50;
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    log(`school name = ${schoolName}, cafe = ${cafe}`);
    const status = await requestSchool(user, schoolName, cafe);
    if(status==true) {
        log("School request submitted successfully");
        // Show submission message
        setSubmitted(true);
    } else {
        log("ERROR: School request submission failed");
        alert("Failed to submit request. Please try again later.");
        return;
    }

    const urlSchoolName = cleanUrl(schoolName);
    const urlCafe = cleanUrl(cafe);
    log(`urlSchoolName = ${urlSchoolName}, urlCafe = ${urlCafe}`);
    // Delay navigation by 2 seconds
    setTimeout(() => {
      router.push(`/school/${urlSchoolName}/cafes/${urlCafe}/review`);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Box 
        sx={{ 
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // Centered vertically
          padding: '2rem 1rem',
          marginTop: '4rem',
          flexGrow: 1,
        }}
      >
        {submitted ? (
          <Typography 
            variant="h6" 
            sx={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}
          >
            Thanks, your request has been submitted! 🎉<br />
            Let&rsquo;s write the very FIRST review for {cafe}!
          </Typography>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
              Add a school
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
              <TextField
                fullWidth
                label="School name"
                variant="outlined"
                value={schoolName}
                slotProps={{ htmlInput: { maxLength: 50, type: 'string' } }}
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
                slotProps={{ htmlInput: { maxLength: 50, type: 'string' } }}
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
                  '&:hover': { backgroundColor: '#D97706' },
                }}
              >
                Add school
              </Button>
            </Box>

            {/* Go Back Button - Hidden after submission */}
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
              {`Go back to home page`}
            </Button>
          </>
        )}
      </Box>
      <Footer />
    </div>
  );
}

