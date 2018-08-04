import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Leaderboard extends Component {

    render() {
        let userList = this.props.score.leaderboard && this.props.score.leaderboard.map((user, i) => {
            return (
                <User key={i}>{i+1}: {user.username} - Rating: ({user.rating}) - Wins: ({user.wins}) </User>
            )
        })
        return (
            <Layout>
                <Navbar { ...this.props } active={'scores'}/>
                <Body>
                    <Title>Top Hackers</Title>
                    {userList}
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
`

const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 75px auto;
  grid-template-columns: 10% auto 10%;
  background: grey;
  min-height: 80vh;
`
const Title = styled.h1`
    grid-row: 1;
    grid-column: 2;
    justify-self: center;
`
const User = styled.span`
    grid-column: 2;
    font-size: 30px;
    justify-self: left;
`
