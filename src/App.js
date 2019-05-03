import React, { Component } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'
import background from './background.jpg'
import { connect } from 'react-redux'
import { handleReceiveIngredients } from './actions/ingredients'
import { handleReceiveBurgers } from './actions/burgers'
import { handleReceivePrices } from './actions/prices';
import ConnectedMainPage from './views/mainPage'
// import ConnectedIngredientsPage from './views/ingredientsPage'
import ConnectedAdminPage from './views/adminPage'
// import ConnectedBurgersPage from './views/burgersPage'
import ConnectedCustomPage from './views/customPage'
import DemoPage from './views/demoPage'

class App extends Component {
  state = {
    ingredients: 0,
    bugers: 0
  }
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleReceiveIngredients())
    dispatch(handleReceiveBurgers())
  }
  componentDidUpdate(prevState, prevProps){
    if(typeof(this.props.burgers) !== "undefined"){
      if(this.props.burgers.length !== this.state.bugers){
        const {dispatch} = this.props
        const {burgers} = this.props
        console.log("going to get prices")
        burgers.forEach((burger) => {
          console.log(burger)
          dispatch(handleReceivePrices(burger))
        })
        this.setState(() => ({bugers: this.props.burgers.length}))
      }
    }
  }
  render() {
    return (
      <div className="App" style={{background: `url(${background}) no-repeat center center fixed`}}>
        <Router>
          <Switch>
            <Route exact path='/demo' component={DemoPage}/>
            <Route exact path='/admin' component={ConnectedAdminPage} />
            <Route exact path='/admin/:menu' component={ConnectedAdminPage} />
            <Route exact path='/' component={ConnectedMainPage} />
            <Route exact path='/custom' component={ConnectedCustomPage} />
            <Route exact path='/:menu' component={ConnectedMainPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading,
  burgers: state.burgers,
}))(App)
