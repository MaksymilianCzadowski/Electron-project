import React from 'react';
import styled from 'styled-components';

const Index = ({isSelected, user, onClick}) => {
    const imgSrc = user.profile_picture || '/assets/svg/Discord_Logo_sans_texte.svg';
    return (
        <Container isSelected={isSelected} onClick={onClick}>
            <ProfileImgDiv>
                <ProfileImg src={imgSrc} />
            </ProfileImgDiv>
            <NameDiv>
                <Name isSelected={isSelected}>{user.username}</Name>
            </NameDiv>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 42px;
    background-color: ${({ isSelected }) => isSelected ? "#35373C" : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color: #35373C;
    }
    border-radius: 5px;
    margin-bottom: 5px;
`;

const ProfileImgDiv = styled.div`
    width: 32px;
    height: 32px;
    margin: 0 10px;
`;

const ProfileImg = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #fff;
`;

const NameDiv = styled.div`
    width: 100%;
`;

const Name = styled.div`
    color: ${({ isSelected }) => isSelected ? "#DBDEE1" : "#B8B9BF"};
    font-weight: ${({ isSelected }) => isSelected ? "bold" : "normal"};
`;

export default Index;
