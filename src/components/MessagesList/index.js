import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Message from "../UI/Message";
import { useSelector } from "react-redux";

const MessageList = ({ messages, user }) => {
  const { alertNotification } = window.electron;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
      console.log(messages);

    }
  }, [messages]);

  useEffect(() => {

    const lastMessage = messages[messages.length - 1];
    if(lastMessage && lastMessage.user.username !== user.username){
      alertNotification(lastMessage.user.username, lastMessage.text);
    }
  }, [user, messages])

  return (
    <Container>
      {messages.map((message) => (
        <MessageContainer>
          <Message key={message.id} message={message} />
        </MessageContainer>
      ))}
      <div ref={messagesEndRef} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
`;

export default MessageList;
