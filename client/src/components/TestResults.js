import React from "react";
import styled from "styled-components";

export default class TestResults extends React.Component {
  render() {
    return this.props.results.length !== 0 ? (
      this.props.results.map((test, i) => {
        return test.passing ? (
          <PassResult key={i}>{test.description}</PassResult>
        ) : (
          <FailResult key={i}>{test.description}</FailResult>
        );
      })
    ) : this.props.loading ? (
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    ) : null;
  }
}

const PassResult = styled.p`
  color: green;
`;
const FailResult = styled.p`
  color: red;
`;
