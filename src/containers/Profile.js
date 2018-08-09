import React, { Component } from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Profile extends Component {
  render() {
    let userList = this.props.online.users.map((user) => {
      return <User>{user && user.username}</User>
    })
    return (
      <Layout>
        <Navbar {...this.props} active={'profile'} />
        <Body>
          <UserProfile>
            <Username>{this.props.auth.user.username}</Username>
            <Stats>
              <Rank>Rank:</Rank><Value>{this.props.auth.user.rank}</Value>
              <Rating>Rating:</Rating><Value>{this.props.auth.user.rating}</Value>
              <Wins>Wins:</Wins><Value>{this.props.auth.user.wins}</Value>
            </Stats>
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
  min-height: 80vh;
  background: grey;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  background: grey;
`
const UserProfile = styled.div`
  grid-column: 1; 
  height: 80vh;
  background: grey;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr;
`
const Username = styled.h1`
  justify-self: center;
  grid-column: 1 / 3;
  font-size: 40px;
`
const Stats = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 50px;
  margin-top: 2em;
`
const Rank = styled.h2`
  grid-column: 1;
  justify-self: left;
  margin-left: 1em;
`
const Rating = styled.h2`
  grid-column: 1;
  justify-self: left;
  margin-left: 1em;
`
const Wins = styled.h2`
  grid-column: 1;
  jyustify-self: left;
  margin-left: 1em;
`
const Value = styled.h2`
  grid-column: 2;
  justify-self: center;
`
const OnlineUsers = styled.div`
  grid-column: 2;
  height: 80vh;
  background: dimgrey;
  display: grid;
  grid-template-rows: 50px auto;
`
const Online = styled.h1`
  grid-row: 1;
  justify-self: center;
  font-size: 40px;
`
const UserList = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: 50px;
  grid-row-gap: 20px;
  margin-top: 2em;
`
const User = styled.h2`
  font-size: 24px;
  color: maroon;
  justify-self: center;
  cursor: pointer;
`
