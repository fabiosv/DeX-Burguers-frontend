import React, { Component } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'
import { connect } from 'react-redux'
import { handleReceiveIngredients } from './actions/ingredients'
import { handleReceiveBurgers } from './actions/burgers'
import ConnectedMainPage from './views/mainPage'
// import ConnectedIngredientsPage from './views/ingredientsPage'
import ConnectedAdminPage from './views/adminPage'
// import ConnectedBurgersPage from './views/burgersPage'
import ConnectedCustomPage from './views/customPage'
import DemoPage from './views/demoPage'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleReceiveIngredients())
    dispatch(handleReceiveBurgers())
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/demo' component={DemoPage}/>
            <Route exact path='/admin' component={ConnectedAdminPage} />
            <Route exact path='/admin/:menu' component={ConnectedAdminPage} />
            <Route exact path='/' component={ConnectedMainPage} />
            <Route exact path='/custom' component={ConnectedCustomPage} />
            <Route exact path='/:menu' component={ConnectedMainPage} />
            {/* <Route exact path='/burgers' component={ConnectedBurgersPage} />
            <Route exact path='/ingredients' component={ConnectedIngredientsPage} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading
}))(App)
