'use client';

import Image from "next/image";
import {app} from './constants';
import { registerUser,loginUser } from "./auth";
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
      <button onClick={() => registerUser("hello@gmail.com",secret)}>Click me</button>
    </div>

  );
}
