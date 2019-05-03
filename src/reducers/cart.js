import {
  CART_ADD_BURGER,
  CART_REMOVE_BURGER,
  CART_CLEAR_LIST
} from '../actions/cart'

export default function cart (state = [], action) {
  switch(action.type) {
    case CART_ADD_BURGER :
      const burger = {
        ...action.burger,
        ...action.price,
      }
      return [...state, burger]
    case CART_REMOVE_BURGER :
      const cart = state
      const index = cart.indexOf(action.burger)
      if(index >= 0) {
        cart.splice(index, 1)
      }
      return JSON.parse(JSON.stringify(cart))
    case CART_CLEAR_LIST :
      return []
    default :
      return state
  }
}