import React from 'react'
import styled from 'styled-components'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const Navbar = (props) => {
  const navAuth = !props.auth.isAuthenticated ? (
    <Layout>
      <Title to='/'><img id="logo" src={logo}/></Title>
      <SignUp
        onClick={() => props.openModal('signup')}
      >
        Signup
    </SignUp>
      <LogIn
        onClick={() => props.openModal('login')}
      >
        Login
    </LogIn></Layout>
  ) : (
      <Layout>
        <Title to='/'><img id="logo" src={logo}/></Title>
        <Leaderboard><NavLink to='/leaderboard'>Leaderboard</NavLink></Leaderboard>
        <Challenge><NavLink to='/challenge'>Random</NavLink></Challenge>
        <Logout><NavLink onClick={() => props.logout()} to='/'>Logout</NavLink></Logout>
      </Layout>
    )

  return (
    <Layout>
      {navAuth}
      <Login
        username={props.input.username}
        password={props.input.password}
        openModal={props.openModal}
        closeModal={props.closeModal}
        signin={props.signin}
        login={props.login}
        showModal={props.modalReducer.login}
        message={props.modalReducer.message}
        addText={props.addText}
      />
      <Signup
        username={props.input.username}
        password={props.input.password}
        email={props.input.email}
        openModal={props.openModal}
        closeModal={props.closeModal}
        signup={props.signup}
        showModal={props.modalReducer.signup}
        message={props.modalReducer.message}
        addText={props.addText}
      />
    </Layout>
  )
}

export default Navbar

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 1.5fr 1fr 1fr;
  grid-column-gap: 1em;
  grid-row: 1;
  grid-column: 1 / 6;
  align-items: center;
  min-height: 75px;
  background: azure;
`

const SignUp = styled.button`
  grid-column: 4;
  font-size: 30px;
`

const LogIn = styled.button`
  grid-column: 5;
  background: red;
  font-size: 30px;
`

const Title = styled(Link)`
  cursor: pointer;
  background: dimgrey;
`
const NavLink = styled(Link)`
  cursor: pointer;
`
const Leaderboard = styled.div`
  grid-column: 3;
  font-size: 20px;
`
const Challenge = styled.div`
  grid-column: 4;
  font-size: 20px;
`
const Logout = styled.div`
  grid-column: 5;
  font-size: 20px;
`