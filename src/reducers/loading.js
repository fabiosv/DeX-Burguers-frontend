import {RECEIVE_BURGERS} from '../actions/burgers'
import {RECEIVE_INGREDIENTS} from '../actions/ingredients'
import { LOADED, LOADING } from '../actions/loading'


export default function loading (state = true, action) {
  switch(action.type) {
    case RECEIVE_BURGERS :
      return true
    case RECEIVE_INGREDIENTS :
      return true
    case LOADED :
      return false
    case LOADING :
      return true
    default :
      return state
  }
}
