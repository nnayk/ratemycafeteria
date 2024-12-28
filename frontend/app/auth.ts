import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { app } from './constants';

export const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(`User with id ${uid} is signed in:`, user);
    // ...
  } else {
    // User is signed out
    console.log("User is signed out");
    // ...
  }
});

export async function registerUser(email: string, password: string): Promise<UserCredential> {
    try {
      const actionCodeSettings = { 
        url: 'http://localhost:3000/',
      };
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(userCredential.user, actionCodeSettings).then(() => {
        console.log("Email verification sent!");
      }).catch((error) => {
        console.error("Email verification error:", error);
        // delete user
        throw error;
      });
        return userCredential;
        // console.log("User registered successfully:", userCredential.user);
        // return userCredential;
    } catch (error) {
        console.error("Registration error:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}

export async function loginUser(email: string, password: string): Promise<UserCredential> {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        console.error("Email not verified:", userCredential.user);
        await logoutUser(email, password);
        throw new Error("Email not verified. Please verify your email.");
      }
      console.log("User logged in successfully:", userCredential.user);
      return userCredential;
  } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}

export async function logoutUser(email: string, password: string): Promise<void> {
  try {
    signOut(auth);
  } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    const actionCodeSettings = { 
      url: 'http://localhost:3000/',
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  } catch (error) {
      console.error("Password reset error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}