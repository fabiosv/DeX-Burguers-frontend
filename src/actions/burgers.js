import API from "../utils/API"
import { loading, loaded } from "./loading";

export const RECEIVE_BURGERS = 'RECEIVE_BURGERS'
export const ADD_BURGER = 'ADD_BURGER'
export const UPDATE_BURGER = 'UPDATE_BURGER'
export const DELETE_BURGER = 'DELETE_BURGER'
export const UPDATE_BURGER_IMAGE = 'UPDATE_BURGER_IMAGE'


function receiveBurgers(burgers) {
  return {
    type: RECEIVE_BURGERS,
    burgers
  }
}

function addBurger (burger) {
  return {
    type: ADD_BURGER,
    burger,
  }
}

function updateBurger (burger) {
  return {
    type: UPDATE_BURGER,
    burger
  }
}

export function updateBurgerImage (burger) {
  return {
    type: UPDATE_BURGER_IMAGE,
    burger
  }
}

function deleteComment (burger) {
  return {
    type: DELETE_BURGER,
    burger,
  }
}

export function handleReceiveBurgers() {
  return (dispatch) => {
    dispatch(loading())
    return API.burgers.getBurgers()
      .then((burgers) => {
        dispatch(receiveBurgers(burgers))
        dispatch(loaded)
      })
      .catch((error) =>{
        console.log(`Burger: ${error} not found`)
        dispatch(loaded())
      })
  }
}

export function handleAddBurger(burger, sucs_calb_fn, err_calb_fn) {
  return (dispatch) => {
    dispatch(loading())
    return API.burgers.addBurger(burger)
      .then((data) => {
        data.name = burger.name
        dispatch(addBurger(data))
        dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Burger: ${error} not found`)
        dispatch(loaded())
        err_calb_fn(error)
      })
  }
}

export function handleUpdateBurger(burger, sucs_calb_fn, err_calb_fn) {
  return (dispatch) => {
    dispatch(loading())
    return API.burgers.updateBurger(burger)
      .then((data) => {
        console.log(data)
        dispatch(updateBurger(data))
        dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Burger: ${error}`)
        dispatch(loaded())
        err_calb_fn(error)
      })
  }
}

export function handleDeleteBurger(burger, sucs_calb_fn, err_calb_fn) {
  console.log(burger)
  return (dispatch) => {
    dispatch(loading())
    return API.burgers.deleteBurger(burger.name)
      .then((msg) => {
        dispatch(deleteComment(burger))
        dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Burger: ${error} not found`)
        dispatch(loaded())
        err_calb_fn(error)
      })
  }
}