import Image from "next/image";
import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);

export default function Home() {
  return (
    <div>
      <h1>yelo</h1>
    </div>

  );
}
