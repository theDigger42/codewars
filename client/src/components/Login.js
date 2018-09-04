import React from "react";
import modal from "./Modal";
import styled from "styled-components";

const handleClick = (e, cb, credentials) => {
  e.preventDefault();
  cb(credentials);
};

const handleChange = (cb, inputType, input) => {
  cb(inputType, input);
};

const Login = ({
  login,
  closeModal,
  username,
  password,
  error,
  showModal,
  addText,
  clear
}) => {
  const enterInput = e => {
    if (e.key === "Enter") {
      handleClick(e, login, { username, password });
      clear();
    }
  };

  return modal({
    showModal,
    handleClose: () => closeModal("login")
  })(
    <Layout>
      <Title>LOGIN</Title>
      <Verify>{error}</Verify>
      <Input
        value={username}
        onChange={e => handleChange(addText, "username", e.target.value)}
        placeholder="Username"
        type="text"
        required
        onKeyPress={enterInput}
      />
      <Input
        value={password}
        onChange={e => handleChange(addText, "password", e.target.value)}
        placeholder="Password"
        type="password"
        required
        onKeyPress={enterInput}
      />
      <Button
        onClick={e => {
          login({ username, password });
          clear();
        }}
      >
        Submit
      </Button>
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 50px auto auto auto;
`;
const Title = styled.h1`
  font-weight: bold;
  justify-self: center;
  color: black;
`;
const Verify = styled.p`
  color: red;
  justify-self: center;
  font-weight: bold;
  font-size: 18px;
`;
const Input = styled.input`
  padding: 0.5em;
  margin: 1.5em;
  background: ghostwhite;
  height: 30px;
  width: 300px;
  font-size: 16px;
  border: solid 2px black;
  border-radius: 3px;
  justify-self: center;
  @media (max-width: 600px) {
    width: 200px;
  }
`;

const Button = styled.button`
  font-size: 20px;
  width: 200px;
  border-radius: 10px;
  grid-row: 5;
  justify-self: center;
  height: 50px;
  &:hover {
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    border: 1px solid maroon;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    width: 100px;
  }
`;