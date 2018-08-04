import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Challenge from './Challenge'
import PrivateRoute from '../components/PrivateRoute'
import Leaderboard from "./Leaderboard";
import Help from './Help'
import Chat from './Chat'
import Profile from './Profile'

import {
  subscribeToTimerSocket,
  getDateTimerSocket,
  subscribeToGameSocket,
  joinWaitingRoom,
  exitWaitingRoom,
  gameInit
} from '../socket/api'
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timerTillNextGame: 0,
      isComplete: false
    }
    this.updateTimer = this.updateTimer.bind(this)
    this.onGameStart = this.onGameStart.bind(this)
    this.joinGame = this.joinGame.bind(this)
    this.leaveGame = this.leaveGame.bind(this)
  }

  updateTimer(date) {
    let secondsTillNextGame = 60 - (new Date(date).getSeconds());
    this.setState({ timerTillNextGame: secondsTillNextGame });
    let timer = setInterval(() => {
      secondsTillNextGame--;
      this.setState({ timerTillNextGame: secondsTillNextGame });
      if (secondsTillNextGame <= -1) {
        clearInterval(timer);
        if (this.props.prompt.room === 'waiting') {
          this.props.changeRoom('game')
          this.onGameStart()
        }
        getDateTimerSocket();
      }
    }, 1000)
  }

  joinGame() {
    subscribeToGameSocket(this.onGameStart, this.props.onScoreboardChange);
    joinWaitingRoom({ username: this.props.auth.user.username })
  }

  leaveGame() {
    exitWaitingRoom({ username: this.props.auth.user.username })
  }

  onGameStart() {
    gameInit()
  }

  componentWillMount() {
    this.props.getLeaderboard()
    getDateTimerSocket();
    subscribeToTimerSocket(this.updateTimer);
  }

  componentWillUnmount() {
    exitWaitingRoom()
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Homepage {...this.props} />}
        />
        <Route
          path='/scores'
          render={() => <Leaderboard {...this.props} />}
        />
        <Route
          path='/help'
          render={() => <Help {...this.props} />}
        />
        <PrivateRoute
          path='/challenge'
          component={Challenge}
          timer={this.state.timerTillNextGame}
          join={this.joinGame}
          leave={this.leaveGame}
          {...this.props}
        />
        <PrivateRoute
          path='/chat'
          component={Chat}
          {...this.props}
        />
        <PrivateRoute
          path='/profile'
          component={Profile}
          {...this.props}
        />
      </Switch>
    )
  }
}