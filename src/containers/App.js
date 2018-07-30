import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Challenge from './Challenge'
import PrivateRoute from '../components/PrivateRoute'
import Leaderboard from "./Leaderboard";

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
      </Switch>
    )
  }
}