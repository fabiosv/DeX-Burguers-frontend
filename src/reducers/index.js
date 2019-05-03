import { combineReducers } from 'redux'
import ingredients from './ingredients'
import burgers from './burgers'
import customBurger from './customBurger'
import loading from './loading'
import prices from './prices'

export default combineReducers({
  ingredients,
  burgers,
  customBurger,
  prices,
  loading
})