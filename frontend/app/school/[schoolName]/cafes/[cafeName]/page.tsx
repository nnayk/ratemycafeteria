'use client';

import React from 'react';
import { Navbar } from '../../../../components/NavBar';
import { Button } from '../../../../components/Button'; // Assuming you have a Button component
import { ReviewCard } from '../../../../components/ReviewCard'; // Assuming you can create or have a ReviewCard component

export default function CafePage({ params }: { params: { schoolName: string, cafeName: string } }) {
  const { schoolName, cafeName } = React.use(params);
  const reviews = [
    {
      quality: 4,
      quantity: 5,
      pricing: 1,
      date: '2025-01-01',
      text: 'Great food, but a bit pricey.',
      likes: 12,
      dislikes: 2,
    },
    // Add more review objects here...
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 truncate max-w-full">{cafeName}</h1>
          <p className="text-gray-600 mt-2">{reviews.length} reviews</p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-4">
          <Button className="bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md shadow-md w-full sm:w-auto">
            Write a Review
          </Button>
          <Button className="bg-gray-400 text-white hover:bg-gray-300 px-4 py-2 rounded-md shadow-md w-full sm:w-auto">
            Return to {schoolName} Page
          </Button>
        </div>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </main>
    </div>
  );
}
