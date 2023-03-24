import React, { useEffect } from "react";
import styled from "styled-components";
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { firestore } from "../../firebase_setup/firebase";

const Index = ({ user, db }) => {
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return unsubscribe;
  }, []);

  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>
          <p>{message.text}</p>
        </li>
      ))}
    </ul>
  );
};

export default Index;
