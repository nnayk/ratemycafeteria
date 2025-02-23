'use client';

import React from 'react';
import { Navbar } from '../../../../components/NavBar';
import { Button } from '../../../../components/Button'; // Assuming you have a Button component
import { ReviewCard } from '../../../../components/ReviewCard'; // Assuming you can create or have a ReviewCard component
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Review, CafeDetails, getReviews, getCafeDetails } from '../../../../db'; 
import { Footer } from '../../../../components/Footer';
import { log } from "../../../../utils/logger"; 

//export default function CafePage({ params }: { params: { schoolName: string, cafeName: string } }) {
export default function CafePage({ params }: { params: Promise<{ schoolName: string; cafeName: string }> }) {
  const [decodedSchoolName, setDecodedSchoolName] = React.useState('');
  const [decodedCafeName, setDecodedCafeName] = React.useState('');
  const [cafeDetails, setCafeDetails] = React.useState<CafeDetails | null>(null);
  const [reviews, setReviews] = React.useState<Review[]>([]); 
  const router = useRouter();
useEffect(() => {
    params.then((resolvedParams) => {
      const { schoolName, cafeName } = resolvedParams;
      const realSchoolName = decodeURIComponent(schoolName);
      const realCafeName = decodeURIComponent(cafeName);
      setDecodedSchoolName(realSchoolName);
      setDecodedCafeName(realCafeName);
      const fetchCafeDetails = async () => {
      log(`schoolName = ${schoolName}, cafeName = ${cafeName}`);
      log(`Fetching details for ${realSchoolName}/${realCafeName}`);
      const reviews = await getReviews(realSchoolName, realCafeName);
	  for (const review of reviews) {
          log(`review photo urls = ${review.photos}`);
		  log(`review quantity = ${review.quantity}, quality = ${review.quality}, pricing = ${review.pricing}`);
      }
      setReviews(reviews);
      const cafeDetails = await getCafeDetails(realSchoolName, realCafeName);
      setCafeDetails(cafeDetails);
      log(`stars = ${cafeDetails.stars}`);
    };
    fetchCafeDetails();
    });
  }, [params]);
  //const router = useRouter();

  log(`in cafe page got reviews = ${reviews}`);
  const handleReviewRequest = () => {
    log('Write a review for:', decodedCafeName);
    router.push(`/school/${decodedSchoolName}/cafes/${decodedCafeName}/review`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
			<div className="text-center mb-6">
			  <h1 className="text-2xl font-bold text-gray-800 truncate max-w-full">{decodedCafeName}</h1>
			  <div className="flex justify-center space-x-4 mt-2 text-gray-600">
				<p>{reviews.length} reviews</p>
				<p>|</p>
				<p>{cafeDetails.stars}/5 stars</p>
			  </div>
			</div>
        <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-4">
          <Button className="bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          onClick={handleReviewRequest}>
            Write a Review
          </Button>
          <Button className="bg-gray-400 text-white hover:bg-gray-300 px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          onClick={() => router.push(`/school/${decodedSchoolName}`)}>
            Return to {decodedSchoolName} Page
          </Button>
        </div>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} school={decodedSchoolName} cafe={decodedCafeName} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
