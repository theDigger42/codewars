import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from "./Homepage";

export default class App extends Component {

  render() {
    console.log("Rendering App with props", this.props);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage {...this.props} {...props} />}
        />
      </Switch>
    )
  }
}