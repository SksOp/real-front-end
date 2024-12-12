import { AuthContext } from "@/auth/context/auth-context";
import { auth } from "@/firebase/config";
import {
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useContext } from "react";

// Email/Password Sign-Up
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Sign-Out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Sign-In with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("error signing with google", error);
  }
};

export const sendVerificationEmail = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent!");
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};
