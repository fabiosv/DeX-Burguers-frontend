import React, { Component } from 'react'
import './burgersPage.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleReceiveIngredients } from '../actions/ingredients'
import { handleReceiveBurgers } from '../actions/burgers'

class BurgersPage extends Component {
  state = {
    ingredients: []
  }
  submitFile = () => {}

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleReceiveIngredients())
  }

  render() {
    const {ingredients} = this.props;
    return (
      <div className="">
        <div>
          <label>Nome:</label>
          <input name="name" placeholder="X-Burger"/>
          {Object.keys(ingredients).map((ingredient) => (
            <span key={ingredient} className="ingredients">
              {ingredient}
              <span>
                <button className="btn addBtn" onClick={(e) => this.addIngredient(ingredient)}>+</button>
                <span>{this.countIngredient(ingredient)}</span>
                <button className="btn removeBtn" onClick={(e) => this.removeIngredient(ingredient)}>-</button>
              </span>
            </span>
          ))}
          <input type="file" name="file"/>
          <button style={{display: "block"}}>Submit</button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect((state) => ({
  loading: state.loading,
  ingredients: state.ingredients,
  burgers: state.burgers,
}))(BurgersPage))
