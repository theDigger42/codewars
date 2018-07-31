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
            console.log('message', message)
            let messages = [...this.state.messages];
            messages.push(message);
            console.log(messages);
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

        let messages = [...this.state.messages].reverse().map((msg) => {
            if (msg.user)
            return (
                <Message>{msg.user}: {msg.contents}</Message>
            )
        })

        return (
            <Layout>
                <Navbar {...this.props} active={'chat'}/>
                <Body>
                    <Title>Chat Room</Title>
                    <Window>
                        <MessageBox>{messages}</MessageBox>
                        <Input name="message" type="text" value={this.props.input.message}
                            onChange={e => this.handleChange(this.props.addText, 'message', e.target.value)}
                            onKeyPress={this.enterInput}
                        />
                        <Button onClick={(e) => this.handleSubmit(e)}> Send </Button>
                    </Window>
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
  width: 100vw;
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
    background: gainsboro;
    display: grid;
    grid-template-rows: auto 50px;
    grid-template-columns: 3fr 1fr;
`
const Message = styled.div`
    background: ghostwhite;
    width: 50%;
`
const MessageBox = styled.div`
    grid-row: 1;
    height: 62vh;
    display: grid;
    grid-template-rows: repeat(15, 30px);
    grid-row-gap: 10px;
    overflow: auto;
`
const Input = styled.textarea`
    align-self: bottom;
    justify-self: center;
    width: 60vw;
    grid-row: 2;
    grid-column: 1;
`
const Title = styled.h1`
    grid-row: 1;
    grid-column: 2;
    justify-self: center;
`
const Button = styled.button`
    grid-row: 2;
    grid-column: 2;
`