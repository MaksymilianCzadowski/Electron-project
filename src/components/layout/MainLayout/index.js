import React from "react";
import styled from "styled-components";
import Navigation from "../../Navigation";

const Index = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        {/* <Navigation /> */}
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
`;

export default Index;
