import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import Panel from '../components/Panel'

import {
  subscribeToTimerSocket,
  getDateTimerSocket,
  subscribeToGameSocket,
  joinWaitingRoom,
  exitWaitingRoom
} from '../socket/api'

export default class Challenge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerTillNextGame: '',
      gameTimer: 60,
      isComplete: false
    }
    this.updateTimer = this.updateTimer.bind(this)
    this.updateGameTimer = this.updateGameTimer.bind(this)
    this.onGameStart = this.onGameStart.bind(this)
    this.setComplete = this.setComplete.bind(this)
  }

  setComplete(bool) {
    this.setState({
      isComplete: bool
    })
  }

  updateTimer(date) {
    let secondsTillNextGame = 60 - (new Date(date).getSeconds());
    this.setState({ timerTillNextGame: secondsTillNextGame });
    let timer = setInterval(() => {
      secondsTillNextGame--;
      this.setState({ timerTillNextGame: secondsTillNextGame });
      if (secondsTillNextGame <= -1) {
        clearInterval(timer);
        if (this.props.prompt.room === 'waiting') {
          this.props.getPrompt()
          this.props.changeRoom('game')
          this.setState({ isComplete: false })
          this.updateGameTimer();
        }
        getDateTimerSocket();
      }
    }, 1000)
  }

  updateGameTimer() {
    let secondsTillEndGame = this.state.gameTimer;
    let gameTimer = setInterval(() => {
      this.setState({ gameTimer: secondsTillEndGame });
      secondsTillEndGame--;
      if (secondsTillEndGame < 0) {
        clearInterval(gameTimer);
        setTimeout(() => {
          this.setState({ gameTimer: 60 })
        }, 2000)
      }
    }, 1000)
  }

  onGameStart() {
    console.log('game started');
  }

  componentWillMount() {
    getDateTimerSocket();
    subscribeToTimerSocket(this.updateTimer);
    subscribeToGameSocket(this.onGameStart, this.props.onScoreboardChange);
    joinWaitingRoom({ username: this.props.auth.user.username })
  }

  componentWillUnmount() {
    exitWaitingRoom({ username: this.props.auth.user.username })
  }

  suffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  render() {

    return (
      <Layout>
        <Navbar {...this.props} active={'challenge'} />
        <Prompt>{this.props.prompt.title}</Prompt>
        <Timer>Next game in: {this.state.timerTillNextGame}</Timer>
        <Editor input={this.props.prompt.solution} change={this.props.addText} />
        <Panel {...this.props} complete={this.setComplete} isComplete={this.state.isComplete} />
        <Footer />
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  background: dimgrey;
  height: 100vh;
  width: 100vw;
`
const Prompt = styled.h1`
  grid-column: 1 / 8;
  text-align: center;
  align-self: center;
  font-weight: bold;
`
const Timer = styled.h1`
  grid-column: 8 / 13;
  text-align: center;
  align-self: center;
  font-weight: bold;
`