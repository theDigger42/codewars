import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import axios from 'axios'

export default class Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
                console.log(challenge);
                this.setState({
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
                <div>Title</div>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={this.onChange}
                    value={this.state.solution}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                    fontSize={16}
                    cursorStart={2}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    height={600}
                    width={800}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2
                    }}
                />
                <button onClick={e => this.props.submit(data)}>Submit</button>
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 100px 50px auto 10%;
  grid-template-columns: 1fr;
`
 