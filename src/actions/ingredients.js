import API from "../utils/API"

export const RECEIVE_INGREDIENTS = 'RECEIVE_INGREDIENTS'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'

function receiveIngredients(ingredients) {
  return {
    type: RECEIVE_INGREDIENTS,
    ingredients
  }
}

function addIngredient (ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient,
  }
}

function updateIngredient (ingredient) {
  return {
    type: UPDATE_INGREDIENT,
    ingredient
  }
}

function deleteComment (ingredient) {
  return {
    type: DELETE_INGREDIENT,
    ingredient,
  }
}

export function handleReceiveIngredients() {
  return (dispatch) => {
    return API.ingredients.getIngredients()
      .then((ingredients) => {
        dispatch(receiveIngredients(ingredients))
        // dispatch(loaded())
      })
      .catch((error) =>{
        console.log(`Ingredient: ${error} not found`)
        // dispatch(loaded())
      })
  }
}

export function handleAddIngredient(ingredient, sucs_calb_fn, err_calb_fn) {
  return (dispatch) => {
    return API.ingredients.addIngredient(ingredient)
      .then((msg) => {
        dispatch(addIngredient(ingredient))
        // dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Ingredient: ${error} not found`)
        // dispatch(loaded())
        err_calb_fn()
      })
  }
}

export function handleUpdateIngredients(ingredient, sucs_calb_fn, err_calb_fn) {
  return (dispatch) => {
    return API.ingredients.updateIngredient()
      .then((msg) => {
        dispatch(updateIngredient(ingredient))
        // dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Ingredient: ${error} not found`)
        // dispatch(loaded())
        err_calb_fn()
      })
  }
}

export function handleDeleteIngredients(ingredient, sucs_calb_fn, err_calb_fn) {
  return (dispatch) => {
    return API.ingredients.deleteIngredient()
      .then((msg) => {
        dispatch(deleteComment(ingredient))
        // dispatch(loaded())
        sucs_calb_fn()
      })
      .catch((error) =>{
        console.log(`Ingredient: ${error} not found`)
        // dispatch(loaded())
        err_calb_fn()
      })
  }
}