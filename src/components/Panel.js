import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { gameComplete } from '../socket/api'

export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ['instructions'],
      results: '',
      isComplete: false
    }

    this.clickTag = this.clickTag.bind(this)
    this.handleTestResponse = this.handleTestResponse.bind(this)
    this.suffix = this.suffix.bind(this)
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags })
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

  handleTestResponse() {
    let tests = this.props.prompt.tests;
    let passing = true;
  
    let testResults = tests.map((test, i) => {
      if (test.status === 'pass') {
        return (
          <PassResult key={i}>Input: {test.input}. Expected: {test.expected}. Actual: {test.actual}.</PassResult>
        )
      } else {
        passing = false
        return (
          <FailResult key={i}>Input: {test.input} Expected: {test.expected}. Actual: {test.actual}.</FailResult>
        )
      }
    })
  
    this.setState({
      results: testResults
    })
  
    if (passing) {
      this.props.complete(true)
      if (this.props.score.scoreboard[0] === 'unfinished') {
        axios.patch(`http://localhost:3000/users:${this.props.auth.user.username}`);
      }
      gameComplete()
      setTimeout(() => {
        this.clickTag('scores')
      }, 1000)
    }
  }

  render() {

    let that = this

    let scores = this.props.score.scoreboard && this.props.score.scoreboard.map((score, i) => {
      return <p key={i}>{this.suffix(i + 1)} : {score}</p>
    })

    let panelBody = this.state.tags[0] === 'instructions' 
      ? <Info>{this.props.prompt.body}</Info>
      : this.state.tags[0] === 'results' 
      ? <Info>{this.state.results}</Info>
      : <Info>{scores}</Info>

    let submitButton = this.props.isComplete === false 
      ? <Button onClick={() => {
      this.props.submit({solution: this.props.prompt.solution, 
        funcName: this.props.prompt.funcName, 
        tests: this.props.prompt.tests
      })
      setTimeout(() => {
        that.handleTestResponse()
      }, 1000) 
      this.clickTag('results')
    }}>Submit</Button> : <Button onClick={() => {
      this.props.changeRoom('waiting')
      this.clickTag('instructions')
      this.props.clearPrompt()
    }}>Play again</Button>

    let joinButton = this.props.room === '' 
      ? <Button onClick={() => { this.props.changeRoom('waiting') }}>Join</Button> 
      : this.props.room === 'waiting' 
      ? <Button>Waiting...</Button> 
      : submitButton

    return (
      <ResultsPanel>
        <TabContainer>
          <Tab active={this.state.tags[0] === 'instructions'}
            onClick={() => {
              this.clickTag('instructions')
            }}>
            Instructions
          </Tab>
          <Tab active={this.state.tags[0] === 'results'}
            onClick={() => {
              this.clickTag('results')
            }}>
            Results
          </Tab>
          <Tab active={this.state.tags[0] === 'scores'}
            onClick={() => {
              this.clickTag('scores')
            }}>
            Scores
          </Tab>
        </TabContainer>
        <Content>{panelBody}</Content>
        {joinButton}
      </ResultsPanel>
    )
  }
}

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