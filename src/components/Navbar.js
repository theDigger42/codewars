import React, { Component } from 'react'
import styled from 'styled-components'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: [this.props.active]
    }
    this.clickTag = this.clickTag.bind(this)
  }


  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags })
  }

  render() {
    const navBar = !this.props.auth.isAuthenticated ? (
      <Layout>
        <Title to='/'><img id="logo" src={logo}/></Title>
        <Leaderboard><NavLink to='/scores' active={this.state.tags[0] === 'scores'} onClick={() =>
          this.clickTag('scores')
        }>Leaderboard</NavLink></Leaderboard>
        <SignUp
          onClick={() => this.props.openModal('signup')}
        >
          Signup
      </SignUp>
        <LogIn
          onClick={() => this.props.openModal('login')}
        >
          Login
      </LogIn></Layout>
    ) : (
        <Layout>
          <Title to='/'><img id="logo" src={logo}/></Title>
          <Leaderboard><NavLink to='/scores' active={this.state.tags[0] === 'scores'} onClick={() =>
          this.clickTag('scores')}>Scores</NavLink></Leaderboard>
          <Challenge><NavLink to='/challenge' active={this.state.tags[0] === 'challenge'} onClick={() =>
          this.clickTag('challenge')}>Challenge</NavLink></Challenge>
          <Logout><NavLink onClick={() => this.props.logout()} to='/'>Logout</NavLink></Logout>
        </Layout>
      )
  
    return (
      <Layout>
        {navBar}
        <Login
          username={this.props.input.username}
          password={this.props.input.password}
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          signin={this.props.signin}
          login={this.props.login}
          showModal={this.props.modalReducer.login}
          message={this.props.modalReducer.message}
          addText={this.props.addText}
          clear={this.props.clearAll}
        />
        <Signup
          username={this.props.input.username}
          password={this.props.input.password}
          email={this.props.input.email}
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          signup={this.props.signup}
          showModal={this.props.modalReducer.signup}
          message={this.props.modalReducer.message}
          addText={this.props.addText}
          clear={this.props.clearAll}
        />
      </Layout>
    )
  }
}

const Layout = styled.div`
  grid-row: 1;
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  background: black;
  align-items: center;
  height: 10vh;
  width: 100vw;
`
const SignUp = styled.div`
  grid-column: 7;
  font-size: 20px;
  color: white;
  cursor: pointer;
  justify-self: center;
  &:hover{{
    color: maroon;
  }}
`
const LogIn = styled.div`
  grid-column: 8;
  font-size: 20px;
  color: white;
  cursor: pointer;
  justify-self: center;
  &:hover{{
    color: maroon;
  }}
`
const Title = styled(Link)`
  cursor: pointer;
  grid-column: 1 / 3;
  justify-self: left;
`
const NavLink = styled(Link)`
  cursor: pointer;
  color: white;
  &:hover{{
    color: maroon;
  }}
  ${({ active }) => active && `
    color: maroon;
  `};
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