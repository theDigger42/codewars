import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Editor from '../components/Editor'
import Footer from '../components/Footer'

import {
  subscribeToTimerSocket,
  getDateTimerSocket,
  subscribeToGameSocket,
  gameComplete,
  joinWaitingRoom,
  exitWaitingRoom
} from '../socket/api'

export default class Challenge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Get ready',
      body: 'Click join and wait for the game to start.',
      funcName: '',
      solution: '',
      tests: [],
      results: '',
      isComplete: false,
      view: 'instructions',
      room: '',
      tags: ['instructions'],
      timerTillNextGame: '',
      gameTimer: 30,
      scoreboard: []
    }
    this.onChange = this.onChange.bind(this)
    this.changeRoom = this.changeRoom.bind(this)
    this.clickTag = this.clickTag.bind(this)
    this.testUserSolution = this.testUserSolution.bind(this)
    this.handleTestResponse = this.handleTestResponse.bind(this)
    this.getPrompt = this.getPrompt.bind(this)
    this.clearPrompt = this.clearPrompt.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.updateGameTimer = this.updateGameTimer.bind(this)
    this.onGameStart = this.onGameStart.bind(this)
    this.onScoreboardChange = this.onScoreboardChange.bind(this)
    this.suffix = this.suffix.bind(this)
  }

  updateTimer(date) {
    let secondsTillNextGame = 60 - (new Date(date).getSeconds());
    this.setState({ timerTillNextGame: secondsTillNextGame });
    let timer = setInterval(() => {
      secondsTillNextGame--;
      this.setState({ timerTillNextGame: secondsTillNextGame });
      if (secondsTillNextGame <= -1) {
        clearInterval(timer);
        if (this.state.room === 'waiting') {
          this.getPrompt()
          this.setState({ room: 'game' })
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
          this.setState({ gameTimer: 30 })
        }, 2000)
      }
    }, 1000)
  }

  onGameStart() {
    console.log('game started');
  }

  onScoreboardChange(scoreboard) {
    this.setState({ scoreboard })
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags })
  }

  componentWillMount() {
    getDateTimerSocket();
    subscribeToTimerSocket(this.updateTimer);
    subscribeToGameSocket(this.onGameStart, this.onScoreboardChange);
    joinWaitingRoom({ username: this.props.auth.user.username })
  }

  componentWillUnmount() {
    exitWaitingRoom()
  }

  testUserSolution() {
    axios.post('http://localhost:3000/challenge', this.state)
      .then(this.handleTestResponse);
  }

  handleTestResponse(res) {
    var array = res.data;
    var passing = true;

    array.forEach((test) => {
      if (test.status === 'fail') {
        passing = false;
      }
    });

    let testResults = array.map((test, i) => {
      if (test.status === 'pass') {
        return (
          <PassResult key={i}>Input: {test.input}. Expected: {test.expected}. Actual: {test.actual}.</PassResult>
        )
      } else {
        return (
          <FailResult key={i}>Input: {test.input} Expected: {test.expected}. Actual: {test.actual}.</FailResult>
        )
      }
    })

    this.setState({
      results: testResults
    })

    if (passing) {
      this.setState({ //updates the score of the user if all tests pass
        isComplete: true
      });
      if (this.state.scoreboard[0] === 'unfinished') {
        axios.patch(`http://localhost:3000/users:${this.props.auth.user.username}`);
      }
      gameComplete()
      this.clickTag('scores')
      this.changeView('scores')
    }
  }

  getPrompt() {
    axios.get('http://localhost:3000/randomChallenge')
      .then(res => {
        let challenge = res.data
        this.setState({
          title: challenge.title,
          body: challenge.body,
          solution: 'function ' + challenge.funcName + '(' + challenge.params + ') {\n\n}',
          funcName: challenge.funcName,
          tests: challenge.tests,
          results: ''
        })
      })

    this.setState({
      view: 'instructions',
      isComplete: false,
      tags: ['instructions']
    });
  }

  clearPrompt() {
    this.setState({
      title: 'Are you ready?',
      body: '',
      funcName: '',
      solution: '',
      results: ''
    })
  }

  onChange(e) {
    this.setState({
      solution: e
    })
  }

  changeView(view) {
    this.setState({
      view: view
    })
  }

  changeRoom(room) {
    this.setState({
      room: room
    })
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
    let scores = this.state.scoreboard && this.state.scoreboard.map((score, i) => {
      return <p key={i}>{this.suffix(i + 1)} : {score}</p>
    })

    let panelBody = this.state.view === 'instructions' ? <Info>{this.state.body}</Info>
      : this.state.view === 'results' ? <Info>{this.state.results}</Info>
        : <Info>{scores}</Info>

    let submitButton = this.state.isComplete === false ? <Button onClick={e => {
      this.testUserSolution()
      this.changeView('results')
      this.clickTag('results')
    }}>Submit</Button> : <Button onClick={e => {
      this.changeRoom('waiting')
      this.clearPrompt()
      this.clickTag('instructions')
      this.changeView('instructions')
    }}>Play again</Button>

    let joinButton = this.state.room === '' ? <Button onClick={() => {
      this.changeRoom('waiting')
    }}>Join</Button> : this.state.room === 'waiting' ? <Button>Waiting...</Button> : submitButton

    return (
      <Layout>
        <Navbar {...this.props} active={'challenge'} />
        <Prompt>{this.state.title}</Prompt>
        <Timer>Next game in: {this.state.timerTillNextGame}</Timer>
        <Editor input={this.state.solution} change={this.onChange} />
        <ResultsPanel>
          <TabContainer>
            <Tab active={this.state.tags[0] === 'instructions'}
              onClick={() => {
                this.changeView('instructions')
                this.clickTag('instructions')
              }}>
              Instructions
                        </Tab>
            <Tab active={this.state.tags[0] === 'results'}
              onClick={() => {
                this.changeView('results')
                this.clickTag('results')
              }}>
              Results
                        </Tab>
            <Tab active={this.state.tags[0] === 'scores'}
              onClick={() => {
                this.changeView('scores')
                this.clickTag('scores')
              }}>
              Scores
                        </Tab>
          </TabContainer>
          <Content>{panelBody}</Content>
          {joinButton}
        </ResultsPanel>
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
const ResultsPanel = styled.div`
  grid-column: 8 / 13;
  background: gainsboro;
  justify-self: center;
  display: grid;
  grid-template-rows: 40px 1fr 50px;
  margin-right: 2em;
  margin-left: 1em;
  margin-bottom: 2em;
  width: 30vw;
  min-width: 330px;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  background: dimgrey;
`
const Tab = styled.div`
  background: maroon;
  color: white;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
  ${({ active }) => active && `
    color: black;
    background: gainsboro;
    font-weight: bold;
  `};
`
const Content = styled.div`
  font-size: 28px;
  text-align: center;
  margin: 1em;
`
const Info = styled.div`
  font-size: 24px;
`
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
  color: ghostwhite;
  background: maroon;
  &:hover{{
    background: #420000;
  }}
`
const PassResult = styled.p`
  color: green;
`
const FailResult = styled.p`
  color: red;
`
