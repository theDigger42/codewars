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
      tags: ["profile"]
    };
    this.clickTag = this.clickTag.bind(this);
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags });
  }

  componentDidMount() {
    this.props.getOnlineUser(this.props.auth.user.username);
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
          username={arr[0]}
          getOnlineUser={this.props.getOnlineUser}
          style={{
            margin: "1em"
          }}
        >
        </ScoreCard>
      ));

    return (
      <Layout>
        <Navbar {...this.props} active={"profile"} />
        <Body>
          <UserProfile>
            <Username rank={this.props.online.user.rank}>
              {this.props.online.user.username}
            </Username>
            <Stats>
              <Rank>Rank:</Rank>
              <Value>{this.props.online.user.rank}</Value>
              <Rating>Rating:</Rating>
              <Value>{this.props.online.user.rating}</Value>
              <Wins>Wins:</Wins>
              <Value>{this.props.online.user.wins}</Value>
            </Stats>
            <Legend>
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
          </UserProfile>
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
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  background: url(${background}) dimgrey;
  width: 100vw;
`;
const Body = styled.div`
  margin-top: 75px;
  grid-row: 2;
  grid-column: 1 / 13;
  height: 85vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;
const UserProfile = styled.div`
  grid-column: 1;
  display: grid;
  background: #aaaaaa;
  grid-template-rows: 0.3fr 2fr;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;
const Username = styled.h1`
  height: 50%;
  justify-self: center;
  grid-row: 1;
  grid-column: 1 / 3;
  font-size: 26px;
  font-weight: bold;
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
`;
const Stats = styled.div`
  grid-column: 1 / 3;
  grid-row: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 40px 40px;
`;
const Legend = styled.div`
  grid-row: 3;
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: #1f1f1f;
`;
const EntryDiv = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: gainsboro;
  font-weight: bold;
  font-size: 12px;
`;
const RatingDiv = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  color: gainsboro;
  font-weight: bold;
  font-size: 12px;
`;
const ColorDiv = styled.div`
  grid-column: 3;
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  justify-items: center;
  margin-top: 5px;
`;
const Rank = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`;
const Rating = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`;
const Wins = styled.h2`
  grid-column: 1;
  justify-self: right;
  margin-right: 1em;
`;
const Value = styled.h2`
  grid-column: 2;
  justify-self: left;
  width: 100%;
`;
const OnlineUsers = styled.div`
  grid-column: 2;
  display: grid;
  grid-template-rows: 70px auto;
`;
const Online = styled.h1`
  grid-row: 1;
  justify-self: center;
  font-size: 40px;
  color: #f2f2f2;
  width: 100%;
  text-align: center;
`;
const UserList = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-rows: repeat(auto-fit, 60px);
  overflow: auto;
  justify-self: center;
  width: 60%;
  height: 100%;
  padding: 1em;
`;
