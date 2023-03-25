import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  return (
    <Container>
      {messages.map((message) => (
        <Message key={message.uid}>{message.text}</Message>
      ))}
      <div ref={messagesEndRef} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const Message = styled.div`
  padding: 10px;
`;

export default MessageList;
