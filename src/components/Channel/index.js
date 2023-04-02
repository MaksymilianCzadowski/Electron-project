import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import Input from "../UI/Input";
import MessageList from "../MessagesList";
import { useSelector } from "react-redux";

const Index = ({ user }) => {
  const actualConversation = useSelector(
    (state) => state.user.actualConversation
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { id, username, profil_picture } = user;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (actualConversation) {
      const conversationRef = collection(firestore, "conversations");
      const conversationDocRef = doc(conversationRef, actualConversation);
      const messageRef = collection(conversationDocRef, "messages");
      const q = query(messageRef, orderBy("createdAt"), limit(100));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs
          .filter((doc) => doc.data().createdAt) // Vérifie si la propriété createdAt est définie
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setMessages(messagesData);
      });
      return unsubscribe;
    }
  }, [actualConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting", newMessage);
    const conversationRef = doc(firestore, "conversations", actualConversation);
    const messageRef = collection(conversationRef, "messages");
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: {
        uid: id,
        username,
      },
    });
    setNewMessage("");
  };

  return (
    <Container>
      <MessageList messages={messages} />
      <DivInput>
        <Form onSubmit={(e) => handleSubmit(e)}>
          { actualConversation && 
          <Input
            type="text"
            required={true}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
           }
        </Form>
      </DivInput>
    </Container>
  );
};

const DivInput = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export default Index;
