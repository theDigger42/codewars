import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import WaitingRoom from '../components/WaitingRoom'
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
            body: '',
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
    }

    updateTimer(date) {
        let secondsTillNextGame = 60 - (new Date(date).getSeconds());
        this.setState({timerTillNextGame: secondsTillNextGame});
        let timer = setInterval(() => {
          secondsTillNextGame--;
          this.setState({timerTillNextGame: secondsTillNextGame});
          if (secondsTillNextGame <= -1) {
            clearInterval(timer);
            if (this.state.room === 'waiting') {
              this.getPrompt()
              this.setState({room: 'game'})
              this.updateGameTimer();
            }
            getDateTimerSocket();
          }
        }, 1000)
    }
    
    updateGameTimer() {
        let secondsTillEndGame = this.state.gameTimer;
        let gameTimer = setInterval(() => {
          this.setState({gameTimer: secondsTillEndGame});
          secondsTillEndGame--;
          if (secondsTillEndGame < 0) {
            clearInterval(gameTimer);
            setTimeout(() => {
                this.setState({gameTimer: 30})
            }, 2000)
          }
        }, 1000)
    }

    onGameStart() {
        console.log('game started');
    }
    
    onScoreboardChange(scoreboard) {
        console.log('old scoreboard', this.state.scoreboard);
        console.log('setting new scoreboard state', scoreboard);
        this.setState({ scoreboard })
    }

    clickTag(tag) {
        var tags = [tag];
        this.setState({ tags: tags })
    }

    componentDidMount() {
        getDateTimerSocket();
        subscribeToTimerSocket(this.updateTimer);
        subscribeToGameSocket(this.onGameStart, this.onScoreboardChange);
        joinWaitingRoom({username: this.props.auth.user.username})
    }

    componentWillUnmount() {
        exitWaitingRoom()
    }

    testUserSolution(e) {
        axios.post('http://localhost:3000/challenge', this.state)
            .then(this.handleTestResponse);
    }
    
      handleTestResponse(res) {
        var array = res.data;
        console.log(array);
        var passing = true;

        array.forEach((test) => {
          if (test.status === 'fail') {
            passing = false;
          }
        });

        let testResults = array.map((test) => {
            if (test.status === 'pass') {
                return (
                    <PassResult>Input: {test.input}. Expected: {test.expected}. Actual: {test.actual}.</PassResult>
                )
            } else {
                return (
                    <FailResult>Input: {test.input} Expected: {test.expected}. Actual: {test.actual}.</FailResult>                    
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
          axios.patch(`http://localhost:3000/users:${this.props.auth.user.username}`);
          gameComplete()
        }
      }
    
    getPrompt() {
        axios.get('http://localhost:3000/randomChallenge')
            .then(res => {
                let challenge = res.data
                this.setState({
                    title: challenge.title,
                    body: challenge.body,
                    solution: 'function ' + challenge.funcName + '(' + challenge.params + ')' + ' {\n\n}',
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

    onChange (e) {
        this.setState({
            solution: e
        })
        console.log(this.state.solution);
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

    render() {
        let scores = this.state.scoreboard && this.state.scoreboard.map(score => {
            return <p>{score}</p>
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
                <Navbar {...this.props} active={'challenge'}/>
                <Prompt>{this.state.title}</Prompt>
                <Timer>Next game in: {this.state.timerTillNextGame}</Timer>
                <Editor input={this.state.solution} change={this.onChange}/>
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
                <Footer/>
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
  width: 400px;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  background: grey;
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
  font-size: 30px;
  text-align: center;
`
const Info = styled.p`
  font-size: 20px;
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
