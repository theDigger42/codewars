import React, { Component } from 'react'
import ScoreCard from './ScoreCard'
import styled from 'styled-components'
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
    this.suffix = this.suffix.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {

    this.props.submit({
      solution: this.props.prompt.solution, 
      funcName: this.props.prompt.funcName, 
      tests: this.props.prompt.tests,
      testDescriptions: this.props.prompt.testDescriptions
    })

    setTimeout(() => {
      let passing = true
      let descriptiveResults = this.props.prompt.testResults.map((test) => {
        return test.passing ? <PassResult>{test.description}</PassResult> : <FailResult>{test.description}</FailResult>
      })
      if (this.props.prompt.message !== 'Success!') {
        passing = false
      }
      this.setState({ results: descriptiveResults})
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
        return <ScoreCard suffix={this.suffix(i+1)} username={user.username} rank={user.rank}/>
      } else {
        return <ScoreCard username={user.username} rank={user.rank}/>
      }
    })

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
  grid-column: 10 / 13;
  background: #cccccc;
  justify-self: center;
  display: grid;
  grid-template-rows: 40px 0.8fr 40px;
  margin-right: 1em;
  margin-left: 1em;
  margin-top: 0.5em;
  width: 40vw;
  height: 61vh;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.7);
`

const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  margin-bottom: 1em;
  background: dimgrey;
  align-items: center;
  height: 6vh;
  box-shadow: 10px -10px 10px dimgray;
  width: 40vw;
`
const Tab = styled.div`
  background: #e65c00;
  color: white;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
  height: 4vh;
  line-height: 4vh;
  padding: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 1px solid #e65c00;
  ${({ active }) => active && `
    color: black;
    background: #cccccc;
    font-weight: bold;
  `};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  @media (max-width: 1000px) {
    font-size: 16px;
  }
  @media (max-width: 705px) {
    font-size: 10px;
    height: 30px;
  }
  @media (max-width: 510px) {
    font-size: 8px;
  }
`
const Content = styled.div`
  font-size: 10px;
  text-align: center;
  margin: 1em;
  height: 52vh;
  overflow: auto;
  font-weight: bold;
  padding: 1em;
`
const Info = styled.div`
  font-size: 24px;
  @media (max-width: 860px) {
    font-size: 23px;
  }
  @media (max-width: 750px) {
    font-size: 21px;
  }
  @media (max-width: 650px) {
    font-size: 19px;
  }
`
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
  color: ghostwhite;
  background: #e65c00;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 4px 5px 4px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  &:hover{{
    background: #993d00;
  }}
  width: 40vw;
  height: 6vh;
  @media (max-width: 750px) {
    font-size: 24px;
  }
`
const PassResult = styled.p`
  color: green;
`
const FailResult = styled.p`
  color: red;
`