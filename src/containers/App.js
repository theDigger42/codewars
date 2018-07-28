import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from './Homepage'
import Challenge from './Challenge'
import PrivateRoute from '../components/PrivateRoute'

export default class App extends Component {

  render() {
    console.log("Rendering App with props", this.props);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage {...this.props}/>}
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