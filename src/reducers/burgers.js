import {
  RECEIVE_BURGERS,
  ADD_BURGER,
  UPDATE_BURGER,
  DELETE_BURGER
} from '../actions/burgers'

export default function burgers (state = [], action) {
  switch(action.type) {
    case RECEIVE_BURGERS :
      return Object.keys(action.burgers).map((burger) => ({
        name: burger,
        ingredients: action.burgers[burger]
      }))
    case ADD_BURGER :
      return [...state, ...action.burger]
    case UPDATE_BURGER :
      return state.filter((burger) => burger.name === action.burger.name
        ? {
          name: burger,
          ingredients: action.burgers[burger].ingredients
        }
        : burger
      )
    case DELETE_BURGER :
      return state.filter((burger) => burger.name !== action.burger.name)
    default :
      return state
  }
}