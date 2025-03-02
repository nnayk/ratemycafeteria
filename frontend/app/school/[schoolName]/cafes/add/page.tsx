'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Loading } from '../../../../components/Loading';
import { Navbar } from '../../../../components/NavBar';
import { Footer } from '../../../../components/Footer';
import { useAuth } from '../../../../contexts/AuthContext';
import { requestCafe } from '../../../../db';
import { log } from "../../../../utils/logger"; 

export default function AddCafe({ params }: { params: Promise<{ schoolName: string }> }) {
  const [decodedSchoolName, setDecodedSchoolName] = useState<string>('');
  const [cafeName, setCafeName] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    params.then((resolvedParams) => {
      const { schoolName } = resolvedParams;
      setDecodedSchoolName(decodeURIComponent(schoolName));
    });
  }, [params]);

  log(`decodedSchoolName = ${decodedSchoolName}`);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button to prevent multiple submissions

    log(`Submitting: school = ${decodedSchoolName}, cafe = ${cafeName}`);
    const status = await requestCafe(user, decodedSchoolName, cafeName);

    if( status) {
        setSubmissionSuccess(true);
    } else {
        alert("Failed to submit request. Please try again later.");
        log("ERROR: Failed to submit cafe request");
    }

    // Wait 2 seconds before navigating back
    setTimeout(() => {
      router.back();
    }, 2000);
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
          justifyContent: 'flex-start',
          padding: '2rem 1rem',
          marginTop: '4rem',
          flexGrow: 1,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
          Add a dining option 
        </Typography>

        {submissionSuccess && (
          <Alert severity="success" sx={{ mb: 2, width: '100%', maxWidth: 400 }}>
            Your request has been submitted successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            fullWidth
            label="Dining option name"
            variant="outlined"
            value={cafeName}
            onChange={(e) => setCafeName(e.target.value)}
            required
            margin="normal"
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            sx={{ 
              mt: 3, 
              mb: 2, 
              backgroundColor: '#F59E0B',
              '&:hover': {
                backgroundColor: '#D97706',
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Add dining option"}
          </Button>
        </Box>

        {/* Centered Back Button */}
        <Button
          onClick={() => router.back()}
          variant="outlined"
          disabled={isSubmitting}
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
      <Footer />
    </div>
  );
}

