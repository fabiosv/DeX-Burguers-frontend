import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleReceiveIngredients } from '../actions/ingredients'
import { handleReceiveBurgers } from '../actions/burgers'

class MainPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleReceiveIngredients())
    dispatch(handleReceiveBurgers())
  }

  render() {
    const {ingredients, burgers} = this.props;
    return (
      <div className="">
        <header className="">
        </header>
        <div>
          {JSON.stringify(ingredients)}
        </div>
        <div className="burgers_menu">
          {burgers.map((burger) => (
            <span className="burger" key={burger.name}>
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
