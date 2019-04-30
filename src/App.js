import React, { Component } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import ConnectedMainPage from './views/mainPage'
import DemoPage from './views/demoPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/demo' component={DemoPage}/>
            <Route exact path='/' component={ConnectedMainPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading
}))(App)
