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
            view: 'instructions',
            tags: ['instructions']
        }
        this.onChange = this.onChange.bind(this)  
        this.clickTag = this.clickTag.bind(this) 
    }

    clickTag(tag) {
        var tags = [tag];
        this.setState({ tags: tags })
    }

    componentDidMount() {
        axios.get('/randomChallenge')
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
                    <PassResult>Input: {test.input}. Expected: {test.expected}. Actual: {test.actual}.</PassResult>
                )
            } else {
                return (
                    <FailResult>Input: {test.input} Expected: {test.expected}. Actual: {test.actual}.</FailResult>                    
                )
            }
        })
        let panelBody = this.state.view === 'instructions' ? <Info>{this.state.body}</Info> 
            : this.state.view === 'results' ? <Info>{testResults}</Info> 
            : <p>other</p>

        return (
            <Layout>
                <Navbar {...this.props}/>
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
                    <Button onClick={e => {
                        this.props.submit(data)
                        this.changeView('results')
                        this.clickTag('results')
                    }}>Submit</Button>
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
  background: grey;
`
const Prompt = styled.h1`
  grid-column: 1 / 13;
  text-align: center;
  align-self: center;
`
const ResultsPanel = styled.div`
  grid-column: 8 / 13;
  background: gainsboro;
  justify-self: center;
  display: grid;
  grid-template-rows: 40px 1fr 50px;
  margin-right: 2em;
  margin-left: 1em;
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
`
const PassResult = styled.p`
  color: green;
`
const FailResult = styled.p`
  color: red;
`
