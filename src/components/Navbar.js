import React, { Component } from 'react'
import styled from 'styled-components'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { disconnect } from '../socket/api';

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
        <Title to='/'><img id="logo" src={logo} alt="logo.png" /></Title>
        <Leaderboard><NavLink to='/scores' active={this.state.tags[0] === 'scores' ? 1 : 0} onClick={() =>
          this.clickTag('scores')
        }>Ratings</NavLink></Leaderboard>
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
          <Title to='/'><img id="logo" src={logo} alt="logo.png" /></Title>
          <Leaderboard><NavLink to='/scores' active={this.state.tags[0] === 'scores' ? 1 : 0} onClick={() =>
            this.clickTag('scores')}>Highscores</NavLink></Leaderboard>
          <Help><NavLink to='/help' active={this.state.tags[0] === 'help' ? 1 : 0} onClick={() =>
            this.clickTag('help')
          }>Help</NavLink></Help>
          {/* <Chat><NavLink to='/chat' active={this.state.tags[0] === 'chat' ? 1 : 0} onClick={() =>
            this.clickTag('chat')}>Chat</NavLink></Chat> */}
          <Challenge><NavLink to='/challenge' active={this.state.tags[0] === 'challenge' ? 1 : 0} onClick={() =>
            this.clickTag('challenge')}>Game</NavLink></Challenge>
          <Profile><NavLink to='/profile' active={this.state.tags[0] === 'profile' ? 1 : 0} onClick={() =>
            this.clickTag('profile')}>Lobby</NavLink></Profile>
          <Logout><NavLink onClick={() => {
            this.props.logout(this.props.auth.user)
          }} to='/'>Logout</NavLink></Logout>
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
  grid-column-gap: 20px;
  grid-template-columns: repeat(9, 1fr);
  background: #1a1a1a;
  align-items: center;
  justify-items: right;
  height: 10vh;
  width: 100vw;
`
const SignUp = styled.h2`
  grid-column: 8;
  font-size: 14px;
  color: white;
  cursor: pointer;
  justify-self: center;
  &:hover{
    color: maroon;
  }
`
const LogIn = styled.h2`
  grid-column: 9;
  font-size: 14px;
  color: white;
  cursor: pointer;
  justify-self: center;
  &:hover{
    color: maroon;
  }
`
const Title = styled(Link)`
  cursor: pointer;
  grid-column: 1 / 3;
  justify-self: left;
`
const NavLink = styled(Link)`
  cursor: pointer;
  color: white;
  &:hover{
    color: maroon;
  }
  ${({ active }) => active && `
    color: maroon;
  `};
`
const Leaderboard = styled.h2`
  grid-column: 5;
  font-size: 14px;
`
const Help = styled.h2`
  grid-column: 6;
  font-size: 14px;
`
// const Chat = styled.h4`
//   grid-column: 6;
//   font-size: 18px;
// `
const Challenge = styled.h2`
  grid-column: 7;
  font-size: 14px;
`
const Profile = styled.h2`
  grid-column: 8;
  font-size: 14px;
`
const Logout = styled.h2`
  grid-column: 9;
  font-size: 14px;
  margin-right: 1em;
`