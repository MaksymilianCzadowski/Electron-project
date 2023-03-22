import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(firestore, collectionName)
      );
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(documents);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return { data, isLoading, isError, errorMessage, fetchData };
};

export default useFetch;
