'use client';

import React from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Button, Link as MuiLink, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/NavBar';
import { Footer } from '../../components/Footer';
import { getSchoolDetails, SchoolDetails } from '../../db';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

export default function SchoolPage({ params }: { params: Promise<{ schoolName: string }> }) {
  console.log(`hello`)
  //const { schoolName } = React.use(params); // Unwrap the promise using React.use()
  const [schoolDetails, setSchoolDetails] = React.useState<SchoolDetails | null>(null);
  const [schoolName, setSchoolName] = React.useState('');
  const { isLoggedIn, isLoading, isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  const router = useRouter();

useEffect(() => {
    const fetchSchoolDetails = async () => {
      const resolvedParams = await params;
      const { schoolName } = resolvedParams;
      setSchoolName(schoolName);
      const details = await getSchoolDetails(decodeURIComponent(schoolName));
      setSchoolDetails(details);
    };

    fetchSchoolDetails();
  }, [params]);
  if (!schoolDetails) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Box sx={{ padding: 4, backgroundColor: 'white', flexGrow: 1, position: 'relative' }}>
      <Stack spacing={2}>
        {/* Back Button */}
        <Button
  variant="text"
  startIcon={<ArrowBackIcon />}
  sx={{
    position: { xs: 'static', sm: 'absolute' },
    top: { sm: 16 },
    left: { sm: 16 },
    color: '#F59E0B',
    '&:hover': {
      backgroundColor: '#FFF7E6',
    },
    mb: { xs: 2, sm: 0 }, // Add margin bottom on mobile
    alignSelf: { xs: 'flex-start', sm: 'auto' }, // Align to the left on mobile
  }}
  onClick={() => router.back()}
>
  Back
</Button>
 

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
          {schoolDetails.cafeterias.length} dining option{schoolDetails.cafeterias.length !== 1 ? 's' : ''}
        </Typography>

        {/* Add Cafeteria Link */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: 'center', marginBottom: 4 }}
        >
          Don’t see a dining option?{' '}
          <MuiLink
            component={Link}
            href={`/school/${schoolName}/cafes/add`}
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
              onClick={() => router.push(`/school/${schoolName}/cafes/${encodeURIComponent(cafeteria.name)}`)}
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
                    style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
                  >
                    {cafeteria.name}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Box>
        </Stack>
      </Box>
      <Footer />
    </div>
  );
}
