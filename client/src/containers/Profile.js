import React, { Component } from 'react'
import styled from 'styled-components'
import background from '../images/Grey-website-background.png'

export default class Profile extends Component {

  render() {
    return (
      <Layout>
        <h1>{this.props.location.pathname.substring(9)}</h1>
      </Layout>
    )
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  background: url(${background}) dimgrey;
  height: 100vh;
  width: 100vw;
  overflow: none;
`;