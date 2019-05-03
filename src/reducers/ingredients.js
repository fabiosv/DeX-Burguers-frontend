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
      return {...state, [action.ingredient.name]: action.ingredient.price }
    case UPDATE_INGREDIENT :
      state[action.ingredient.name] = action.ingredient.price
      return JSON.parse(JSON.stringify(state))
    case DELETE_INGREDIENT :
      delete state[action.ingredient.name]
      return JSON.parse(JSON.stringify(state))
    default :
      return state
  }
}