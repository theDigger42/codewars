import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Editor from '../components/Editor'

export default class Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
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
        console.log(this.props);
        let testResults = this.props.submitReducer.tests.map((test, i) => {
            return (
                <p>{i}: {test.status}</p>
            )
        })
        let panelBody = this.state.view === 'instructions' ? <p>{this.state.body}</p> 
            : this.state.view === 'results' ? <p>{testResults}</p> 
            : <p>other</p>

        return (
            <Layout>
                <Navbar {...this.props}/>
                <Body>
                    <Prompt>{this.state.title}</Prompt>
                    <EditorWrapper><Editor input={this.state.solution} change={this.onChange}/></EditorWrapper>
                    <ResultsPanel>
                        <TabContainer>
                            <Tab onClick={() => this.changeView('instructions')}>
                                Instructions
                            </Tab>
                            <Tab onClick={() => this.changeView('results')}> 
                                Results
                            </Tab>
                            <Tab onClick={() => this.changeView('other')}>
                                Other
                            </Tab>
                        </TabContainer>
                        {panelBody}
                        <Button onClick={e => this.props.submit(data)}>Submit</Button>
                    </ResultsPanel>
                </Body>
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
  grid-column: 2;
  display: grid;
  grid-template-columns: auto auto;
`
const Prompt = styled.div`
  grid-row: 2;
  grid-column: 1 / 3;
  text-align: center;
  font-size: 45px;
  height: 50px;
  width: 100%;
  background: azure;
  margin: 25px;
`
const EditorWrapper = styled.div`
  grid-row: 3;
  grid-column: 1;
`
const ResultsPanel = styled.div`
  grid-column: 2;
  grid-row: 2 / 4;
  background: lightblue;
  display: grid;
  grid-template-rows: 50px auto 40px;
  margin-top: 100px;
  min-width: 400px;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  background: darkgrey;
`
const Tab = styled.div`
  background: ghostwhite;
  font-size: 30px;
  justify-self: center;
  align-self: center;
`
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
`