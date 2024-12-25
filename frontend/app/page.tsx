import Image from "next/image";
import {app} from './constants';
// import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};


export default function Home() {
console.log(`${app.name} initialized`);
  return (
    <div>
      <h1>yelo</h1>
    </div>

  );
}
