import styled from "styled-components";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const handleClick = (e, cb, credentials) => {
  e.preventDefault();
  cb(credentials);
};

const handleChange = (cb, inputType, input) => {
  cb(inputType, input);
};

export default class Homepage extends Component {

  render() {

    let username = this.props.input.username
    let password = this.props.input.password

    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/challenge" />;
    }

    return (
      <Layout>
        <Navbar {...this.props} active={"home"} />
        <Body>
          <Title>
            <p style={{color: 'white', gridRow: '1', gridColumn: '1'}}>C</p>
            <p style={{color: 'cyan', gridRow: '1', gridColumn: '2'}}>o</p>
            <p style={{color: 'green', gridRow: '1', gridColumn: '3'}}>d</p>
            <p style={{color: 'yellow', gridRow: '1', gridColumn: '4'}}>e</p>
            <p style={{color: 'orange', gridRow: '1', gridColumn: '5'}}>F</p>
            <p style={{color: 'orangered', gridRow: '1', gridColumn: '6'}}>i</p>
            <p style={{color: 'red', gridRow: '1', gridColumn: '7'}}>g</p>
            <p style={{color: 'maroon', gridRow: '1', gridColumn: '8'}}>h</p>
            <p style={{color: '#a500ff', gridRow: '1', gridColumn: '9'}}>t</p>
            <p style={{color: 'white', gridRow: '1', gridColumn: '10'}}>C</p>
            <p style={{color: 'cyan', gridRow: '1', gridColumn: '11'}}>l</p>
            <p style={{color: 'green', gridRow: '1', gridColumn: '12'}}>u</p>
            <p style={{color: 'yellow', gridRow: '1', gridColumn: '13'}}>b</p>
          </Title>
          <Description>
            Stand out to employers from your rating by competing against other coders
          </Description>
          <Instructions>
            Sign up below to start competing today
          </Instructions>
          <Verify>{this.props.auth.signupError}</Verify>
          <Input
            value={this.props.input.username}
            onChange={e => handleChange(this.props.addText, "username", e.target.value)}
            placeholder="Username"
            type="text"
            required
          />
          <Input 
            value={this.props.input.password}
            onChange={e => handleChange(this.props.addText, "password", e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button 
            onClick={e => {
              handleClick(e, this.props.signup, { username, password });
              this.props.clearAll();
            }}>
            Sign up
          </Button>
        </Body>
        <Footer />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr 50px;
  height: 100vh;
  width: 100vw;
  background: #1f1f1f;
  color: gainsboro;
`;
const Body = styled.div`
  margin-top: 10vh;
  display: grid;
  grid-row-gap: 15px;
  grid-template-rows: 100px 120px 60px 40px 40px 40px 40px;
  justify-items: center;
  text-align: center; 
`
const Title = styled.div`
  font-size: 60px;
  @media (max-width: 600px) {
    font-size: 50px;
  }
  display: grid;
  grid-template-columns: repeat(auto, 13);
  grid-template-rows: 1fr;
`
const Description = styled.h3`
  margin: 2rem;
  font-size: 30px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`
const Instructions = styled.p`
  margin: 1rem;
  font-size: 26px;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`
const Input = styled.input`
  width: 250px;
  font-size: 18px;
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 150px;
    font-size: 12px;
  }
`
const Button = styled.button`
  font-size: 20px;
  width: 200px;
  border-radius: 10px;
  &:hover {
    font-weight: bold;
    background: maroon;
    color: ghostwhite;
    border: 1px solid maroon;
    cursor: pointer;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    width: 100px;
  }
`;
const Verify = styled.p`
  color: red;
  justify-self: center;
  font-weight: bold;
  font-size: 18px;
`;