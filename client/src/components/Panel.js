import React, { Component } from "react";
import ScoreCard from "./ScoreCard";
import styled from "styled-components";
import '../styles/loader.css'
import { gameComplete } from "../socket/api";
import TestResults from "./TestResults";

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ["instructions"],
      results: "",
      isComplete: false
    };

    this.clickTag = this.clickTag.bind(this);
    this.suffix = this.suffix.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.submit({
      solution: this.props.prompt.solution,
      tests: this.props.prompt.tests,
      testDescriptions: this.props.prompt.testDescriptions
    });

    setTimeout(() => {
      let passing = true;
      if (this.props.prompt.message !== "Success!") {
        passing = false;
      }
      if (passing) {
        gameComplete();
        this.props.setComplete();
        setTimeout(() => this.clickTag("scores"), 1000);
        this.props.leave();
      }
    }, 2000);
  }

  clickTag(tag) {
    var tags = [tag];
    this.setState({ tags: tags });
  }

  suffix(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  render() {
    
    if (this.props.prompt.timer === 0) {
      this.props.score.scoreboard.forEach(user => {
        if (user.username === this.props.auth.user.username) {
          if (user.finished === false) {
            this.props.leave();
            this.clickTag("instructions");
            this.props.clearPrompt();
            this.setState({ results: "" });
            this.props.clearScoreboard();
            this.props.changeRoom("lobby");
          }
        }
      });
    }

    let scoreboard = this.props.score.scoreboard.map((user, i) => {
      if (user.finished === true) {
        return (
          <ScoreCard
            suffix={this.suffix(i + 1)}
            username={user.username}
            rating={user.rating}
            rank={user.rank}
          />
        );
      } else {
        return <ScoreCard username={user.username} rank={user.rank} rating={user.rating} getOnlineUser={this.props.getOnlineUser}/>;
      }
    });

    let panelBody =
      this.state.tags[0] === "instructions" ? (
        <Info>{this.props.prompt.body}</Info>
      ) : this.state.tags[0] === "results" ? (
        <Info>{<TestResults results={this.props.prompt.testResults} loading={this.props.prompt.loading}/>}</Info>
      ) : (
        <Info>{scoreboard}</Info>
      );

    let submitButton =
      this.props.prompt.isComplete === false ? (
        <Button
          onClick={() => {
            this.handleSubmit();
            this.clickTag('results')
            this.setState({
              results: ''
            })
          }}
        >
          Submit
        </Button>
      ) : (
        <Button
          onClick={() => {
            this.props.join();
            this.props.changeRoom("waiting");
            this.clickTag("instructions");
            this.props.clearPrompt();
            this.setState({ results: "" });
            this.props.clearScoreboard();
          }}
        >
          Play again
        </Button>
      );

    let joinButton =
      this.props.prompt.room === "lobby" ? (
        <Button
          onClick={() => {
            this.props.changeRoom("waiting");
            this.props.join();
          }}
        >
          Join
        </Button>
      ) : this.props.prompt.room === "waiting" ? (
        <Button>Waiting...</Button>
      ) : (
        submitButton
      );

    return (
      <ResultsPanel>
        <TabContainer>
          <Tab
            active={this.state.tags[0] === "instructions"}
            onClick={() => {
              this.clickTag("instructions");
            }}
          >
            Instructions
          </Tab>
          <Tab
            active={this.state.tags[0] === "results"}
            onClick={() => {
              this.clickTag("results");
            }}
          >
            Results
          </Tab>
          <Tab
            active={this.state.tags[0] === "scores"}
            onClick={() => {
              this.clickTag("scores");
            }}
          >
            Players
          </Tab>
        </TabContainer>
        <Content>{panelBody}</Content>
        {joinButton}
      </ResultsPanel>
    );
  }
}

const ResultsPanel = styled.div`
  grid-column: 10 / 13;
  justify-self: center;
  display: grid;
  grid-template-rows: 40px 0.8fr 40px;
  margin-right: 1em;
  margin-left: 1em;
  width: 40vw;
  height: 75vh;
`;

const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  align-items: center;
  width: 40vw;
  height: 5vh;
`;
const Tab = styled.div`
  background: dimgrey;
  color: white;
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  height: 5vh;
  line-height: 5vh;
  padding: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${({ active }) =>
    active &&
    `
    color: black;
    background: #cccccc;
    font-weight: bold;
  `};
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);
  @media (max-width: 1000px) {
    font-size: 22px;
  }
  @media (max-width: 705px) {
    font-size: 16px;
  }
  @media (max-width: 510px) {
    font-size: 11px;
  }
`;
const Content = styled.div`
  font-size: 10px;
  height: 57vh;
  text-align: center;
  overflow: auto;
  font-weight: bold;
  padding: 1em;
  background: #cccccc;
  box-shadow: 4px 5px 6px rgba(0, 0, 0, 0.7);
`;
const Info = styled.div`
  font-size: 24px;
  @media (max-width: 860px) {
    font-size: 23px;
  }
  @media (max-width: 750px) {
    font-size: 21px;
  }
  @media (max-width: 650px) {
    font-size: 19px;
  }
`;
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
  color: ghostwhite;
  background: dimgrey;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  &:hover {
     {
      background: #1f1f1f;
    }
  }
  width: 40vw;
  height: 9vh;
  @media (max-width: 750px) {
    font-size: 24px;
  }
`;