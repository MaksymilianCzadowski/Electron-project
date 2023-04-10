import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContactCard from "../UI/ContactCard/Index";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase_setup/firebase";
import { handleUpdateUser } from "../../slices/userSlice";
import { handleActualConversation } from "../../slices/userSlice";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { fetchConversionId } from "../../utils/user";
import { createNewConversation } from "../../utils/user";

const Index = () => {
  const dispatch = useDispatch();
  const { data, isLoading, fetchData } = useFetch("users");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user: currentUser } = useSelector((state) => state.user);
  const [privateConversations, setPrivateConversations] = useState([]);

  // TODO: snapshot sur les conversations de l'utilisateur
  // useEffect(() => {
  //   if (currentUser) {
  //     const userRef = collection(firestore, "users");
  //     const q = query(userRef, where("id", "==", currentUser.id));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       console.log("querySnapshot", querySnapshot);
  //       const userData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       dispatch(handleUpdateUser(userData[0]));
  //     });
  //     return unsubscribe;
  //   }
  // }, [currentUser, dispatch]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Filter the current user from the list
      const updatedDocuments = data.filter((doc) => doc.id !== currentUser.id);
      setUsers(updatedDocuments);
    }
  }, [data, currentUser]);

  useEffect(() => {
    console.log("conversations", currentUser.conversations);
  }, [currentUser]);

  const openConversation = async (user) => {
    console.log(`Opening conversation with user ${user.id}`);
    setSelectedUser(user.id);
    await isConversationExist(user);
    await getConversation(user);
  };

  const getConversation = async (user) => {
    const conversationId = await fetchConversionId(currentUser.id, user.id);
    dispatch(handleActualConversation(conversationId));
  };

  const isConversationExist = async (user) => {
    let conversation = null;
    if (!currentUser.conversations) {
      console.log("No conversation exist");
    } else {
      conversation = currentUser.conversations.find(
        (conversation) => conversation.id === user.id
      );
    }

    if (conversation) {
      console.log("Conversation already exist");
      // dispatch(handleConversation(conversation));
    } else {
      console.log("Conversation does not exist");

      const newConversation = {
        id : user.id,
        username : user.username,
      };

      // create new document in conversations collection
      createNewConversation(currentUser, user);
      // add the conversation to the current user
      const userRef = collection(firestore, "users");
      const q = query(userRef, where("id", "==", currentUser.id));

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((document) => {
            const userRef = doc(firestore, "users", document.id);
            const currentUser = document.data();
            updateDoc(userRef, {
              conversations: [...currentUser.conversations, newConversation],
            });
            const updatedCurrentUser = {
              ...currentUser,
              conversations: [...currentUser.conversations, newConversation],
            };
            dispatch(handleUpdateUser(updatedCurrentUser));
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // add the conversation to the selected user
      const q2 = query(userRef, where("id", "==", user.id));
      const newConversationForSelectedUser = {
        id : currentUser.id,
        username : currentUser.username,
      }

      getDocs(q2)
        .then((querySnapshot) => {
          querySnapshot.forEach((document) => {
            const userRef = doc(firestore, "users", document.id);
            const selectedUser = document.data();
            updateDoc(userRef, {
              conversations: [...selectedUser.conversations, newConversationForSelectedUser],
            });
          });
        })
        .catch((error) => {
          console.log(error);
        }
      );
    }
  };

  return (
    <div>
      <List>
        {isLoading && <p>Loading...</p>}
        {currentUser.conversations &&
          currentUser.conversations.map((conversation) => (
            <ContactCard
              key={conversation.id}
              user={conversation}
              isSelected={selectedUser === conversation.id}
              onClick={() => openConversation(conversation)}
            />
          ))}
      </List>
      <h1>All Users</h1>
      <List>
        {isLoading && <p>Loading...</p>}
        {users &&
          users.map((user) => (
            <ContactCard
              key={user.id}
              user={user}
              isSelected={selectedUser === user.id}
              onClick={() => openConversation(user)}
            />
          ))}
      </List>
    </div>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default Index;
