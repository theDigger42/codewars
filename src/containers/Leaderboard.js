import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Leaderboard extends Component {

    componentDidMount() {
        this.props.getLeaderboard()
    }

    render() {
        console.log(this.props);
        let userList = this.props.score.users && this.props.score.users.map((user, i) => {
            return (
                <User>{i+1}: {user.username} - {user.score}</User>
            )
        })
        return (
            <Layout>
                <Navbar { ...this.props } active={'scores'}/>
                <Body>
                    <Title>High Scores</Title>
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
