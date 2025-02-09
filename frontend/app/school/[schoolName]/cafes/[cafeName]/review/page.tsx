'use client';

import React, { useState } from 'react';
import { Navbar } from '../../../../../components/NavBar';
import { Button } from '../../../../../components/Button';
import { useRouter } from 'next/navigation';
import { Rating } from '@mui/material'; // Assuming you have MUI installed for the star ratings
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { addReviewRequest } from '../../../../../db';
import { useAuth } from '../../../../../contexts/AuthContext';
import { useEffect } from 'react';
import { Footer } from '../../../../../components/Footer';
// import { uploadPhotos } from '../../../../../backend';
import { log } from "../../../../../utils/logger"; 

//export default function WriteReviewPage({ params }: { params: { schoolName: string, cafeName: string } }) {
//  const router = useRouter();
//  const { schoolName, cafeName } = React.use(params);
//  const decodedSchoolName = decodeURIComponent(schoolName);
//  const decodedCafeName = decodeURIComponent(cafeName);
export default function WriteReviewPage({ params }: { params: Promise<{ schoolName: string; cafeName: string }> }) {
  const [decodedSchoolName, setDecodedSchoolName] = useState<string>("");
  const [decodedCafeName, setDecodedCafeName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      const { schoolName, cafeName } = resolvedParams;
      setDecodedSchoolName(decodeURIComponent(schoolName));
      setDecodedCafeName(decodeURIComponent(cafeName));
    });
  }, [params]);


  const [quality, setQuality] = useState<number | null>(0);
  const [quantity, setQuantity] = useState<number | null>(0);
  const [pricing, setPricing] = useState<number | null>(0);
  const [details, setDetails] = useState('');
  const [likes, setLikes] = useState<number | null>(0);
  const [dislikes, setDislikes] = useState<number | null>(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  const {user} = useAuth();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      log('event.target.files:', event.target.files);
      setPhotos([...photos, ...Array.from(event.target.files)].slice(0, 3)); // Limit to 3 photos
      event.target.value = null; // Clear the input after uploading
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    log('inside handleSubmit');
    event.preventDefault();
    // I want to store the date in YYYY-MM-DD format
    const date = new Date().toISOString().split('T')[0];
    log('Date:', date);
    const reviewData = {
      user,
      quality,
      quantity,
      pricing,
      details,
      date,
      likes,
      dislikes,
      photos,
    };
    addReviewRequest(decodedSchoolName, decodedCafeName, reviewData);
    log('Review submitted:', reviewData);
	setShowThankYouPopup(true);
	for (const photo of photos) {
        log('Photo:', photo.name);
    }
    //const data = uploadPhotos(photos, decodedSchoolName, decodedCafeName, reviewData);
    // router.back();
    //router.back(); // Navigate back after submission (replace with your API logic)
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-gray-800 mb-4 truncate">
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
                required
                minLength={5}
                maxLength={500}
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
    disabled={photos.length >= 3} // Disable the input when 3 photos are uploaded
  />
  <label
    htmlFor="photo-upload"
    className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer ${
      photos.length >= 3
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-yellow-500 text-white hover:bg-yellow-400"
    }`}
  >
    <PhotoCamera className="mr-2" />
    {photos.length >= 3 ? "Max Photos Uploaded" : "Upload Photos"}
  </label>
  <div className="mt-2">
    {photos.map((photo, index) => (
      <div
        key={index}
        className="flex items-center justify-between text-sm text-gray-500 border-b pb-2 mb-2"
      >
        <span>{photo.name}</span>
        <button
          type="button"
          onClick={() => {
            setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
            log('Deleted photo:', photo.name);
          }}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          aria-label={`Delete ${photo.name}`}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

            <div className="flex justify-between">
              <Button
                className="bg-gray-400 text-white hover:bg-gray-300 px-4 py-2 rounded-md shadow-md"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                className="bg-yellow-600 text-white hover:bg-yellow-500 px-4 py-2 rounded-md shadow-md"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </main>
{showThankYouPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Thanks, food critic!</h2>
      <p className="mb-6 text-gray-600"> Your review will be reviewed for any spam and then (hopefully) posted soon!</p>
      <div className="flex justify-between">
        <button
          onClick={() => {
              router.push(`/school/${encodeURIComponent(decodedSchoolName)}`);
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Write Another Review
        </button>
        <button
          onClick={() => {
            setShowThankYouPopup(false);
            router.back();
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
  <Footer />
    </div>
  );
}
