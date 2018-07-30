import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <Navbar { ...this.props }/>
                <Body>
                    <Heading>
                        Practice coding.
                        <br/>
                        Compete.
                        <br/>
                        Improve your speed.
                        <br/>
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
  grid-template-rows: 75px auto 10%;
  grid-template-columns: 1fr;
  height: 100vh;
`

const Body = styled.div`
  grid-row: 2;
  min-height: 645px;
  background: grey;
  display: grid;
  grid-template-rows: auto;
`

const Heading = styled.div`
  grid-row: 1;
  justify-self: center;
  align-self: center;
  font-size: 58px;
`


