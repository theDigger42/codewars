import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
  return (
    <Layout>
      <Copy>{"CodeFightClub"}</Copy>
    </Layout>
  )
}

export default Footer

const Layout = styled.footer`
  position: fixed;
  bottom: 0;
  background: black;
  width: 100vw;
  height: 5vh;
  display: grid;
  grid-template-rows: auto;
`

const Copy = styled.div`
  color: white;
  justify-self: center;
  align-self: center;
  text-align: center;
`

