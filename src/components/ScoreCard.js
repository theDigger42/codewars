import React from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1.3fr;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.5em;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid black;
  height: 50px;
  font-size: 18px;
  @media (max-width: 700px) {
    font-size: 16px;
  }
  color: ${props => {
    if (props.rank === 'Hacker') {
      return 'white'
    } else {
      return 'black'
    }
  }};
  background: ${props => { 
    if (props.rank === 'Bad') {
      return 'blue'
    } else if (props.rank === 'Noob') {
      return 'green'
    } else if (props.rank === 'Script Kiddie') {
      return 'yellow'
    } else if (props.rank === 'Brogrammer') {
      return 'orange'
    } else if (props.rank === 'Dev') {
      return 'orangered'
    } else if (props.rank === 'Senior') {
      return 'red'
    } else if (props.rank === 'Architect') {
      return 'maroon'
    } else if (props.rank === 'Genius') {
      return '#a500ff'
    } else if (props.rank === 'Legend') {
      return 'dimgrey'
    } else if (props.rank === 'Hacker') {
      return 'black'
    }
  }};
`
const Suffix = styled.span`
  grid-column: 1;
  font-weight: bold;

`
const Username = styled.span`
  grid-column: 2;
  font-weight: bold;
`
const Rank = styled.span`
  grid-column: 3;
  font-weight: bold;
  font-style: italic;
`

const ScoreCard = ({ suffix, username, rank }) => {

  return (
    <Layout rank={rank}>
      <Suffix>{suffix}</Suffix>
      <Username>{username}</Username>
      <Rank>{rank}</Rank>
    </Layout>
  )

}

export default ScoreCard