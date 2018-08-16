import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
  return (
    <Layout>
      <Copy>{"<Code_War/>"} &#169; 2018</Copy>
    </Layout>
  )
}

export default Footer

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 5% auto 5%;
  background: #1a1a1a;
  height: 9vh;
  width: 100vw;
`

const Copy = styled.h3`
  grid-column: 2;
  color: white;
  justify-self: center;
  align-self: center;
`

