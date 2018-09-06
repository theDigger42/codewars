import styled from "styled-components";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import PracticeEditor from "../components/PracticeEditor";
import Footer from "../components/Footer";
import background from "../images/Grey-website-background.png";
import axios from 'axios'
import { subscribeToDuelSocket, joinDuelRoom, duelComplete, emitResponse, resetConsoleForOpponent } from '../socket/api'

export default class Duel extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      value: [this.props.duel.solution, '//Duel is a feature im working on\n//It has not been implemented yet :)'],
      console: [],
      opponentConsole: '',
      completionStatus: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    subscribeToDuelSocket()
    joinDuelRoom(this.props.auth.user)
  }

  onChange(e) {
    console.log(e);
    e[0] = this.props.duel.solution
    this.setState({
      value: e
    })
  }

  onSubmit() {
    this.props.resetConsoleResults()
    resetConsoleForOpponent()
    console.log(this.props.duel.solution[0]);
    axios.post('/api/runner/challenge', 
    {
      solution: this.props.duel.solution[0],
      tests: this.props.duel.tests,
      testDescriptions: this.props.duel.testDescriptions
    }).then(res => {
      emitResponse(res)
      let results = res.data.testResults
      this.props.setConsoleResults(results)
      let passing = true
      results.forEach(result => {
        if (result.passing === false) passing = false
      })
      if (passing) {
        duelComplete()
        this.setState({
          completionStatus: 'You Won!'
        })
      }
    })
  }
  
  render() {
    let user = this.props.auth.user
    let opponent = this.props.duel.opponent
    let results = this.props.duel.console.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>
    })
    let opponentResults = this.props.duel.opponentConsole.map(result => {
      return <Result passing={result.passing}>{result.description}</Result>
    })
    return (
      <Layout>
        <Navbar {...this.props} active={"duel"} />
        <User rank={user.rank}>{user.username}</User><User rank={opponent.rank}>{opponent.username ? opponent.username : "Opponent"}</User>
        <PracticeEditor
          input={this.props.duel.solution}
          change={this.props.addDuelSolution}
        />
        <Console>
          <UserConsole>{this.state.completionStatus ? "You Won!" : this.props.duel.opponentPassing ? "You Lost" : results}</UserConsole>
          <OpponentConsole>{opponentResults}</OpponentConsole>
        </Console>
        <Button onClick={() => this.onSubmit({code: this.state.value[0]})}>Submit</Button>
        <Footer />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 8vh 7vh 50vh 25vh 5vh;
  grid-template-columns: 1fr 1fr;
  background: url(${background}) dimgrey;
  width: 100vw;
  height: 100vh;
  overflow: none;
`;
const User = styled.h2`
  grid-row: 2;
  text-align: center;
  color: ${props => {
    if (props.rank === "Bad") {
      return "cyan";
    } else if (props.rank === "Noob") {
      return "green";
    } else if (props.rank === "Script Kiddie") {
      return "yellow";
    } else if (props.rank === "Brogrammer") {
      return "orange";
    } else if (props.rank === "Dev") {
      return "orangered";
    } else if (props.rank === "Senior") {
      return "red";
    } else if (props.rank === "Architect") {
      return "maroon";
    } else if (props.rank === "Genius") {
      return "#a500ff";
    } else if (props.rank === "Legend") {
      return "indigo";
    } else if (props.rank === "Hacker") {
      return "black";
    } else if (props.rank === "New") {
      return "white";
    }
  }};
`
const Console = styled.div`
  grid-row: 4;
  grid-column: 1 / 3;
  background: black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 1rem;
  margin-right: 1rem;
`
const UserConsole = styled.div`
  border-right: 1px solid dimgrey;
  color: green;
  overflow: auto;
  padding-left: 1rem;
`
const Result = styled.p`
  font-size: 12px;
  color: ${props => {
    if (props.passing) {
      return 'green'
    } else {
      return 'red'
    }
  }}
  text-align: left;
`
const OpponentConsole = styled.div`
  border-left: 1px solid dimgrey;
  color: red;
  overflow: auto;
  padding-left: 1rem;
`
const Button = styled.button`
  grid-row: 5;
  grid-column: 1 / 3;
  width: 300px;
  justify-self: center;
`