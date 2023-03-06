import React from "react";
import styled from "styled-components";

const Index = ({
  name,
  type,
  required,
  value,
  onChange,
  placeHolder,
  label,
  disabled,
  minLength,
  maxLength,
}) => {
  return (
    <Wrapper>
      <LabelDiv>{label && <Label>{label}</Label>}</LabelDiv>
      <Input
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeHolder={placeHolder}
        disabled={disabled}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    background-color: #1E1F22;
    minLength: ${props => props.minLength || 'none'};
    maxLength: ${props => props.maxLength || 'none'};
    padding: 10px 0;
    border-radius: 3px;
    text-indent: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: lighter;
    type: ${(props) => props.type}
    cursor: pointer;
    &:disabled {
        background-color: #ccc;
        color: #fff;
        cursor: not-allowed;
    }
`;

const LabelDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #B8B9BF;
  text-transform: uppercase;
  font-weight: bold;
`;

export default Index;
