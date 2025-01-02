'use client';

import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getSchools } from '../db';

export default function SchoolsPage() {
  const [schools, setSchools] = useState<string[]>([]);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const schoolsList = await getSchools();
      setSchools(schoolsList);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleSchoolClick = (school: string) => {
    router.push(`/school/${encodeURIComponent(school)}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Box sx={{ padding: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Schools
        </Typography>
        <List>
          {schools.map((school, index) => (
            <ListItem 
              key={index} 
              onClick={() => handleSchoolClick(school)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#F59E0B',
                  color: 'white',
                },
              }}
            >
              <ListItemText primary={school} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Footer />
    </div>
  );
}
