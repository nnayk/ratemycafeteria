import React from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
// import { SCHOOLS } from '../constants'; // HARD coding for now since schools are manually added anyways
import { getSchools } from '../db'; // Adjust the import path as necessary
import { cleanUrl } from '../db';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';


export const Hero: React.FC = () => {
  const router = useRouter();
  
  const [schools, setSchools] = useState<DocumentData[]>([]);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const result = await getSchools();
        setSchools(result);
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      }
    };

    fetchSchools();
  }, []);

  const handleSchoolSelect = (event: React.SyntheticEvent, value: string | null) => {
    if (value) {
      // Navigate to the school's page
      router.push(`/school/${encodeURIComponent(cleanUrl(value))}`);
    }
  };

  return (
    <div className="bg-white pt-12 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Search a school to get started</h1>
      
      <div className="w-full max-w-md">
        <Autocomplete
        // SCHOOLS is a list of objects with attribute name. I want a list of these names
          options={schools.map((school) => school.name)} // TODO: call getSchools() even if it's just a static list rn
          onChange={handleSchoolSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Enter school name"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#F59E0B', // Yellow border
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
      
      <div className="mt-8 flex space-x-2">
        <Button variant="outlined" color="primary" sx={{ borderColor: '#F59E0B', color: '#000' }} onClick = {() => router.push('/schools/add')}>
          Add a school
        </Button>
        <Button variant="outlined" color="primary" sx={{ borderColor: '#F59E0B', color: '#000' }} onClick={() => router.push('/schools')}>
          See all schools 
        </Button>
      </div>
    </div>
  );
};
