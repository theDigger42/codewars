import React, { Component } from 'react'
import styled from 'styled-components'
import background from '../images/Grey-website-background.png'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: this.props.online.user.username
      }
    }
  }

  componentDidMount() {
    this.props.getOnlineUser(this.props.location.pathname.substring(9));
  }

  render() {
    let user = this.props.online.user
    return (
      <Layout>
        <Navbar {...this.props} />
        <Body>
          <Heading rank={user.rank}><h1>{user.username}</h1></Heading>
          <Content>
            <Info>
              <h2>Rank : {user.rank}</h2>
              <h2>Rating : {user.rating}</h2>
              <h2>Wins : {user.wins}</h2>
            </Info>
            <Actions>
              <Button>Add Friend</Button>
              <Button>Send Message</Button>
              <Button>Duel</Button>
            </Actions>
          </Content>
          <Foot></Foot>
        </Body>
        <Footer/>
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
const Body = styled.div`
  grid-column: 1 / 13;
  justify-self: center;
  display: grid;
  grid-template-rows: 90px 1fr 3fr;
  grid-template-columns: 10% 1fr 1fr 1fr 10%;
  width: 80%;
  height: 92vh;
  margin-top: 8vh;
  background: #1f1f1f;
`;
const Heading = styled.div`
  grid-row: 1;
  grid-column: 2 / 5;
  background: #cccccc;
  text-align: center;
  color: ${props => {
    if (props.rank === "Bad") {
      return "cyan";
    } else if (props.rank === "Noob") {
      return "green";
    } else if (props.rank === "Script Kiddie") {
      return "yellow";
    } else if (props.rank === "Brogrammer") {
      return "orange";
    } else if (props.rank === "Dev") {
      return "orangered";
    } else if (props.rank === "Senior") {
      return "red";
    } else if (props.rank === "Architect") {
      return "maroon";
    } else if (props.rank === "Genius") {
      return "#a500ff";
    } else if (props.rank === "Legend") {
      return "indigo";
    } else if (props.rank === "Hacker") {
      return "black";
    } else if (props.rank === "New") {
      return "white";
    }
  }};
`
const Content = styled.div`
  grid-row: 2;
  grid-column: 2 / 5;
  background: #aaaaaa;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
`
const Info = styled.div`
  grid-column: 1;
  background: grey;
  display: grid;
  text-align: center;
  grid-template-rows: repeat(3, 75px);
  @media (max-width: 660px) {
    font-size: 12px;
  }
`
const Actions = styled.div`
  grid-column: 2;
  background: #1a1a1a;
  display: grid;
  grid-template-rows: repeat(3, 75px);
`
const Button = styled.button`
  margin: 1rem;
  background: lightgrey;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
  @media (max-width: 650px) {
    font-size: 10px;
  }
`
const Foot = styled.div`
  grid-row: 3;
  grid-column: 2 / 5;
  background: black;
`