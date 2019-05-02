import {
  CUSTOM_ADD_INGREDIENT,
  CUSTOM_REMOVE_INGREDIENT,
  CUSTOM_LOAD_INGREDIENTS
} from '../actions/customBurger'

export default function customBurger (state = [], action) {
  switch(action.type) {
    case CUSTOM_LOAD_INGREDIENTS :
      return action.ingredients
    case CUSTOM_ADD_INGREDIENT :
      return [...state, action.ingredient]
    case CUSTOM_REMOVE_INGREDIENT :
      const ingredients = state
      const index = ingredients.indexOf(action.ingredient)
      if(index >= 0) {
        ingredients.splice(index, 1)
      }
      return JSON.parse(JSON.stringify(ingredients))
    default :
      return state
  }
}