import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize providers
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  // Configure Google provider
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  
  // Configure providers with additional scopes if needed
  googleProvider.addScope('profile');
  googleProvider.addScope('email');

  // -----------------------
  // GOOGLE SIGN IN
  // -----------------------
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // -----------------------
  // GITHUB SIGN IN
  // -----------------------
  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // -----------------------
  // REGISTER USER WITH EMAIL/PASSWORD
  // -----------------------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // -----------------------
  // LOGIN USER WITH EMAIL/PASSWORD
  // -----------------------
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // -----------------------
  // LOGOUT
  // -----------------------
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // -----------------------
  // UPDATE PROFILE
  // -----------------------
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // -----------------------
  // GET USER TOKEN (for backend authentication)
  // -----------------------
  const getToken = async () => {
    try {
      if (user) {
        const token = await user.getIdToken();
        return token;
      }
      return null;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  // -----------------------
  // OBSERVE USER AUTH STATE
  // -----------------------
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // If user exists, you can automatically get token for backend
      if (currentUser) {
        const token = await currentUser.getIdToken();
        console.log("Auth Changed - User:", currentUser.email);
        console.log("Auth Token:", token.substring(0, 20) + "...");
        
        // Store token in localStorage or context for axios interceptor
        localStorage.setItem('auth-token', token);
      } else {
        localStorage.removeItem('auth-token');
      }
    });

    return () => unSubscribe();
  }, []);

  // -----------------------
  // HANDLE AUTH ERRORS
  // -----------------------
  const handleAuthError = (error) => {
    let errorMessage = "Authentication failed. Please try again.";
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = "Sign-in popup was closed. Please try again.";
        break;
      case 'auth/popup-blocked':
        errorMessage = "Popup was blocked by your browser. Please allow popups for this site.";
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = "Sign-in was cancelled.";
        break;
      case 'auth/account-exists-with-different-credential':
        errorMessage = "An account already exists with the same email address but different sign-in credentials.";
        break;
      case 'auth/email-already-in-use':
        errorMessage = "Email is already registered. Please try logging in.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email address.";
        break;
      case 'auth/user-disabled':
        errorMessage = "This account has been disabled.";
        break;
      case 'auth/user-not-found':
        errorMessage = "No account found with this email.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your internet connection.";
        break;
      default:
        errorMessage = error.message || "Authentication error occurred.";
    }
    
    return errorMessage;
  };

  // AUTH CONTEXT DATA
  const authInfo = {
    user,
    loading,
    // Email/Password Auth
    registerUser,
    signInUser,
    logOut,
    updateUserProfile,
    // Social Auth
    googleSignIn,
    githubSignIn,
    // Utility functions
    getToken,
    handleAuthError,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;