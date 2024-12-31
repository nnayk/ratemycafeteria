'use client';

import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/NavBar';
import { getSchoolDetails, SchoolDetails } from '../../db';

export default function SchoolPage({ params }: { params: { schoolName: string } }) {
  const { schoolName } = React.use(params); // Unwrap the promise using React.use()
  const [schoolDetails, setSchoolDetails] = React.useState<SchoolDetails | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchSchoolDetails = async () => {
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
        {/* Top of Page: School Name */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: '#F59E0B', fontWeight: 'bold', textAlign: 'center' }}
        >
          {schoolDetails.name}
        </Typography>

        {/* Number of Cafeterias */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: 'center', marginBottom: 2 }}
        >
          {schoolDetails.cafeterias.length} cafeteria{schoolDetails.cafeterias.length !== 1 ? 's' : ''}
        </Typography>

        {/* Add Cafeteria Link */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: 'center', marginBottom: 4 }}
        >
          Don’t see a cafeteria?{' '}
          <MuiLink
            component={Link}
            href="/cafeterias/add"
            sx={{
              color: '#F59E0B',
              textDecoration: 'underline',
              textDecorationColor: '#F59E0B',
              '&:hover': {
                textDecorationColor: '#D97706',
              },
            }}
          >
            Add it now!
          </MuiLink>
        </Typography>

        {/* Hero Component: Display of Cafeterias */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {schoolDetails.cafeterias.map((cafeteria, index) => (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 },
                width: 250,
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => router.push(`/cafeterias/${encodeURIComponent(cafeteria.name)}`)}
            >
              <CardMedia
                component="img"
                height="150"
                src={cafeteria.imageUrl}
                alt={cafeteria.name}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: '#F59E0B',
                    color: 'white',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {cafeteria.name}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
}
