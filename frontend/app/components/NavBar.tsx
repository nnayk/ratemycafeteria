'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../auth';
import Link from 'next/link';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import "../css/nav.css"
import { log } from "../utils/logger"; 
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  // const { isLoggedIn, isLoading, toggleLogin, toggleRegister } = useAuth();
  const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    log('User logged out');
  };

  const handleProfile = async () => {
      console.log("Profile clicked");
      router.push('/profile');
  }

  const buttonClasses = "px-4 py-2 rounded-md transition duration-300";

  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold hover:text-yellow-200 transition duration-300">
          RateMyCaf
        </Link> 
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
			  <button 
				  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeL6vxDf8SGlOoybnsfDLLTZv9fCf0p1KxkCzwCrw4oofewiQ/viewform?usp=header', '_blank')}
				  className={`${buttonClasses} bg-red-600 text-white hover:bg-red-500 ml-2`}
    		  >
				  File a Bug
      		  </button>
            </>
          )}
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
      <Register isOpen={isRegisterOpen} onClose={toggleRegister} />
    </nav>
  );
};

export default Navbar;
