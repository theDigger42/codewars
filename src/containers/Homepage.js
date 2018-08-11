import styled from "styled-components"
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Homepage extends Component {

  render() {

    if (this.props.auth.isAuthenticated) {
      return <Redirect to='/challenge' />
    }

    return (
      <Layout>
        <Navbar {...this.props} active={'home'} />
        <Body>
          <Heading>
            Code.
            <br />
            Compete.
            <br />
            Improve Speed.
            <br />
            All in one place.
          </Heading>
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
  height: 100vh;
  width: 100vw;
`

const Body = styled.div`
  grid-row: 2;
  grid-column: 1 / 13;
  min-height: 82vh;
  background: grey;
  display: grid;
  grid-template-rows: auto;
`

const Heading = styled.div`
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: 70px;
  font-weight: bold;
`


