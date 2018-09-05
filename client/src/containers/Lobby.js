import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import background from "../images/Grey-website-background.png";
import ScoreCard from '../components/ScoreCard'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["lobby"]
    };
    this.clickTag = this.clickTag.bind(this);
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags });
  }

  render() {
    let mapping =
      this.props.online.users &&
      Object.keys(this.props.online.users).map(key => {
        return [key, this.props.online.users[key]];
      });

    let userList =
      mapping &&
      mapping.map((arr, i) => (
        <ScoreCard
          key={i}
          rank={arr[1].rank}
          rating={arr[1].rating}
          username={arr[0]}
          style={{
            margin: "1em"
          }}
        >
        </ScoreCard>
      ));

    return (
      <Layout>
        <Navbar {...this.props} active={"lobby"} />
        <Body>
          <Legend>
            <Ranks>Ranks / Ratings</Ranks>
            <EntryDiv>
              <p>Hacker</p>
              <p>Legend</p>
              <p>Genius</p>
              <p>Architect</p>
              <p>Senior</p>
              <p>Dev</p>
              <p>Brogrammer</p>
              <p>Script Kiddie</p>
              <p>Noob</p>
              <p>Bad</p>
              <p>New</p>
            </EntryDiv>
            <RatingDiv>
              <p>1600 + </p>
              <p>1500 - 1600</p>
              <p>1400 - 1500</p>
              <p>1300 - 1400</p>
              <p>1200 - 1300</p>
              <p>1100 - 1200</p>
              <p>1000 - 1100</p>
              <p>900 - 1000</p>
              <p>800 - 900</p>
              <p> 0 - 800 </p>
              <p>1000</p>
            </RatingDiv>
            <ColorDiv>
              <div
                style={{
                  background: "black",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "indigo",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "#a500ff",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "maroon",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "red",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "orangered",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "orange",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "yellow",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "green",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "cyan",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
              <div
                style={{
                  background: "white",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px"
                }}
              />
            </ColorDiv>
          </Legend>
          <OnlineUsers>
            <Online>Online Users</Online>
            <UserList>{userList}</UserList>
          </OnlineUsers>
        </Body>
        <Footer />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 8vh 1fr;
  grid-template-columns: repeat(auto-fit, 1fr);
  background: url(${background}) dimgrey;
  width: 100vw;
  height: 100vh;
`;
const Body = styled.div`
  grid-row: 2;
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1.25fr;
  height: 100%;
`;
const Legend = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  background: #1f1f1f;
  padding: 1rem;
  margin-bottom: 1em;
  min-width: 150px;
`;
const Ranks = styled.h1`
  grid-row: 1;
  grid-column: 1 / 4;
  color: gainsboro;
  font-size: 30px;
  justify-self: center;
  align-self: center;
  padding: 1em 0;
  text-align: center;
  background: grey;
  width: 100%;
  @media (max-width: 650px) {
    font-size: 20px;
  }
`
const EntryDiv = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: gainsboro;
  font-weight: bold;
  font-size: 16px;
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;
const RatingDiv = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: gainsboro;
  font-weight: bold;
  font-size: 16px;
  @media (max-width: 650px) {
    font-size: 8px;
  }
`;
const ColorDiv = styled.div`
  grid-column: 3;
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  margin-top: 15px;
  @media (max-width: 650px) {
    margin-top: 5px;
  }
`;
const OnlineUsers = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-rows: 70px auto;
`;
const Online = styled.h1`
  grid-row: 1;
  justify-self: center;
  font-size: 30px;
  color: #f2f2f2;
  width: 100%;
  text-align: center;
  font-size: 30px;
  margin-top: 1.3em;
  @media (max-width: 650px) {
    font-size: 20px;
  }
`;
const UserList = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 60px);
  overflow: auto;
  justify-self: center;
  width: 80%;
  padding: 1em;
`;
