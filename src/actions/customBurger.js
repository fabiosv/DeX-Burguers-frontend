export const CUSTOM_LOAD_INGREDIENTS = 'CUSTOM_LOAD_INGREDIENTS'
export const CUSTOM_ADD_INGREDIENT = 'CUSTOM_ADD_INGREDIENT'
export const CUSTOM_REMOVE_INGREDIENT = 'CUSTOM_REMOVE_INGREDIENT'
export const CUSTOM_CLEAR_LIST = 'CUSTOM_CLEAR_LIST'

export function loadIngredients (ingredients) {
  return {
    type: CUSTOM_LOAD_INGREDIENTS,
    ingredients,
  }
}

export function addIngredient (ingredient) {
  return {
    type: CUSTOM_ADD_INGREDIENT,
    ingredient,
  }
}


export function removeIngredient (ingredient) {
  return {
    type: CUSTOM_REMOVE_INGREDIENT,
    ingredient,
  }
}

export function clearCustomList () {
  return {
    type: CUSTOM_CLEAR_LIST
  }
}