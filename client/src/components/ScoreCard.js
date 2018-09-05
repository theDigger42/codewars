import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Layout = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr 1fr 1fr;
  grid-column-gap: 5px;
  justify-items: center;
  align-items: center;
  margin-bottom: 0.5em;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.9);
  border: 1px solid black;
  border-radius: 5px;
  height: 50px;
  font-size: 18px;
  @media (max-width: 650px) {
    font-size: 16px;
    height: 40px;
  }
  color: ${props => {
    if (props.rank === "Hacker") {
      return "white";
    } else {
      return "black";
    }
  }};
  background: ${props => {
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
  &:hover{
    cursor: pointer;
  }
`;
const Suffix = styled.span`
  margin-left: 1em;
  grid-column: 1;
  font-weight: bold;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;
const Username = styled.span`
  grid-column: 2;
  font-weight: bold;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;
const Rating = styled.span`
  grid-column: 3;
  font-weight: bold;
  font-style: italic;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;
const Rank = styled.span`
  grid-column: 4;
  font-weight: bold;
  font-style: italic;
  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

const ScoreCard = ({ suffix, username, rank, rating, getOnlineUser }) => {
  return (
    <Layout 
      rank={rank}
      to={`/profile/${username}`}
    >
      <Suffix>{suffix}</Suffix>
      <Username>{username}</Username>
      <Rating>{rating}</Rating>
      <Rank>{rank}</Rank>
    </Layout>
  );
};

export default ScoreCard;
