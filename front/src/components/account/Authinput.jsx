import React from "react";
import styled from "styled-components";

const AuthInput = (props) => {
  return (
    <WrapperStyle marginBottom={props.marginBottom}>
      <LabelStyle htmlFor="name" color={props.color}>
        {props.label}
      </LabelStyle>
      <InputStyle
        {...props}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.$hasError && <ErrorText>{props.$errorText}</ErrorText>}
    </WrapperStyle>
  );
};

export default AuthInput;

const WrapperStyle = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
`;

const LabelStyle = styled.label`
  font-size: 1rem;
  margin-bottom: 0.3rem;
  // margin-left: 0.5rem;
  color: ${(props) => props.color || "white"};
`;

const InputStyle = styled.input`
  height: 35px;
  border-width: 1px;
  border-color: ${(props) => (props.$hasError ? "#FDA29B" : "#CED4DA")};
  border-radius: 8px;
  padding: 10px;
  border-style: solid;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 0.3rem;
  margin-left: 0.75rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
`;
