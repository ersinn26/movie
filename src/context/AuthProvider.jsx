import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helper/ToastNotify";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName,
      });
      navigate("/login");
      toastSuccessNotify("Account created successfully");
      console.log(userCredential);
    } catch (error) {
      toastSuccessNotify(error.message);
      console.log(error);
    }
  };
  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toastSuccessNotify("Login successfully");
      // console.log(userCredential);
    } catch (error) {
      toastSuccessNotify(error.message);
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toastSuccessNotify("Logout successfully");
      })
      .catch((error) => {});
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        setCurrentUser(false);
      }
    });
  };

  const googleProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        toastSuccessNotify("Login successfully");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Check your email");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const values = { currentUser, createUser, signIn, logOut, googleProvider, forgotPassword };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
