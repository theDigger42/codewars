import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Leaderboard extends Component {

  render() {
    let userList = this.props.score.leaderboard.map((user, i) => {
      return (
        <User key={i}> {user.username} </User>
      )
    })
    let ratingList = this.props.score.leaderboard.map((user, i) => {
      return (
        <Rating key={i}> {user.rating} </Rating>
      )
    })
    return (
      <Layout>
        <Navbar {...this.props} active={'scores'} />
        <Title>Top Hackers</Title>
        <Body>
          <LeftDiv>{userList}</LeftDiv>
          <RightDiv>{ratingList}</RightDiv>
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
  width: 100vw;
  background: grey;
`
const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 20% 1fr 50px 1fr 20%;
  background: grey;
  min-height: 80vh;
`
const LeftDiv = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 10px;
  justify-self: right;
`
const RightDiv = styled.div`
  grid-row: 1;
  grid-column: 4;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 10px;
  justify-self: left;
`
const Title = styled.h1`
  grid-column: 1 / 13;
  justify-self: center;
  min-height: 50px;
  background: grey;
`
const User = styled.span`
  font-size: 30px;
  justify-self: right;
`
const Rating = styled.span`
  font-size: 30px;
  justify-self: left;
`
