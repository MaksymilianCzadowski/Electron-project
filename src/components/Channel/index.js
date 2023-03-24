import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import Input from "../UI/Input";
import MessageList from "../MessagesList";

const Index = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { id, username, profil_picture } = user;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return unsubscribe;
  }, []);

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
    addDoc(collection(firestore, "messages"), {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: id,
      username,
    });
    setNewMessage("");
  };

  return (
    <Container>
      <MessageList messages={messages} />
      <DivInput>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            required={true}
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
        </Form>
      </DivInput>
    </Container>
  );
};

const DivInput = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: green;
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
