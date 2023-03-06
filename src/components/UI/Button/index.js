import React from "react";
import styled from "styled-components";

const Index = ({ type, title, disabled }) => {
  return (
    <Button type={type} disabled={disabled}>
      <TextButton>{title}</TextButton>
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  padding: 10px;
  border-radius: 3px;
  background-color: #5865F2;
  type: ${(props) => props.type}
  cursor: pointer;
`;

const TextButton = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: lighter;
`;

export default Index;
