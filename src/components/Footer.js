import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
  return (
    <Layout>
      <Copy>{"<Code-War/>"}  2018</Copy>
    </Layout>
  )
}

export default Footer

const Layout = styled.footer`
  position: fixed;
  bottom: 0;
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 5% auto 5%;
  background: #1a1a1a;
  width: 100vw;
`

const Copy = styled.h3`
  grid-column: 2;
  color: white;
  justify-self: center;
  align-self: center;
`

