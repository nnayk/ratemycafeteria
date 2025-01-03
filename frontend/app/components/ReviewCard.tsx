import React from 'react';
import { StarIcon as SolidStarIcon } from '@heroicons/react/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/outline';

interface Review {
  quality: number;
  quantity: number;
  pricing: number;
  date: string;
  text: string;
  likes: number;
  dislikes: number;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      {/* Ratings Row */}
      <div className="flex flex-wrap items-center text-sm mb-2 gap-2 sm:gap-4">
        <span className="flex items-center">Quality: {renderStars(review.quality)}</span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center">Quantity: {renderStars(review.quantity)}</span>
        <span className="hidden sm:inline">|</span>
        <span className="flex items-center">Pricing: {renderStars(review.pricing)}</span>
      </div>

      {/* Date */}
      <div className="text-xs text-gray-500 mb-2">{review.date}</div>

      {/* Review Text */}
      <p className="mb-4">{review.text}</p>

      {/* Like/Dislike */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-green-600">
          👍 <span>{review.likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-red-600">
          👎 <span>{review.dislikes}</span>
        </button>
      </div>
    </div>
  );
};

function renderStars(rating: number) {
  rating += 0.5;
  const stars = [];
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
