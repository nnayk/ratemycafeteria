'use client';

import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getSchools } from '../db';
import { log } from "../utils/logger"; 
import { cleanUrl } from "../db";
// import { getReviewRequests, updateReviewRequest } from '../db';

interface School {
  name: string;
  city: string;
  state: string;
}
export default function SchoolsPage() {
  const [schoolsByState, setSchoolsByState] = useState<Record<string, School[]>>({});
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      // await getReviewRequests();
      // await updateReviewRequest();
      const schoolsList = await getSchools();
      if (schoolsList.length === 0) {
          log.error('Unable to fetch schools right now (please forgive me)');
          alert('Unable to fetch schools right now (please forgive me and consider reporting this issue)');
        return;
      }
      log('Schools:', schoolsList);
      const grouped = schoolsList.reduce((acc, school) => {
        if (!acc[school.state]) {
          acc[school.state] = [];
        }
        acc[school.state].push(school);
        return acc;
      }, {} as Record<string, School[]>);
      setSchoolsByState(grouped);
      
      // Set all states to expanded by default
      const initialExpandedStates = Object.keys(grouped).reduce((acc, state) => {
        acc[state] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setExpandedStates(initialExpandedStates);
    } catch (error) {
      log.error('Error fetching schools:', error);
    }
  };

  const handleSchoolClick = (school: string) => {
    router.push(`/school/${encodeURIComponent(cleanUrl(school))}`);
  };

  const handleAccordionChange = (state: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedStates(prev => ({ ...prev, [state]: isExpanded }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Box sx={{ padding: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Schools by State
        </Typography>
        {Object.entries(schoolsByState).map(([state, schools]) => (
          <Accordion 
            key={state} 
            // expanded={expandedStates[state]} 
            onChange={handleAccordionChange(state)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{state}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {schools.map((school, index) => (
                  <ListItem 
                    key={index} 
                    onClick={() => handleSchoolClick(school.name)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#F59E0B',
                        color: 'white',
                      },
                    }}
                  >
                    <ListItemText primary={`${school.name} (${school.city})`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Footer />
    </div>
  );
}
