import React from 'react';
import styled from 'styled-components';

const Index = () => {
    const homeSvgSrc = "/assets/svg/Discord_Logo_sans_texte.svg";

    return (
        <Container>
            <Wrapper>
                <MainButton>
                    <HomeIcon src={homeSvgSrc} alt="Home icon" />
                </MainButton>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 10%;
    padding: 20px 20px;
    background-color: #1e1f22;
    border-radius: 3px;
`;

const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
`;

const MainButton = styled.button`
    background-color: #5865f2;
    border-radius: 10px;
    border: none;
    color: white;
    margin: 10px;
`;

const HomeIcon = styled.img.attrs((props) => ({
  src: props.src,
  alt: "Home icon",
}))`
  width: 20px;
  height: 20px;
`;

export default Index;
