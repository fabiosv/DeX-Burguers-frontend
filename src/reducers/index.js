import { combineReducers } from 'redux'
import ingredients from './ingredients'
import burgers from './burgers'
import loading from './loading'

export default combineReducers({
  ingredients,
  burgers,
  loading
})