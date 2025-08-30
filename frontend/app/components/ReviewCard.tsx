import React from 'react';
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/outline';
import { Review } from '../db';	
import { useState } from 'react';
import { log } from "../utils/logger"; 


interface ReviewCardProps {
  review: Review;
  school: string;
  cafe: string;
  isSourced?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, school, cafe, isSourced }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);

  log.debug(`in ReviewCard quality = ${review.quality}, quantity = ${review.quantity}, pricing = ${review.pricing}`);

  const handleLike = async (reviewId: string) => {
    log.debug("inside addLike");	
    log.debug(`school=${school}, cafe=${cafe}, reviewId=${reviewId}`);
    setLikes(likes + 1);
    // await addLike(reviewId, school, cafe);
  };

  const handleDislike = async (reviewId: string) => {
    log("inside addLike");	
    log(`school=${school}, cafe=${cafe}, reviewId=${reviewId}`);
    setDislikes(dislikes + 1);
    // await removeLike(reviewId, school, cafe);
  };
  
  log(`in ReviewCard got review with num photos = ${review.photos.length}`);
  return (
    <div className="border rounded-md p-4 shadow-md">
      {/* Ratings Row */}
      {!isSourced && (
       <div className="flex flex-wrap items-center text-sm mb-2 gap-2 sm:gap-4">
         <span className="flex items-center">Quality: {renderStars(review.quality)}</span>
         <span className="hidden sm:inline">|</span>
         <span className="flex items-center">Quantity: {renderStars(review.quantity)}</span>
         <span className="hidden sm:inline">|</span>
         <span className="flex items-center">Pricing: {renderStars(review.pricing)}</span>
       </div>
      )}

      {/* Date */}
      <div className="text-xs text-gray-500 mb-2">{review.date}</div>

      {/* Review Text */}
      <p className="mb-4">{review.details}</p>
       {isSourced && review.source && (
           <p className="text-xs text-gray-500 italic mt-2">
               Source: <a href={review.link} target="_blank" rel="noopener noreferrer" className="underline">{review.source}</a>
           </p>
       )}

{/* Photos */}
      {review.photos.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(photo)}
            >
              <img
                src={photo}
                alt={`Review photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Image Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close when clicking outside
        >
          <div className="relative">
            <button
              className="absolute -top-4 -right-4 bg-white text-black rounded-full p-1 w-8 h-8 flex items-center justify-center text-xl shadow-lg"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img src={selectedImage} alt="Enlarged preview" className="max-w-full max-h-[90vh] rounded-lg shadow-lg" />
          </div>
        </div>
      )}


      {/* Like/Dislike */}
      {/*
      <div className="flex items-center space-x-4">
        <button 
        className="flex items-center space-x-1 text-green-600"
        onClick={() => handleLike(review.id)}
        >
          👍 <span>{likes}</span>
        </button>
        <button 
        className="flex items-center space-x-1 text-red-600"
        onClick={() => handleDislike(review.id)}
        >
          👎 <span>{dislikes}</span>
        </button>
      </div>
      */}
    </div>
  );
};

function renderStars(rating: number) {
  const stars : React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<SolidStarIcon key={i} className="h-5 w-5 text-yellow-500" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <div
          key={i}
          className="relative h-5 w-5"
        >
          <SolidStarIcon className="absolute left-0 h-5 w-5 text-yellow-500" style={{ clipPath: 'inset(0 50% 0 0)' }} />
          <OutlineStarIcon className="absolute left-0 h-5 w-5 text-gray-300" />
        </div>
      );
    } else {
      stars.push(<OutlineStarIcon key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  return <div className="flex">{stars}</div>;
}
