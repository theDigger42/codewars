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
    grid-row: 5;
    grid-column: 1 / 5;
    display: grid;
    grid-template-columns: 5% auto 5%;
    background: dimgrey;
`

const Copy = styled.div`
    grid-column: 2;
    color: azure;
    justify-self: center;
    font-size: 20px;
    margin-top: 2em;
    height: 70px;
`

