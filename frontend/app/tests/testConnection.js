// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Populate with your own firebase config
}
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);

async function getSchools() {
  try {
    const querySnapshot = await getDocs(collection(db, "schools"));
    const schools = querySnapshot.docs.map(doc => doc.data());
    console.log("Schools:", schools);
    return schools;
  } catch (error) {
    console.error("Error getting schools:", error);
    return [];
  }
}

getSchools();
// # const analytics = getAnalytics(app);
