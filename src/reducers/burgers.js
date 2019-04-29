import {
  RECEIVE_BURGERS,
  ADD_BURGER,
  UPDATE_BURGER,
  DELETE_BURGER
} from '../actions/burgers'

export default function burgers (state = [], action) {
  switch(action.type) {
    case RECEIVE_BURGERS :
      return action.burgers
    case ADD_BURGER :
      return {...state, ...action.burger}
    case UPDATE_BURGER :
      return Object.assign(action.burger, state)
    case DELETE_BURGER :
      const burgers = state
      delete burgers[action.burger.name]
      return Object.assign(burgers)
    default :
      return state
  }
}