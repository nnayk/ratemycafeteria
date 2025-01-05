'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../../../components/NavBar';
import { Button } from '../../../../../components/Button';
import { useRouter } from 'next/navigation';
import { Rating } from '@mui/material'; // Assuming you have MUI installed for the star ratings
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function WriteReviewPage({ params }: { params: { schoolName: string, cafeName: string } }) {
  const router = useRouter();
  const { schoolName, cafeName } = params;
  const decodedSchoolName = decodeURIComponent(schoolName);
  const decodedCafeName = decodeURIComponent(cafeName);

  const [quality, setQuality] = useState<number | null>(0);
  const [quantity, setQuantity] = useState<number | null>(0);
  const [pricing, setPricing] = useState<number | null>(0);
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhotos([...photos, ...Array.from(event.target.files)].slice(0, 3)); // Limit to 3 photos
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const reviewData = {
      quality,
      quantity,
      pricing,
      details,
      photos,
    };
    console.log('Review submitted:', reviewData);
    router.back(); // Navigate back after submission (replace with your API logic)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Write a Review for {decodedCafeName}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quality</label>
              <Rating
                value={quality}
                onChange={(_, value) => setQuality(value)}
                precision={0.5}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <Rating
                value={quantity}
                onChange={(_, value) => setQuantity(value)}
                precision={0.5}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Pricing</label>
              <Rating
                value={pricing}
                onChange={(_, value) => setPricing(value)}
                precision={0.5}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Share details of your experience</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Write about your experience..."
                rows={4}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Upload up to 3 photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-400"
              >
                <PhotoCamera className="mr-2" />
                Upload Photos
              </label>
              <div className="mt-2">
                {photos.map((photo, index) => (
                  <div key={index} className="text-sm text-gray-500">
                    {photo.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                className="bg-gray-400 text-white hover:bg-gray-300 px-4 py-2 rounded-md shadow-md"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md shadow-md"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
