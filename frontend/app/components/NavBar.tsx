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
import Image from 'next/image';

export const Navbar: React.FC = () => {
  // const { isLoggedIn, isLoading, toggleLogin, toggleRegister } = useAuth();
  const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    log.info('User logged out');
  };

  const handleProfile = async () => {
      log.debug("Profile clicked");
      router.push('/profile');
  }

  const buttonClasses = "px-4 py-2 rounded-md transition duration-300";

  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
<div className="flex items-center">
          {/* Logo to the left of the text */}
		  <Image 
  src="/logo.png" 
  alt="Rate My Cafeteria Logo" 
  width={80}  // Increase width
  height={80} // Increase height
  className="mr-2 max-w-[80px] max-h-[80px] object-contain"
  onClick={() => router.push('/')}
/>

          <Link href="/" className="text-white text-2xl font-bold hover:text-yellow-200 transition duration-300 hidden md:block"
          >
            RateMyCafeteria
          </Link>
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
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
      <Register isOpen={isRegisterOpen} onClose={toggleRegister} />
    </nav>
  );
};

export default Navbar;
