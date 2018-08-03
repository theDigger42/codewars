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
  exitWaitingRoom
} from '../socket/api'
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timerTillNextGame: '',
      gameTimer: 60,
      isComplete: false
    }
    this.updateTimer = this.updateTimer.bind(this)
    this.updateGameTimer = this.updateGameTimer.bind(this)
    this.onGameStart = this.onGameStart.bind(this)
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
          this.props.getPrompt()
          this.props.changeRoom('game')
          this.updateGameTimer();
        }
        getDateTimerSocket();
      }
    }, 1000)
  }

  updateGameTimer() {
    let secondsTillEndGame = this.state.gameTimer;
    let gameTimer = setInterval(() => {
      this.setState({ gameTimer: secondsTillEndGame });
      secondsTillEndGame--;
      if (secondsTillEndGame <= 0) {
        clearInterval(gameTimer);
        setTimeout(() => {
          this.setState({ gameTimer: 30 })
        }, 2000)
      }
    }, 1000)
  }

  onGameStart() {
    console.log('game started');
  }

  componentWillMount() {
    this.props.getLeaderboard()
    getDateTimerSocket();
    subscribeToTimerSocket(this.updateTimer);
    subscribeToGameSocket(this.onGameStart, this.props.onScoreboardChange);
    joinWaitingRoom({ username: this.props.auth.user.username })
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