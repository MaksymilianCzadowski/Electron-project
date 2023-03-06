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
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    setLoader(true);
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
        setLoader(false);
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setLoader(false);
      });
  };
  

  return (
    <Wrapper>
      <h2>Create an account</h2>
      <FormContainer>
        {loader && <h3>Loading...</h3> }
        <form className="boxFormRegister" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            type="email"
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loader}
          />

          <Input
            label="Username"
            type="text"
            maxLength="20"
            onChange={(e) => setUsername(e.target.value)}
            disabled={loader}
          />

          <Input
            label="Password"
            type="password"
            minLength="6" 
            onChange={(e) => setPassword(e.target.value)}
            disabled={loader}
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
