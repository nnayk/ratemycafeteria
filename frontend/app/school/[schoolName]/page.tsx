'use client';
import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/NavBar';
import { getSchoolDetails, SchoolDetails, Cafeteria } from '../../db';

export default function SchoolPage({ params }: { params: Promise<{ schoolName: string }> }) {
  const { schoolName } = React.use(params);
  const [schoolDetails, setSchoolDetails] = React.useState<SchoolDetails | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchSchoolDetails = async () => {
      // Implement getSchoolDetails function to fetch school data
      const details = await getSchoolDetails(decodeURIComponent(schoolName));
      setSchoolDetails(details);
    };
    fetchSchoolDetails();
  }, [schoolName]);

  if (!schoolDetails) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
          {schoolDetails.name}
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          {schoolDetails.cafeterias.length} cafeteria{schoolDetails.cafeterias.length !== 1 ? 's' : ''}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Don't see a cafeteria?{' '} 
          <MuiLink 
            component={Link} 
            href="/cafeterias/add" 
            sx={{ 
              color: '#F59E0B', 
              textDecoration: 'underline', // Ensure underline is shown
              textDecorationColor: '#F59E0B', // Set underline color to yellow
              '&:hover': {
                textDecorationColor: '#D97706', // Optional: Change underline color on hover
              }
            }}
          >
            Add it now!
          </MuiLink>
      </Typography>
      
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          mt: 4 
        }}>
          {schoolDetails.cafeterias.map((cafeteria, index) => (
            <Box 
              key={index} 
              sx={{ 
                flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                flexGrow: 0,
                flexShrink: 0
              }}
            >
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onClick={() => router.push(`/cafeterias/${encodeURIComponent(cafeteria.name)}`)}
              >
                <CardMedia
                  component="img"
                  height="10"
                  image={cafeteria.imageUrl}
                  alt={cafeteria.name}
                />
                <CardContent sx={{ flexGrow: 1, backgroundColor: '#F59E0B', color: 'white' }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {cafeteria.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
}
