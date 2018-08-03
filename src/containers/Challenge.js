import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import Panel from '../components/Panel'
export default class Challenge extends Component {
  render() {
    return (
      <Layout>
        <Navbar {...this.props} active={'challenge'} />
        <Prompt>{this.props.prompt.title}</Prompt>
        <Timer>Next game in: {this.props.timer}</Timer>
        <Editor input={this.props.prompt.solution} change={this.props.addText} />
        <Panel {...this.props} />
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
`
const Prompt = styled.h1`
  grid-column: 1 / 8;
  text-align: center;
  align-self: center;
  font-weight: bold;
`
const Timer = styled.h1`
  grid-column: 8 / 13;
  text-align: center;
  align-self: center;
  font-weight: bold;
`