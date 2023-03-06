import React from "react";
import styled from "styled-components";
import Navigation from "../../Navigation";

const Index = ({ children }) => {
  const imgSrc = "/assets/images/background/discord-background.png";
  return (
    <LayoutContainer backgroundImage={imgSrc}>
      <Container>
        {/* <Navigation /> */}
        {children}
      </Container>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 25%;
  padding: 20px 20px;
  background-color: #313338;
  border-radius: 3px;
`;

export default Index;
