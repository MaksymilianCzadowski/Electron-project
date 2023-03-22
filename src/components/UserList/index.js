import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ContactCard from "../UI/ContactCard/Index";
import useFetch from "../../hooks/useFetch";

const Index = ({ currentUser }) => {
  const { data, isLoading, isError, errorMessage, fetchData } =
    useFetch("users");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      // Filter the current user from the list
      const updatedDocuments = data.filter((doc) => doc.id !== currentUser.id);
      setUsers(updatedDocuments);
    }
  }, [data]);

  const openConversation = (id) => {
    // Code to open conversation with user with ID 'id'
    console.log(`Opening conversation with user ${id}`);
    setSelectedUser(id);
  };

  return (
    <List>
      {isLoading && <p>Loading...</p>}
      {users &&
        users.map((user) => (
          <ContactCard
            key={user.id}
            user={user}
            isSelected={selectedUser === user.id}
            onClick={() => openConversation(user.id)}
          />
        ))}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default Index;
