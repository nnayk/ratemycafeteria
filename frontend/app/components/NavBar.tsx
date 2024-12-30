'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../auth';
import "../css/nav.css"

export const Navbar: React.FC = () => {
  const { isLoggedIn, isLoading, toggleLogin, toggleRegister } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    console.log('User logged out');
  };

  const buttonClasses = "px-4 py-2 rounded-md transition duration-300";

  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          RateMyCafeteria
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="loading-ellipsis text-white">
                <span>Authenticating</span>
                <span className="dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            </div>
          ) : isLoggedIn ? (
            <>
              <button 
                onClick={() => console.log('Navigate to Profile')}
                className={`${buttonClasses} bg-white text-black hover:bg-yellow-100 mr-2`}
              >
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className={`${buttonClasses} bg-yellow-700 text-white hover:bg-yellow-600`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={toggleLogin}
                className={`${buttonClasses} bg-white text-black hover:bg-yellow-100 mr-2`}
              >
                Login
              </button>
              <button 
                onClick={toggleRegister}
                className={`${buttonClasses} bg-yellow-700 text-white hover:bg-yellow-600`}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
