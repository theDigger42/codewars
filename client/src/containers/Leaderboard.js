import styled from "styled-components";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import background from '../images/Grey-website-background.png'
import ScoreCard from '../components/ScoreCard'

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["All Time"]
    };

    this.clickTag = this.clickTag.bind(this);
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags });
  }

  componentDidMount() {
    this.props.getDailyLeaderboard();
    this.props.getLeaderboard();
  }

  render() {
    let usernames =
      this.state.tags[0] === "Daily"
        ? this.props.score.daily.map((user, i) => {
            return (
              <ScoreCard suffix={i+1} rank={user.rank} username={user._id.username} rating={user.rating}/>
            );
          })
        : this.props.score.leaderboard.map((user, i) => {
            return (
              <ScoreCard suffix={i+1} rank={user.rank} rating={user.rating} username={user.username}/>
            );
          });
    return (
      <Layout>
        <Navbar {...this.props} active={"scores"} />
        <Selection>
          <DailyButton
            onClick={() => this.clickTag("Daily")}
            active={this.state.tags[0] === "Daily"}
          >
            Today
          </DailyButton>
          <LeaderboardButton
            onClick={() => this.clickTag("All Time")}
            active={this.state.tags[0] === "All Time"}
          >
            All Time
          </LeaderboardButton>
        </Selection>
        <Title>{this.state.tags[0] + " Leaderboard"}</Title>
        <Body>
          <MiddleDiv>

            {usernames}
          </MiddleDiv>
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
  width: 100vw;
  background: url(${background}) dimgrey;
`;
const Selection = styled.div`
  grid-column: 1 / 13;
  margin-top: 8vh;
  width: 100%;
  justify-self: center;
  display: grid;
  background: #1f1f1f;
  grid-template-columns: 1fr 50px 1fr;
  padding: 1em;
`;
const DailyButton = styled.button`
  grid-column: 1;
  width: 200px;
  font-size: 20px;
  border-radius: 5px;
  justify-self: right;
  background: gainsboro;
  &:hover {
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    cursor: pointer;
  }
  ${({ active }) =>
    active &&
    `
    color: ghostwhite;
    background: maroon;
    font-weight: bold;
  `};
  @media (max-width: 650px) {
    font-size: 14px;
    width: 80px;
  }
`;
const LeaderboardButton = styled.button`
  grid-column: 3;
  width: 200px;
  font-size: 20px;
  border-radius: 5px;
  background: gainsboro;
  &:hover {
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    cursor: pointer;
  }
  ${({ active }) =>
    active &&
    `
    color: ghostwhite;
    background: maroon;
    font-weight: bold;
  `};
  @media (max-width: 650px) {
    font-size: 14px;
    width: 80px;
  }
`;
const Body = styled.div`
  grid-column: 1 / 13;
  justify-self: center;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 15% 1fr 1fr 1fr 15%;
  grid-column-gap: 10px;
  width: 80%;
  min-height: 62vh;
  margin-bottom: 75px;
  background: #1f1f1f;
`;
const MiddleDiv = styled.div`
  grid-row: 1;
  grid-column: 1 / 6;
  display: grid;
  padding: 2em;
  width: 80%;
  grid-row-gap: 20px;
  justify-self: center;
`;
const Title = styled.h1`
  grid-column: 1 / 13;
  justify-self: center;
  align-self: center;
  color: gainsboro;
  width: 100%;
  text-align: center;
  font-size: 40px;
  background: #1f1f1f;
  width: 80%;
  @media (max-width: 650px) {
    font-size: 24px;
  }
`;