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
  background: url('../images/Grey-website-background.png') dimgrey;
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
  font-size: 18px;
  margin-top: 1em;
  border-radius: 5px;
  color: gainsboro;
  background: linear-gradient(grey, #595959);
  border: 2px solid black;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  padding: 0.5em;
  width: 35vw;
  height: 3vh;
  line-height: 2vh;
`
const Timer = styled.h2`
  grid-column: 9 / 13;
  text-align: center;
  align-self: center;
  font-weight: bold;
  justify-self: center;
  @media (max-width: 900px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`