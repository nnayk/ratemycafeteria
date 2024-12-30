'use client';

import React from 'react';
import { Navbar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Loading } from './components/Loading';
import { useAuth } from './contexts/AuthContext';

export default function Home() {
  const { isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  // if(isLoading) {
  //   return <Loading />;
  // }
  // getDb();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
      <Register isOpen={isRegisterOpen} onClose={toggleRegister} />
    </div>
  );
}
