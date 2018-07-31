import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Challenge from './Challenge'
import PrivateRoute from '../components/PrivateRoute'
import Leaderboard from "./Leaderboard";
import Chat from './Chat'

export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Homepage {...this.props}/>}
        />
        <Route 
          path='/scores'
          render={() => <Leaderboard {...this.props}/>}
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
      </Switch>
    )
  }
}