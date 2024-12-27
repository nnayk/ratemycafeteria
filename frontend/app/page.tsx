'use client';

import React, { useState } from 'react';
import Image from "next/image";
import {app} from './constants';
import { registerUser, loginUser, logoutUser } from "./auth";
import { Navbar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";

const firebaseConfig = {
  //...
};

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);

  console.log(`${app.name} initialized`);
  let secret = "123456";
  console.log(`testos = ${process.env.NEXT_PUBLIC_TEST}`)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLoginClick={toggleLogin} />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
      <Login isOpen={isLoginOpen} onClose={toggleLogin} />
    </div>
  );
}
