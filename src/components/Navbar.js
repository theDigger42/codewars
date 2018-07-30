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
      <Leaderboard><NavLink to='/scores'>Leaderboard</NavLink></Leaderboard>
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
        <Leaderboard><NavLink to='/scores'>Leaderboard</NavLink></Leaderboard>
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
  grid-row: 1;
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: black;
  align-items: center;
`
const SignUp = styled.div`
  grid-column: 7;
  font-size: 20px;
  color: white;
`
const LogIn = styled.div`
  grid-column: 8;
  font-size: 20px;
  color: white;
`
const Title = styled(Link)`
  cursor: pointer;
  grid-column: 1 / 3;
  justify-self: left;
`
const NavLink = styled(Link)`
  cursor: pointer;
  color: white;
`
const Leaderboard = styled.div`
  grid-column: 6;
  font-size: 20px;
  margin-right: 1em;
`
const Challenge = styled.div`
  grid-column: 7;
  font-size: 20px;
`
const Logout = styled.div`
  grid-column: 8;
  font-size: 20px;
`