import { GET_PRICE } from "../actions/prices";


export default function prices (state = [], action) {
  switch(action.type) {
    case GET_PRICE :
      const price = state.filter((burger) => burger.name === action.price.name)
      if(price.length > 0){
        const prices = state.map((burger) => burger.name === action.price.name ? action.price : burger)
        return prices
      }
      return [...state, action.price]
    default :
      return state
  }
}