'use client';

import Image from "next/image";
import {app} from './constants';
import { registerUser,loginUser, logoutUser } from "./auth";
// import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};


export default function Home() {
console.log(`${app.name} initialized`);
  let secret = "123456";
  console.log(`testos = ${process.env.NEXT_PUBLIC_TEST}`)
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => registerUser("hello@gmail.com",secret)}>Register</button>
      <button onClick={() => loginUser("hello2@gmail.com",secret)}>Login</button>
      <button onClick={() => logoutUser("hello@gmail.com",secret)}>Logout</button>
    </div>

  );
}
