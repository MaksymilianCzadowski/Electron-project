import React from 'react';
import styled from 'styled-components';

const Index = () => {
    return (
        <Wrapper>
            <Input type="text" />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 80%;
    background-color: #2b2d31;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
`;


export default Index;
