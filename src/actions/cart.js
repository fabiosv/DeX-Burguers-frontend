import API from "../utils/API"
import {loading, loaded} from "./loading"

export const CART_ADD_BURGER = 'CART_ADD_BURGER'
export const CART_REMOVE_BURGER = 'CART_REMOVE_BURGER'
export const CART_CLEAR_LIST = 'CART_CLEAR_LIST'

function cartAddBurger (burger, price) {
  return {
    type: CART_ADD_BURGER,
    burger,
    price
  }
}

export function cartRemoveBurger (burger) {
  return {
    type: CART_REMOVE_BURGER,
    burger
  }
}

export function cartClear () {
  return {
    type: CART_CLEAR_LIST
  }
}

export function handleCartAddBurger(burger,sucs_calb_fn, err_calb_fn) {
  console.log("getting prices")
  return (dispatch) => {
    dispatch(loading())
      return API.calculate.calculatePrice(burger)
        .then((data) => {
          data.name = burger.name
          dispatch(cartAddBurger(burger, data))
          dispatch(loaded())
          sucs_calb_fn()
        })
        .catch((error) =>{
          console.log(`Burger: ${error} not found`)
          dispatch(loaded())
        })
    }
}