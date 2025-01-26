'use client';

import React from 'react';
import { Navbar } from '../../../../components/NavBar';
import { Button } from '../../../../components/Button'; // Assuming you have a Button component
import { ReviewCard } from '../../../../components/ReviewCard'; // Assuming you can create or have a ReviewCard component
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CafeDetails, getReviews } from '../../../../db'; 

//export default function CafePage({ params }: { params: { schoolName: string, cafeName: string } }) {
export default function CafePage({ params }: { params: Promise<{ schoolName: string; cafeName: string }> }) {
  const [decodedSchoolName, setDecodedSchoolName] = React.useState<string | null>(null);
  const [decodedCafeName, setDecodedCafeName] = React.useState<string | null>(null);
  const [cafeDetails, setCafeDetails] = React.useState<CafeDetails | null>(null); 
  const [reviews, setReviews] = React.useState<object[]>([]);
  const router = useRouter();
useEffect(() => {
    params.then((resolvedParams) => {
      const { schoolName, cafeName } = resolvedParams;
      setDecodedSchoolName(decodeURIComponent(schoolName));
      setDecodedCafeName(decodeURIComponent(cafeName));
    });
  }, [params]);
  //const router = useRouter();
  useEffect(() => {
    const fetchCafeDetails = async () => {
      const reviews = await getReviews(decodedSchoolName, decodedCafeName);
      setReviews(reviews);
    };
    fetchCafeDetails();
  }, [params]);

  console.log(`in cafe page got reviews = ${reviews}`);
  const handleReviewRequest = () => {
    console.log('Write a review for:', decodedCafeName);
    router.push(`/school/${decodedSchoolName}/cafes/${decodedCafeName}/review`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 truncate max-w-full">{decodedCafeName}</h1>
          <p className="text-gray-600 mt-2">{reviews.length} reviews</p>
        </div>
        <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-4">
          <Button className="bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          onClick={handleReviewRequest}>
            Write a Review
          </Button>
          <Button className="bg-gray-400 text-white hover:bg-gray-300 px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          onClick={() => router.back()}>
            Return to {decodedSchoolName} Page
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
