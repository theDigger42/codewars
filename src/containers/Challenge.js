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
            view: 'instructions'
        }
        this.onChange = this.onChange.bind(this)   
    }

    componentDidMount() {
        axios.get('http://localhost:3000/randomChallenge')
            .then(res => {
                let challenge = res.data
                this.setState({
                    title: challenge.title,
                    body: challenge.body,
                    solution: 'function ' + challenge.funcName + '(' + challenge.params + ')' + ' {\n\n}',
                    funcName: challenge.funcName,
                    tests: challenge.tests,
                })
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

    render() {
        let data = this.state
        let testResults = this.props.submitReducer.tests.map((test, i) => {
            if (test.status === 'pass') {
                return (
                    <PassResult>Input: ({test.input}). Expected: {test.expected}. Actual: {test.actual}.</PassResult>
                )
            } else {
                return (
                    <FailResult>Input: ({test.input}). Expected: {test.expected}. Actual: {test.actual}.</FailResult>                    
                )
            }
        })
        let panelBody = this.state.view === 'instructions' ? <Info>{this.state.body}</Info> 
            : this.state.view === 'results' ? <Info>{testResults}</Info> 
            : <p>other</p>

        return (
            <Layout>
                <Navbar {...this.props}/>
                <Body>
                    <Prompt>{this.state.title}</Prompt>
                    <Editor input={this.state.solution} change={this.onChange}/>
                    <ResultsPanel>
                        <TabContainer>
                            <Tab onClick={() => this.changeView('instructions')}>
                                Challenge
                            </Tab>
                            <Tab onClick={() => this.changeView('results')}> 
                                Results
                            </Tab>
                        </TabContainer>
                        {panelBody}
                        <Button onClick={e => this.props.submit(data)}>Submit</Button>
                    </ResultsPanel>
                </Body>
                <Footer/>
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 50px auto 10%;
  grid-template-columns: 5% auto 5%;
  grid-row-gap: 10px;
  background: grey;
`
const Body = styled.div`
  grid-row: 2 / 4;
  grid-column: 2 / 5;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-column-gap: 20px;
  grid-template-rows: 100px 6fr;
  min-height: 615px;
`
const Prompt = styled.div`
  grid-row: 1;
  grid-column: 1 / 3;
  text-align: center;
  font-size: 28px;
  background: lightgrey;
  align-self: center;
`
const ResultsPanel = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background: azure;
  display: grid;
  grid-template-rows: 50px auto 40px;
  margin-top: 100px;
  min-width: 400px;
  margin-right: 2em;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto;
  background: darkgrey;
`
const Tab = styled.div`
  background: ghostwhite;
  font-size: 30px;
  justify-self: center;
  align-self: center;
`
const Info = styled.p`
  font-size: 20px;
`
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
`
const PassResult = styled.p`
  color: green;
`
const FailResult = styled.p`
  color: red;
`
