import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Challenge from "./Challenge";
import PrivateRoute from "../components/PrivateRoute";
import Leaderboard from "./Leaderboard";
import Help from "./Help";
//import Chat from './Chat'
import Profile from "./Profile";

import {
  subscribeToOnlineSocket,
  subscribeToGameSocket,
  unsubscribe,
  joinWaitingRoom,
  exitWaitingRoom
} from "../socket/api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerTillNextGame: null,
      isComplete: false
    };
    this.joinGame = this.joinGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
  }

  componentDidMount() {
    subscribeToOnlineSocket(this.props.setOnline);
  }

  joinGame() {
    joinWaitingRoom(this.props.auth.user);
    subscribeToGameSocket(
      this.props.onScoreboardChange,
      this.props.onTimerChange
    );
  }

  leaveGame() {
    exitWaitingRoom(this.props.auth.user);
    unsubscribe();
  }

  componentWillUnmount() {
    exitWaitingRoom();
    unsubscribe();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Homepage {...this.props} />} />
        <Route path="/scores" render={() => <Leaderboard {...this.props} />} />
        <PrivateRoute path="/help" component={Help} {...this.props} />
        <PrivateRoute
          path="/challenge"
          component={Challenge}
          timer={this.props.prompt.timer}
          join={this.joinGame}
          leave={this.leaveGame}
          {...this.props}
        />
        {/* <PrivateRoute
          path='/chat'
          component={Chat}
          {...this.props}
        /> */}
        <PrivateRoute path="/profile" component={Profile} {...this.props} />
      </Switch>
    );
  }
}
