import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-white min-h-[50vh] flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Search a school to get started</h1>
      
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter school name..."
          className="w-full px-4 py-2 text-black rounded-md border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
      </div>
      
      <button className="mt-8 text-lg text-black underline transition duration-300">
        See all schools
      </button>
    </div>
  );
};

export default Hero;

