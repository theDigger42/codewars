import styled from "styled-components"
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Landing from '../components/Landing'

export default class Homepage extends Component {

  render() {

    if (this.props.auth.isAuthenticated) {
      return <Redirect to='/challenge' />
    }

    return (
      <Layout>
        <Navbar {...this.props} active={'home'} />
        <Landing block={this.props.modalReducer.show}/>
        <Footer />
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr 50px;
  height: 100vh;
  width: 100vw;
`

