import React, { createContext, useContext, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastSuccessNotify } from "../helper/ToastNotify";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  const createUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
    signOut(auth).then(() => {
      toastSuccessNotify("Logout successfully");
    })
    .catch((error) => {
      
    });
  };

  const values = { currentUser, createUser, signIn,logOut };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
