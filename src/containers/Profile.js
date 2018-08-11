import React, { Component } from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: ['profile']
    }
    this.clickTag = this.clickTag.bind(this)
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags })
  }

  componentDidMount() {
    this.props.getOnlineUser(this.props.auth.user.username)
  }

  render() {

    let navButton = this.state.tags[0] === 'profile' ? null 
    : <MyProfile onClick={() => {
      this.props.getOnlineUser(this.props.auth.user.username)
      this.clickTag('profile')
    }}> My Profile </MyProfile>

    let userList = this.props.online.users && Object.keys(this.props.online.users).map((username) => {
      if (username != this.props.auth.user.username)
      return <User onClick={() => { 
        this.props.getOnlineUser(username) 
        this.clickTag('user')
      }}>{username}</User>
    })

    return (
      <Layout>
        <Navbar {...this.props} active={'profile'} />
        <Body>
          <UserProfile>
            <Username>{this.props.online.user.username}</Username>
            <Stats>
              <Rank>Rank:</Rank><Value>{this.props.online.user.rank}</Value>
              <Rating>Rating:</Rating><Value>{this.props.online.user.rating}</Value>
              <Wins>Wins:</Wins><Value>{this.props.online.user.wins}</Value>
            </Stats>
            {navButton}
          </UserProfile>
          <OnlineUsers>
            <Online>Online Users</Online>
            <UserList>{userList}</UserList>
          </OnlineUsers>
        </Body>
        <Footer />
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  height: 100vh;
  width: 100vw;
`
const Body = styled.div`
  grid-row: 2;
  grid-column: 1 / 13;
  min-height: 82vh;
  background: grey;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  background: grey;
`
const UserProfile = styled.div`
  grid-column: 1; 
  height: 82vh;
  background: dimgrey;
  display: grid;
  grid-template-rows: 50px 450px 50px;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr;
`
const Username = styled.h1`
  justify-self: center;
  grid-column: 1 / 3;
  font-size: 40px;
`
const Stats = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 50px 50px;
  margin-top: 2em;
`
const Rank = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`
const Rating = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`
const Wins = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`
const Value = styled.h2`
  grid-column: 2;
  justify-self: left;
`
const MyProfile = styled.button`
  grid-row: 3;
  grid-column: 1 / 3;
  justify-self: center;
  width: 150px;
  height: 50px;
  background: darkred;
  color: gainsboro;
  font-size: 20px;
  cursor: pointer;
  &:hover{
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    cursor: pointer;
  }
`
const OnlineUsers = styled.div`
  grid-column: 2;
  height: 82vh;
  background: #333333;
  display: grid;
  grid-template-rows: 50px auto;
`
const Online = styled.h1`
  grid-row: 1;
  justify-self: center;
  font-size: 40px;
  color: #f2f2f2;
`
const UserList = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 50px);
  grid-row-gap: 2px;
  margin-top: 4em;
  height: 60vh;
  overflow: auto;
  justify-self: left;
  margin-left: 4em;
`
const User = styled.h2`
  font-size: 24px;
  color: darkorange;
  justify-self: center;
  cursor: pointer;
`
