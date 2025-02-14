'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar';	
import Footer from '../components/Footer';

const ProfileSidebar = () => {
  const [selectedOption, setSelectedOption] = useState('myReviews');
  const username = 'nnayak@calpoly.edu';

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
        <NavBar />

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64 py-6 px-4 border-r border-yellow-200">
              <div>
                  <h2 className="text-xl font-semibold text-gray-600">My Account</h2>
                  <p className="text-gray-600">{username}</p>
              </div>

              <div className="mt-6">
                  <button
                      onClick={() => handleOptionClick('myReviews')}
                      className={`block w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                          selectedOption === 'myReviews'
                              ? 'bg-yellow-200 text-gray-900 font-medium'
                              : 'text-gray-700 hover:bg-yellow-100 hover:text-gray-900'
                      }`}
                  >
                      My Reviews
                  </button>
                  <button
                      onClick={() => handleOptionClick('settings')}
                      className={`block w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                          selectedOption === 'settings'
                              ? 'bg-yellow-200 text-gray-900 font-medium'
                              : 'text-gray-700 hover:bg-yellow-100 hover:text-gray-900'
                      }`}
                  >
                      Settings
                  </button>
              </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
              {selectedOption === 'settings' && (
                  <div className="max-w-md">
                      <button className="bg-white border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 transition-colors duration-200">
                          Sign Out
                      </button>
                  </div>
              )}
              {selectedOption === 'myReviews' && (
                  <div>
                      <h1>My Reviews Content</h1>
                      <p>Display your reviews here.</p>
                  </div>
              )}
          </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileSidebar;

