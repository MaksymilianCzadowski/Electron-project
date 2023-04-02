import { collection, getDocs, query, where, addDoc, doc } from "firebase/firestore";
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

export const createNewConversation = async (currentUser, user) => {
  const sortedParticipants = [currentUser.id, user.id].sort().join(",");
  const newConversation = {
    participants: sortedParticipants,
  }
  let conversationRef = collection(firestore, "conversations");
  await addDoc(conversationRef, newConversation);
  const conversationId = await fetchConversionId(currentUser.id, user.id);
  conversationRef = doc(firestore, "conversations", conversationId);
  const messageRef = collection(conversationRef, "messages");
  await addDoc(messageRef, {
    text: "Hello",
    createdAt: new Date(),
    user: {
      id: currentUser.id,
      name: currentUser.username,
    },
  });
};

export const fetchConversionId = async (currentUserId, userId) => {
  const sortedParticipants = [currentUserId, userId].sort().join(",");
  let conversation = null;
  const conversationRef = collection(firestore, "conversations");
  const q = query(conversationRef, 
    where("participants", "==", sortedParticipants));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    conversation = doc.id;
  });
  return conversation;
}
