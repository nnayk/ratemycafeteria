'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth'; // Ensure you import your Firebase auth instance
import { Navbar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Register } from './components/Register';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsLoggedIn(true); // User is signed in
        console.log(`User with id ${user.uid} is signed in:`, user);
      } else {
        setIsLoggedIn(false); // User is signed out
        if (user) {
          console.log(`User with id ${user.uid} is signed in but not verified:`, user);
        } else {
          console.log("User is signed out");
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);
  const toggleRegister = () => setIsRegisterOpen(!isRegisterOpen);

  const handleLogout = async () => {
    await auth.signOut(); // Implement logout logic here
    console.log('User logged out');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLoginClick={toggleLogin} 
        onRegisterClick={toggleRegister} 
        onLogoutClick={handleLogout} 
      />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
      <Register isOpen={isRegisterOpen} onClose={toggleRegister} />
    </div>
  );
}
