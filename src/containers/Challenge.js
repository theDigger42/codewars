import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import Panel from '../components/Panel'

export default class Challenge extends Component {

  render() {
    let timer = this.props.timer ? <Timer>Next game starts in: {this.props.timer} </Timer> : <Timer></Timer>
    return (
      <Layout>
        <Navbar {...this.props} active={'challenge'} />
        <Prompt>{this.props.prompt.title}</Prompt>
        {timer}
        <Editor input={this.props.prompt.solution} change={this.props.addSolution} />
        <Panel {...this.props} join={this.props.join} leave={this.props.leave}/>
        <Footer />
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  background: dimgrey;
  height: 100vh;
  width: 100vw;
  overflow: none;
`
const Prompt = styled.div`
  grid-column: 2 / 8;
  text-align: center;
  align-self: center;
  justify-self: center;
  font-weight: bold;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  color: gainsboro;
  background: linear-gradient(grey, #595959);
  border: 2px solid black;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  padding: 0.4em;
  font-size: 24px;
  width: 35vw;
  height: 4vh;
  line-height:4vh;
  @media (max-width: 950px) {
    margin-top: 1em;
    font-size: 18px;
  }
  @media (max-width: 800px) {
    margin-top: 1em;
    font-size: 14px;
  }
  @media (max-width: 560px) {
    margin-top: 2em;
    font-size: 10px;
  }
  @media (max-width: 560px) {
    margin-top: 2em;
    font-size: 8px;
  }
`
const Timer = styled.h2`
  grid-column: 9 / 13;
  text-align: center;
  align-self: center;
  font-weight: bold;
  justify-self: center;
  @media (max-width: 880px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 14px;
  }
`