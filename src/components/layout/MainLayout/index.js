import React from "react";
import styled from "styled-components";
import Selector from "../../sideBar/Selector/Index";
import PublicChannels from "../../sideBar/PublicChannels/Index";
import PrivateChannels from "../../sideBar/PrivateChannels/Index";
import { useSelector } from "react-redux";

const Index = ({ children }) => {
  const { menu } = useSelector((state) => state.menu);

  return (
    <Wrapper>
      <Container>
        <Selector />
        {menu === "home" ?
          <PrivateChannels >
            
          </PrivateChannels>
          :
          <PublicChannels />
        }
        {children}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  // overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  background-color: #313338;
  display: flex;
  height: 100%;
`;

export default Index;
