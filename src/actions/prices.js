import API from "../utils/API"
import {loading, loaded} from "./loading";
export const GET_PRICE = 'GET_PRICE'

function getPrice (price) {
  return {
    type: GET_PRICE,
    price
  }
}

export function handleReceivePrices(burger,sucs_calb_fn, err_calb_fn) {
  console.log("getting prices")
  return (dispatch) => {
    dispatch(loading())
      return API.calculate.calculatePrice(burger)
        .then((data) => {
          data.name = burger.name
          dispatch(getPrice(data))
          dispatch(loaded())
        })
        .catch((error) =>{
          console.log(`Burger: ${error} not found`)
          dispatch(loaded())
        })
    }
}