import React, { Component } from 'react'
import styled from 'styled-components'
import { gameComplete, unsubscribe } from '../socket/api'

export default class Panel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ['instructions'],
      results: '',
      isComplete: false
    }

    this.clickTag = this.clickTag.bind(this)
    this.suffix = this.suffix.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {

    this.props.submit({
      solution: this.props.prompt.solution, 
      funcName: this.props.prompt.funcName, 
      tests: this.props.prompt.tests
    })

    setTimeout(() => {
      let passing = true
      let results = this.props.prompt.tests.map((res) => {
        return res.status === 'pass' ? <PassResult>Pass</PassResult> : <FailResult>Fail</FailResult>
      })
      this.props.prompt.tests.forEach((res) => {
        if (res.status === 'fail') passing = false;
      });
      this.setState({ results: results})
      if (passing) {
        gameComplete()
        this.props.setComplete()
        setTimeout(() => this.clickTag('scores'), 500)
        this.props.leave()
      }
    }, 1000)

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

  render() {

    let scoreboard = this.props.score.scoreboard.map((user, i) => {
      if (user.finished === true) {
        return <p>{this.suffix(i+1)}: {user.username}</p>
      } else {
        return <p>{user.username}</p>
      }
    })

    console.log(scoreboard);

    let panelBody = this.state.tags[0] === 'instructions' 
      ? <Info>{this.props.prompt.body}</Info>
      : this.state.tags[0] === 'results' 
      ? <Info>{this.state.results}</Info>
      : <Info>{scoreboard}</Info>

    let submitButton = this.props.prompt.isComplete === false 
      ? <Button onClick={() => {
          this.handleSubmit()
          this.clickTag('results')
        }}>Submit</Button> 
      : <Button onClick={() => {
          this.props.join()
          this.props.changeRoom('waiting')
          this.clickTag('instructions')
          this.props.clearPrompt()
          this.setState({ results: '' })
          this.props.clearScoreboard()
        }}>Play again</Button>

    let joinButton = this.props.prompt.room === 'lobby' 
      ? <Button onClick={() => {
          this.props.changeRoom('waiting')
          this.props.join()
       }}>Join</Button> 
      : this.props.prompt.room === 'waiting' 
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
  min-width: 350px;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  background: dimgrey;
  align-items: center;
  min-height: 50px;
`
const Tab = styled.div`
  background: maroon;
  color: white;
  font-size: 22px;
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