import { GET_PRICE } from "../actions/prices";


export default function prices (state = [], action) {
  switch(action.type) {
    case GET_PRICE :
      return [...state, action.price]
    default :
      return state
  }
}