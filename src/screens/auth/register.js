import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase_setup/firebase";
import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const docRef = addDoc(collection(firestore, "users"), {
          id: userCredential.user.uid,
          username: username,
          email: email,
          created_at: new Date().toLocaleDateString('fr-FR').split('/').reverse().join('/'),
          description: "",
          profile_picture: "",
          tag: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        });
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  

  return (
    <Wrapper>
      <h2>Create an account</h2>
      <FormContainer>
        <form className="boxFormRegister" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" title="Register" />
        </form>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default Register;
