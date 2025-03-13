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

    {/* Go Back Button */}
    <Button
      onClick={() => router.push('/')}
      variant="outlined"
      sx={{
        mt: 2,
        mb: 4,
        color: '#F59E0B',
        borderColor: '#F59E0B',
        alignSelf: 'center',
        '&:hover': {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: '#D97706',
        },
      }}
    >
      Go back to home page
    </Button>

    <Footer />
  </div>
);

