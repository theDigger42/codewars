import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Editor from '../components/Editor'
import Footer from '../components/Footer'

export default class Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Are you ready?',
            body: '',
            funcName: '',
            solution: '',
            tests: [],
            results: '',
            isComplete: false,
            view: 'instructions',
            tags: ['instructions']
        }
        this.onChange = this.onChange.bind(this)  
        this.clickTag = this.clickTag.bind(this) 
        this.testUserSolution = this.testUserSolution.bind(this)
        this.handleTestResponse = this.handleTestResponse.bind(this)
        this.getPrompt = this.getPrompt.bind(this)
    }

    clickTag(tag) {
        var tags = [tag];
        this.setState({ tags: tags })
    }

    componentDidMount() {
        this.getPrompt()
    }

    testUserSolution(e) {
        axios.post('/challenge', this.state)
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
    
          axios.patch(`/users:${this.props.auth.user.username}`);
        }
      }
    
      getPrompt() {
        axios.get('/randomChallenge')
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

    render() {
        console.log(this.state.tests);

        let panelBody = this.state.view === 'instructions' ? <Info>{this.state.body}</Info> 
            : this.state.view === 'results' ? <Info>{this.state.results}</Info> 
            : <p>other</p>
        
        let submitButton = this.state.isComplete === false ? <Button onClick={e => {
            this.testUserSolution()
            this.changeView('results')
            this.clickTag('results')
        }}>Submit</Button> : <Button onClick={e => {
            this.getPrompt()
        }}>Next Problem</Button>

        return (
            <Layout>
                <Navbar {...this.props} active={'challenge'}/>
                <Prompt>{this.state.title}</Prompt>
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
                    </TabContainer>
                    <Content>{panelBody}</Content>
                    {submitButton}
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
  grid-row-gap: 5px;
  background: dimgrey;
  height: 100vh;
  width: 100vw;
`
const Prompt = styled.h1`
  grid-column: 1 / 13;
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
  grid-template-columns: auto auto;
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
