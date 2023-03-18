import React from 'react';
import styled from 'styled-components';
import ContactCard from '../../UI/ContactCard/Index';

const Index = () => {
    return (
        <Container>
            <Wrapper>
                <p>Private Messages</p>
                {/* TODO: fetch liste des amis*/}
                <List>
                    <ContactCard isSelected={true} pseudo="Maks"  />
                    <ContactCard isSelected={false} pseudo="Maks"  />
                </List>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 240px;
    background-color: #2B2D31;
`;

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;


export default Index;
