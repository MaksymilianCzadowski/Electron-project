import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Index = ({ message }) => {
  const imgSrc =
    message.user.profile_picture || "/assets/svg/Discord_Logo_sans_texte.svg";
  const [date, setDate] = useState("");

  const getTransformedDate = (date) => {
    const createdAtMillis = date.seconds * 1000 + date.nanoseconds / 1000000;
    const createdAtDate = new Date(createdAtMillis);
    const now = new Date();
    const isToday = now.toDateString() === createdAtDate.toDateString();

    const hours = createdAtDate.getHours().toString().padStart(2, "0");
    const minutes = createdAtDate.getMinutes().toString().padStart(2, "0");
    if (isToday) {
      return `Today at ${hours}:${minutes}`;
    } else {
      const day = createdAtDate.getDate().toString().padStart(2, "0");
      const month = createdAtDate.getMonth().toString().padStart(2, "0");
      const year = createdAtDate.getFullYear().toString();
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  };

  useEffect(() => {
    setDate(getTransformedDate(message.createdAt));
  }, [message.createdAt]);

  return (
    <Container>
      <ProfileImageDiv>
        <ProfileImg src={imgSrc} />
      </ProfileImageDiv>
      <MessageData>
        <SenderNameAndDate>
          <Name>{message.user.username}</Name>
          <SentDate>{date}</SentDate>
        </SenderNameAndDate>
        <MessageContent>
          <Text>{message.text}</Text>
        </MessageContent>
      </MessageData>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding-inline: 10px;
  &&:hover {
    background-color: #2E3035;
    }
`;

const Name = styled.p`
  margin: 0;
  font-size: 16px;
  color: #f2f3f5;
  font-weight: 600;
`;

const SentDate = styled.p`
  margin-left: 4px;
  margin-x: 0;
  font-size: 12px;
  font-weight: 300;
  color: rgb(148, 155, 164);
`;

const Text = styled.p`
  margin: 0;
  color: #DBDEE1
  font-size: 14px;
  font-weight: 400;
`;

const ProfileImageDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const MessageData = styled.div`
  display: flex;
  flex-direction: column;
`;

const SenderNameAndDate = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  height: 22px;
`;

const MessageContent = styled.div`
  margin: 0;
  height: 22px;
`;

export default Index;
