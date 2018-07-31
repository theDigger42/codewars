import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import styled from 'styled-components'

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          body: '',
          code: '',
          tests: '',
          params: '',
          invalidEntries: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.invalidEntry = ['hello', 'hi'];
    }

    submitToyProblem (toyProblem) {
      let emptyState = { // on success clears the state of the input fields
            title: '',
            body: '',
            code: '',
            tests: '',
            params: '',
          };
      axios.post('http://localhost:3000/admin/toyProblem', toyProblem)
      .then((data) => {
        console.log('success', data);
        this.setState(emptyState);
      })
      .catch((err) => {
        console.error('error', err);
      });
    }

    setter (prop) { //@param prop - sets the state of each of the input fields
      return (e) => {
        let state = {};
        state[prop] = e.target.value;
        this.setState(state);
      }
    }

    handleSubmit(event) {
        event.preventDefault();

        const { title, body, code, tests, params } = this.state;
        let invalid = ['Missing'];

        if (title === '') {
            invalid.push('title');
        }
        if (body === '') {
            invalid.push('prompt');
        }
        if (code === '') {
            invalid.push('function name');
        }
        if (tests === '') {
            invalid.push('valid JSON-parsable test');
        }
        if (params === '') {
            invalid.push('parameters');
        }
        if (invalid.length > 1) {
            console.log(invalid);
            this.setState({invalidEntries:invalid});
            console.log(this.state.invalidEntries);
            return;
        }
        this.submitToyProblem(this.state);
    }

    someTests() {
        return `Tests || Example: [{"input": "2,3" , "expected": "5"}, {"input": "4, 4", "expected": "8"}]`;
    }

    render () {
        return (
            <Layout>
                <Navbar {...this.props} active={'help'}/>
                    <Body>
                        <Title>
                            <H5>Challenge Title</H5>
                            <Input placeholder="Problem name" value={this.state.title} onChange={this.setter.call(this, 'title')}></Input>
                        </Title>
                        <br />
                        <Function>
                            <H5>Function Name</H5>
                            <Input placeholder="Expected function name" value={this.state.code} onChange={this.setter.call(this, 'code')}></Input>
                        </Function>
                        <br />
                        <Param>
                            <H5>Parameters - Example: value1, value2</H5>
                            <Input placeholder="Expected parameters" value={this.state.params} onChange={this.setter.call(this, 'params')}></Input>
                        </Param>
                        <br />
                        <Prompt>
                            <H5>Prompt</H5>
                            <Input placeholder="Instructions for user" value={this.state.body} onChange={this.setter.call(this, 'body')}></Input>
                        </Prompt>
                        {/* <br /> */}
                        <Tests>
                            <H5>{this.someTests()}</H5>
                            <WideInput
                                placeholder='Create tests as an array of objects in JSON-parsable format'
                                onChange={this.setter.call(this, 'tests')}
                                value={this.state.tests}
                            ></WideInput>
                        </Tests>
                        <div><h7>{this.state.invalidEntries.join(' || ')}</h7></div>
                        <Submit>
                            <Button type="Submit" name="Submit" onClick={this.handleSubmit}>Submit</Button>
                        </Submit>
                    </Body>
                <Footer />
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  width: 100vw;
  justify-items: center;
`
const Body = styled.div`
    grid-column: 1 / 13;
    display: grid;
    grid-template-rows: repeat(auto-fit, 1fr);
    grid-template-columns: repeat(auto-fit, 1fr);
    height: 80vh;
    width: 100vw;
    justify-items: center;
    background: grey;
`
const Title = styled.div`
    grid-column: 1 / 6;
`
const Function = styled.div`
    grid-column: 7 / 13;
`
const Param = styled.div`
    grid-column: 1 / 6;
`
const Prompt = styled.div`
    grid-column: 7 / 13;
`
const Tests = styled.div`
    grid-column: 1 / 13;
`
const Submit = styled.div`
    grid-column: 1 / 13;
`
const Button = styled.button`
    width: 30vw;
    height: 60px;
    font-size: 20px;
    &:hover{{
        font-weight: bold;
        background: maroon;
        color: ghostwhite;
        cursor: pointer;
    }}
`
const H5 = styled.h5`
    text-align: center;
    font-size: 20px;
`
const Input = styled.input`
    width: 30vw;
    height: 50px;
    font-size: 14px;
`
const WideInput = styled.input`
    width: 60vw;
    height: 50px;
    font-size: 14px;
    text-align: center;
`