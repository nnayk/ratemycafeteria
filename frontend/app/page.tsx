'use client';

import Image from "next/image";
import {app} from './constants';
import { registerUser,loginUser, logoutUser } from "./auth";
import { Navbar } from "./components/NavBar";
import {Hero } from "./components/Hero";
import {Footer} from "./components/Footer";

const firebaseConfig = {
  //...
};

export default function Home() {
  console.log(`${app.name} initialized`);
  let secret = "123456";
  console.log(`testos = ${process.env.NEXT_PUBLIC_TEST}`)
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-grow">
        <Hero/>
      </main>
      <Footer/>
    </div>
  );
}
