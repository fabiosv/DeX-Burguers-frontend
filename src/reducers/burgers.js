import {
  RECEIVE_BURGERS,
  ADD_BURGER,
  UPDATE_BURGER,
  UPDATE_BURGER_IMAGE,
  DELETE_BURGER
} from '../actions/burgers'

export default function burgers (state = [], action) {
  switch(action.type) {
    case RECEIVE_BURGERS :
      return Object.keys(action.burgers).map((burger) => ({
        name: burger,
        ...action.burgers[burger]
      }))
    case ADD_BURGER :
      return [...state, action.burger]
    case UPDATE_BURGER :
      return state.filter((burger) => {
        if(burger.name === action.burger.name) {
          return action.burger
        }
        return burger
      })
    case UPDATE_BURGER_IMAGE :
      return state.filter((burger) => {
        console.log(burger.name + " " + action.burger.name)
        if(burger.name === action.burger.name) {
          return action.burger
        }
        return burger
      })
    case DELETE_BURGER :
      return state.filter((burger) => burger.name !== action.burger.name)
    default :
      return state
  }
}