import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
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
            tests: []
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

    render() {
        let data = this.state
        return (
            <Layout>
                <Navbar {...this.props}/>
                <Body>
                    <Prompt>{this.state.title}</Prompt>
                    <EditorWrapper><Editor input={this.state.solution}/></EditorWrapper>
                    <ResultsPanel>Results</ResultsPanel>
                    <Button onClick={e => this.props.submit(data)}>Submit</Button>
                </Body>
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 50px auto 10%;
`
const Body = styled.div`
  grid-row: 2 / 4;
  display: grid;
  grid-template-columns: 5fr 4fr;
`
const Prompt = styled.div`
  grid-row: 2;
  grid-column: 1 / 2;
  font-size: 40px;
  justify-self: center
`
const EditorWrapper = styled.div`
  grid-row: 3;
  grid-column: 1;
`
const ResultsPanel = styled.div`
  grid-column: 2;
  grid-row: 2 / 4;
  background: lightpink;
`
const Button = styled.button`
  grid-row: 4;
  grid-column: 1;
  font-size: 30px;
`