'use client';

import React from 'react';
import { Navbar } from './components/NavBar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { Loading } from './components/Loading';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';

const ComingSoon: React.FC = () => {
  return (
    <div className="bg-yellow-50 text-center py-12 px-6 rounded-lg shadow-md max-w-3xl mx-auto border border-yellow-400">
      <h2 className="text-2xl font-bold text-yellow-700">🍽️ Coming Soon: Food Tier Ratings! 🍽️</h2>
      <p className="text-gray-700 mt-4 text-lg">
        We're introducing a new feature where students can contribute to a public food tier list! 
        Rate your school's cafeteria from <span className="font-bold text-green-600">A</span> to 
        <span className="font-bold text-red-600"> F</span> and help others discover the best (or worst) spots on campus.
      </p>
      <p className="mt-4 text-gray-600">Stay tuned for updates! 🚀</p>
    </div>
  );
};

export default function Home() {
  // if(isLoading) {
  //   return <Loading />;
  // }
  // getDb();
  // const { isLoggedIn,isLoading,isLoginOpen, isRegisterOpen, toggleLogin, toggleRegister } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="mt-6 mb-16"> {/* Slight gap below Hero, still keeps space from footer */}
          <ComingSoon />
        </div>
      </main>
      <Footer />
      {/* <Login isOpen={isLoginOpen} onClose={toggleLogin} /> */}
      {/* <Register isOpen={isRegisterOpen} onClose={toggleRegister} /> */}
    </div>
  );
}
