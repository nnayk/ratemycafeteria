'use client';

import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const faqs = [
  {
    question: 'Do I need an account?',
    answer: 'No, you do not need an account to leave a review or request a new school or cafeteria be added. Reviews from users with accounts from a .edu email will display a verified tag.',
  },
  {
    question: 'Do I need a .edu email to create an account?',
    answer: 'No, any email will work.',
  },
  {
    question: 'But what about inappropriate content or spam 😡? How will you handle that 😩?',
    answer: 'Currently all reviews will go through an approval process prior to being posted on the website.',
  },
];

const FAQ: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Box sx={{ padding: 4, flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Footer />
    </div>
  );
};

export default FAQ;

