import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {API_HOST} from '../utils/api_settings'
import Sidebar from '../components/sidebar'

class MainPage extends Component {
  render() {
    const {ingredients, burgers} = this.props;
    return (
      <div className="">
        <header className="">
          <h1>DeX-Burgers</h1>
        </header>
        <Sidebar history={this.props.history}/>
        {/* <div>
          {JSON.stringify(ingredients)}
        </div> */}
        <h2>Cardápio</h2>
        <div className="burgers_menu">
          {burgers.map((burger) => (
            <span className="burger" key={burger.name}>
              <img src={API_HOST + burger.image} height={200} width={200}/>
              <h4>{burger.name}</h4>
              <ul>
                {burger.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
}))(MainPage))
