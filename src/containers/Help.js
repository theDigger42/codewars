import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import styled from 'styled-components'

export default class Help extends Component {

  render() {
    return (
      <Layout>
        <Navbar {...this.props} active={'help'} />
        <Body>
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
  min-height: 82vh;
  width: 100vw;
  justify-items: center;
  background: grey;
`

const Button = styled.button`
  width: 30vw;
  height: 60px;
  font-size: 20px;
  &:hover{
      font-weight: bold;
      background: maroon;
      color: ghostwhite;
      cursor: pointer;
  }
`