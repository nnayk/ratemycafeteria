'use client';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useRouter } from 'next/navigation';
import {Loading} from '../../components/Loading';
import { Navbar } from '../../components/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { requestSchool } from '../../db';
import { US_STATES } from '../../constants';


const yourhandle= require('countrycitystatejson');
export default function AddUniversityPage() {
  const [universityName, setUniversityName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cities, setCities] = useState([]);
  const router = useRouter();
  const {user} = useAuth();
  const { isLoading } = useAuth();
  const maxInputLength = 50;
  if(isLoading) {
    return <Loading />;
  }

  // console.log(`my handle = ${yourhandle}`)
  // console.log(yourhandle.getCities('US','California'))

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     if (state) {
  //       const stateCitiesList = await yourhandle.getCities('US', state);
  //       setCities(stateCitiesList);
  //     } else {
  //       setCities([]);
  //     }
  //   };
  // }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ universityName, city, state });
    requestSchool(user,universityName, city, state);
    // After submission, you might want to redirect to the schools list
    // router.push('/schools');
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

        <div className="w-full max-w-md">
          <Autocomplete
            options={US_STATES}
            value={state}
            onChange={(event, newValue) => {
              setState(newValue);
              setCity('');
              setCities(yourhandle.getCities('US', newValue));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="University State"
                variant="outlined"
                margin='normal'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#F59E0B',
                    },
                    '&:hover fieldset': {
                      borderColor: '#F59E0B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#F59E0B',
                    },
                  },
                }}
              />
            )}
          />
        </div>

        <div className="w-full max-w-md">
          <Autocomplete
            options={cities}
            value={city}
            onChange={(event, newValue) => {
              console.log(`newValue = ${newValue}`);
              setCity(newValue);
            }}
            disabled={!state} // Disable if no state is selected
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="University City"
                variant="outlined"
                margin='normal'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#F59E0B' },
                    '&:hover fieldset': { borderColor: '#F59E0B' },
                    '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
                  },
                }}
              />
            )}
          />
        </div>
        
        {/* <TextField
          fullWidth
          label="University Location"
          variant="outlined"
          value={city}
          slotProps={{
            htmlInput: {
              maxLength: 50,
              type: 'string'
            }
          }}
          onChange={(e) => setCity(e.target.value)}
          required
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#F59E0B' },
              '&:hover fieldset': { borderColor: '#F59E0B' },
              '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
            },
          }}
        /> */}
        
        {/* <TextField
          fullWidth
          label="University State"
          variant="outlined"
          value={state}
          slotProps={{
            htmlInput: {
              maxLength: 50,
              type: 'string'
            }
          }}
          onChange={(e) => setState(e.target.value)}
          required
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#F59E0B' },
              '&:hover fieldset': { borderColor: '#F59E0B' },
              '&.Mui-focused fieldset': { borderColor: '#F59E0B' },
            },
          }}
        /> */}
        
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

