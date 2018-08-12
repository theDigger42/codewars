import React from "react";
import modal from "./Modal";
import styled from 'styled-components'

const handleClick = (e, cb, credentials) => {
  e.preventDefault()
  cb(credentials)
}

const handleChange = (cb, inputType, input) => {
  cb(inputType, input)
}

const Login = ({
  login,
  closeModal,
  username,
  password,
  showModal,
  addText,
  clear
}) => {

  const enterInput = e => {
    if (e.key === 'Enter' ) {
      handleClick(e, login, { username, password })
      clear()
    }
  }

  return modal({
    showModal,
    handleClose: () => closeModal("login")
  })(
    <Layout>
      <Title>LOGIN</Title>
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
      <Button onClick={e => {
        login({ username, password })
        clear()
      }}>
        Submit
      </Button>
    </Layout>
  )
}

export default Login

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px auto auto auto;
`
const Title = styled.h1`
  font-weight: bold;
  justify-self: center;
`
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
`

const Button = styled.button`
  grid-row: 4;
  background: white;
  color: smoke;
  width: 120px;
  position: relative;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.5em;
  border: 2px solid #993d00;
  border-radius: 8px;
  &:hover {
    background: orangered;
    color: white;
    cursor: pointer;
  }
  justify-self: center;
`