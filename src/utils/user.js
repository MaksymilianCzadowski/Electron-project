import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";


export const fetchUser = async (email) => {
  let user = null;
  const userRef = collection(firestore, "users");
  const q = query(userRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};
