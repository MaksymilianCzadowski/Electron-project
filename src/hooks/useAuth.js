import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import Cookies from "js-cookie";


const useAuth = (email, password, username = null) => {
  const [isLoadind, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const login = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      generateToken();
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const register = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          addDoc(collection(firestore, "users"), {
            id: userCredential.user.uid,
            username: username,
            email: email,
            created_at: new Date()
              .toLocaleDateString("fr-FR")
              .split("/")
              .reverse()
              .join("/"),
            description: "",
            profile_picture: "",
            conversations: [],
            tag: Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0"),
          });
          generateToken();
          setIsLoading(false);
        }
      );
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        Cookies.remove("token");
        // Sign-out successful.
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const generateToken = async () => {
    const auth = getAuth();
    //voir à mettre en secure et httpOnly si possible
    const token = await auth.currentUser.getIdToken();
    setToken(token);
  };

  return { login, register, logout, token, isLoadind, isError, errorMessage };
};

export default useAuth;
