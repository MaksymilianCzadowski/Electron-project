import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { handleMenu } from "../../../slices/menuSlice";

const Index = () => {
  const dispatch = useDispatch();
  const homeSvgSrc = "/assets/svg/Discord_Logo_sans_texte.svg";
  const [selectedOption, setSelectedOption] = useState("main");

  const handleClick = (option) => {
    dispatch(handleMenu(option));
    setSelectedOption(option);
  };

  return (
    <Container>
      <Wrapper>
        <List>
          <MainButton selected={selectedOption === "home"} onClick={() => handleClick("home")}>
            <SvgWrapper>
              <Image xlinkHref={homeSvgSrc} alt="Home icon" />
            </SvgWrapper>
            {selectedOption === "home" && <Indicator />}
          </MainButton>
          <hr />
          {/* TODO: fetch lite des serveurs */}
          <MainButton selected={selectedOption === "autre"} onClick={() => handleClick("autre")}>
            <SvgWrapper>
              <Image xlinkHref={homeSvgSrc} alt="Home icon" />
            </SvgWrapper>
            {selectedOption === "autre" && <Indicator />}
          </MainButton>
          <MainButton selected={selectedOption === "autre2"} onClick={() => handleClick("autre2")}>
            <SvgWrapper>
              <Image xlinkHref={homeSvgSrc} alt="Home icon" />
            </SvgWrapper>
            {selectedOption === "autre2" && <Indicator />}
          </MainButton>
          <MainButton selected={selectedOption === "autre3"} onClick={() => handleClick("autre3")}>
            <SvgWrapper>
              <Image xlinkHref={homeSvgSrc} alt="Home icon" />
            </SvgWrapper>
            {selectedOption === "autre3" && <Indicator />}
          </MainButton>
          <MainButton selected={selectedOption === "autre4"} onClick={() => handleClick("autre4")}>
            <SvgWrapper>
              <Image xlinkHref={homeSvgSrc} alt="Home icon" />
            </SvgWrapper>
            {selectedOption === "autre4" && <Indicator />}
          </MainButton>
        </List>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 72px;
  background-color: #1e1f22;
  border-radius: 3px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const MainButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ selected }) => selected ? "25%" : "50%"};
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${({ selected }) => selected ? "#fff" : "#313338"};

  &:hover {
    background-color: #fff;
    border-radius: 25%;
  }
`;

const SvgWrapper = styled.svg`
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  /* Changement de couleur lorsqu'on survole l'image */
  &:hover {
    path {
      fill: red;
    }
  }
`;

const Image = styled.image`
  width: 100%;
  height: 100%;
`;

const Indicator = styled.div`
  width: 5px;
  height: 40px;
  background-color: #7289da;
  position: absolute;
  left: -5px;
`;

export default Index;
