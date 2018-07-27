import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'

export default class Homepage extends Component {
    render() {
        return (
            <Layout>
                <Navbar { ...this.props }/>
                <Body>
                    BODY
                </Body>
                <Foot>
                    FOOT
                </Foot>
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 100px auto 10%;
  grid-template-columns: 1fr;
`

const Body = styled.div`
  grid-row: 2;
  min-height: 600px;
  background: grey;
`

const Foot = styled.div`
  grid-row: 3;
  background: lightgrey;
  min-height: 100px;
`


