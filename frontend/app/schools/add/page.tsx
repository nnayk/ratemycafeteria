'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Autocomplete, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';
import {Loading} from '../../components/Loading';
import { Navbar } from '../../components/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { requestSchool } from '../../db';

const InstructionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(2),
  color: '#F59E0B', // Change this to match your theme
  fontWeight: 'bold',
  fontSize: '1.1rem', // Slightly larger font size
  // textAlign: 'center', // Center align for better presentation
}));

export default function AddUniversityPage() {
  const [universityName, setUniversityName] = useState('');
  const [cafeterias, setCafeterias] = useState(['']);
  const router = useRouter();
  const {user} = useAuth();
  const { isLoading } = useAuth();
  const maxInputLength = 500;
  
  if(isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    requestSchool(user, universityName, cafeterias.filter(cafeteria => cafeteria.trim() !== ''));
    // After submission, you might want to redirect to the schools list
    // router.push('/schools');
  };

  const handleCafeteriaChange = (index: number, value: string) => {
    const newCafeterias = [...cafeterias];
    newCafeterias[index] = value;
    setCafeterias(newCafeterias);
  };

  const addCafeteriaField = () => {
    if (cafeterias.length < 3) {
      setCafeterias([...cafeterias, '']);
    }
  };

  const removeCafeteriaField = (index: number) => {
    const newCafeterias = cafeterias.filter((_, i) => i !== index);
    setCafeterias(newCafeterias);
  };

  return (
    <div>
      <Navbar />
      <Box 
        sx={{ 
          backgroundColor: 'white',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black', fontWeight: 'bold' }}>
          Add a University
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <TextField
            fullWidth
            label="University Name"
            variant="outlined"
            value={universityName}
            slotProps={{
              htmlInput: {
                maxLength: 50,
                type: 'string'
              }
            }}
            onChange={(e) => setUniversityName(e.target.value)}
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


          {/* Instruction text for cafeterias */}
          <InstructionText>
            List 1-3 cafeterias you would like to review:
          </InstructionText>

          {cafeterias.map((cafeteria, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                label={`Cafeteria ${index + 1}`}
                variant="outlined"
                value={cafeteria}
                onChange={(e) => handleCafeteriaChange(index, e.target.value)}
                margin="normal"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#F59E0B' },
                    '&:hover fieldset': { borderColor: '#F59E0B' },
                    '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
                  },
                }}
              />
              {index > 0 && (
                <IconButton onClick={() => removeCafeteriaField(index)} sx={{ ml: 1 }}>
                  <RemoveIcon />
                </IconButton>
              )}
              {index === cafeterias.length - 1 && cafeterias.length < 3 && (
                <IconButton onClick={addCafeteriaField} sx={{ ml: 1 }}>
                  <AddIcon />
                </IconButton>
              )}
            </Box>
          ))}

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
            Add University
          </Button>
        </Box>
      </Box>
    </div>
  );
}
