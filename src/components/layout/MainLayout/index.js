import React from "react";
import styled from "styled-components";
import PublicChannels from "../../sideBar/PublicChannels/Index"



const Index = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <PublicChannels />
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  background-color: #313338;
  display: flex;
`;

export default Index;
