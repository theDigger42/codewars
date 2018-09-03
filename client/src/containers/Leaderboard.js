import styled from "styled-components";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["Daily"]
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
              <UserName rank={user.rank} key={i}>
                {" "}
                {user._id.username}{" "}
              </UserName>
            );
          })
        : this.props.score.leaderboard.map((user, i) => {
            return (
              <UserName rank={user.rank} key={i}>
                {" "}
                {user.username}{" "}
              </UserName>
            );
          });
    let ratings =
      this.state.tags[0] === "Daily"
        ? this.props.score.daily.map((user, i) => {
            if (user.rating < 0) {
              return <UserRating key={i}> {user.rating} </UserRating>;
            } else {
              return <UserRating key={i}> +{user.rating} </UserRating>;
            }
          })
        : this.props.score.leaderboard.map((user, i) => {
            if (user.rating < 0) {
              return <UserRating key={i}> {user.rating} </UserRating>;
            } else {
              return <UserRating key={i}> {user.rating} </UserRating>;
            }
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
          <LeftDiv>
            <User>User</User>
            {usernames}
          </LeftDiv>
          <MiddleDiv>
            {/* <Rating>Rating</Rating>
            {ratings} */}
          </MiddleDiv>
          <RightDiv>
            <Rating>
              {this.state.tags[0] === "Daily" ? "Rating Δ" : "Rating"}
            </Rating>
            {ratings}
          </RightDiv>
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
  background-color: #1f1f1f;
`;
const Selection = styled.div`
  grid-column: 1 / 13;
  margin-top: 100px;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
`;
const DailyButton = styled.button`
  grid-column: 1;
  width: 20vw;
  font-size: 20px;
  border-radius: 5px;
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
`;
const LeaderboardButton = styled.button`
  grid-column: 3;
  width: 20vw;
  font-size: 20px;
  border-radius: 5px;
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
`;
const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 5% 1fr 1fr 1fr 5%;
  grid-column-gap: 10px;
  min-height: 60vh;
  margin-bottom: 75px;
`;
const LeftDiv = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: right;
  margin-bottom: 50px;
`;
const MiddleDiv = styled.div`
  grid-row: 1;
  grid-column: 3;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: center;
`;
const RightDiv = styled.div`
  grid-row: 1;
  grid-column: 4;
  display: grid;
  grid-template-rows: 50px auto;
  grid-row-gap: 30px;
  justify-self: left;
  margin-bottom: 50px;
`;
const Title = styled.h1`
  grid-column: 1 / 13;
  justify-self: center;
  min-height: 50px;
  color: gainsboro;
  width: 100%;
  text-align: center;
`;
const User = styled.span`
  font-size: 30px;
  justify-self: right;
  font-weight: bold;
  color: gainsboro;
`;
const Rating = styled.span`
  font-size: 30px;
  justify-self: left;
  font-weight: bold;
  color: gainsboro;
`;
const UserName = styled.span`
  font-weight: bold;
  font-size: 24px;
  justify-self: right;
  color: ${props => {
    if (props.rank === "Bad") {
      return "blue";
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
      return "dimgrey";
    } else if (props.rank === "Hacker") {
      return "black";
    } else if (props.rank === "New") {
      return "white";
    } else {
      return "white";
    }
  }};
`;
const UserRating = styled.span`
  font-weight: bold;
  font-size: 24px;
  justify-self: center;
  color: gainsboro;
`;
