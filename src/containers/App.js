import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Challenge from './Challenge'
import PrivateRoute from '../components/PrivateRoute'
import Leaderboard from "./Leaderboard";
import Help from './Help'
import Chat from './Chat'
import Profile from './Profile'

export default class App extends Component {

  componentWillMount() {
    this.props.getLeaderboard()
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