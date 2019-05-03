import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ingredientsList.css'
import {addIngredient, removeIngredient} from '../actions/customBurger'

class IngredientsList extends Component {
  countIngredient(name){
    const { customBurger } = this.props
    return customBurger.filter((ingr) => ingr === name).length
  }

  addIngredient(ingredient){
    const {dispatch} = this.props
    dispatch(addIngredient(ingredient))
  }

  removeIngredient(ingredient){
    const {dispatch} = this.props
    dispatch(removeIngredient(ingredient))
  }

  render(){
    const {ingredients} = this.props
    return(
      <div className="col-4">
        {Object.keys(ingredients).map((ingredient) => (
          <span key={ingredient} className="ingredients">
            {ingredient}
            <span>
              <button className="btn roundBtn addBtn" onClick={(e) => this.addIngredient(ingredient)}>+</button>
              <span>{this.countIngredient(ingredient)}</span>
              <button className="btn roundBtn removeBtn" onClick={(e) => this.removeIngredient(ingredient)}>-</button>
            </span>
          </span>
        ))}
      </div>
    )
  }
}

export default connect((state) => ({
  ingredients: state.ingredients,
  customBurger: state.customBurger,
}))(IngredientsList)
