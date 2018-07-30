import React from 'react'
import styled from 'styled-components'

const Footer = (props) => {
    return (
        <Layout>
            <Copy>Kyle Shifflett &#169; 2018</Copy>
        </Layout>
    )
}

export default Footer

const Layout = styled.div`
    grid-column: 1 / 13;
    display: grid;
    grid-template-columns: 5% auto 5%;
    background: black;
    height: 10vh;
    width: 100vw;
`

const Copy = styled.span`
    grid-column: 2;
    color: white;
    justify-self: center;
    align-self: center;
`

