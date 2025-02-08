import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { app } from './constants';
import { log } from "./utils/logger"; 

export const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    log(`onAuthStateChanged: User with id ${uid} is signed in:`, user);
    log( ' yeah aight')
    // ...
  } else {
    // User is signed out
    log("onAuthStateChanged: User is signed out");
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
        log("Email verification sent!");
      }).catch((error) => {
        log("Email verification error:", error);
        // delete user
        throw error;
      });
        return userCredential;
        // log("User registered successfully:", userCredential.user);
        // return userCredential;
    } catch (error) {
        log("Registration error:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
}

export async function loginUser(email: string, password: string): Promise<UserCredential> {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        log("Email not verified:", userCredential.user);
        await logoutUser(email, password);
        throw new Error("Email not verified. Please verify your email.");
      }
      log("User logged in successfully:", userCredential.user);
      return userCredential;
  } catch (error) {
      log("Login error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}

export async function logoutUser(email: string, password: string): Promise<void> {
  try {
    signOut(auth);
  } catch (error) {
      log("Login error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    const actionCodeSettings = { 
      url: 'http://localhost:3000/', // TODO: change this url to the actual frontend url
    };
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
  } catch (error) {
      log("Password reset error:", error);
      throw error; // Re-throw the error to handle it in the calling code
  }
}
