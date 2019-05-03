import {
  RECEIVE_INGREDIENTS,
  ADD_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT
} from '../actions/ingredients'

export default function ingredients (state = [], action) {
  switch(action.type) {
    case RECEIVE_INGREDIENTS :
      return action.ingredients
    case ADD_INGREDIENT :
      return {...state, ...action.ingredient}
    case UPDATE_INGREDIENT :
      return Object.assign(action.ingredient, state)
    case DELETE_INGREDIENT :
      const ingredients = state
      delete ingredients[action.ingredient.name]
      return Object.assign(ingredients)
    default :
      return state
  }
}