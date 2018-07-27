import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import mapDispatchToProps from './actions/mapDispatchToProps'
import mapStateToProps from './store/mapStateToProps'
import App from './containers/App'

const Root = (props) => {
  return (
    <Router>
      <Route {...props} 
        path="/" 
        render={ (routeProps) => <App {...props} {...routeProps} /> }
      />
    </Router>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);