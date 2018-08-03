import React, { Component } from 'react'
import styled from 'styled-components'
import {
  subscribeToSocket,
  sendMessage
} from '../socket/api';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [{}]
    }
    this.handleChange = this.handleChange.bind(this)
    this.enterInput = this.enterInput.bind(this)
  }

  componentDidMount() {
    subscribeToSocket(this.props.auth.user.username, (message) => {
      let messages = [...this.state.messages];
      messages.push(message);
      this.setState({
        messages: messages
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    sendMessage({
      user: this.props.auth.user.username,
      time: new Date().getTime(),
      contents: this.props.input.message
    })
    this.props.clearText('message')
  }

  handleChange(cb, inputType, input) {
    cb(inputType, input)
  }

  enterInput(e) {
    e.key === "Enter" && this.handleSubmit(e)
  }

  render() {
    let messages = [...this.state.messages].reverse().map((msg, i) => {
      if (msg.user) {
        return (
          <Message key={i}> ({msg.user}) : {msg.contents}</Message>
        )
      }
      return null
    })

    return (
      <Layout>
        <Navbar {...this.props} active={'chat'} />
        <Body>
          <Title>Chat Room</Title>
          <Window>
            <MessageBox>{messages}</MessageBox>
            <Input name="message" type="text" value={this.props.input.message} placeholder="Type here and hit ENTER to send"
              onChange={e => this.handleChange(this.props.addText, 'message', e.target.value)}
              onKeyPress={this.enterInput}
            />
          </Window>
        </Body>
        <Footer />
      </Layout>
    )
  }

}

const Layout = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-template-columns: repeat(auto-fit, 1fr);
  width: 100vw;
  height: 100vh;
`
const Body = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-rows: 75px auto;
  grid-template-columns: 10% auto 10%;
  background: grey;
  height: 80vh;
`
const Window = styled.div`
  grid-row: 2;
  grid-column: 2;
  background: black;
  overflow: hidden;
  display: grid;
  grid-template-rows: repeat(10, 1fr) 55px;
`
const Message = styled.li`
  background: black;
  color: gainsboro;
  width: 70vw;
  height: 30px;
  border: 1px solid maroon;
  border-radius: 20px;
  font-size: 30px;
  padding: 0.5em;
  transform: rotate(-180deg);
`
const MessageBox = styled.ul`
  grid-row: 1 / 11;
  transform: rotate(180deg);
`
const Input = styled.textarea`
  align-self: bottom;
  width: 100%;
  grid-row: 11;
  font-size: 30px;
  text-align: center;
`
const Title = styled.h1`
  grid-row: 1;
  grid-column: 2;
  justify-self: center;
`

