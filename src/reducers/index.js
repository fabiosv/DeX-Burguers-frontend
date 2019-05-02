import { combineReducers } from 'redux'
import ingredients from './ingredients'
import burgers from './burgers'
import customBurger from './customBurger'
import loading from './loading'

export default combineReducers({
  ingredients,
  burgers,
  customBurger,
  loading
})