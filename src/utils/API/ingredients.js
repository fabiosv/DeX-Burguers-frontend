import { API_HOST, headers } from '../api_settings'

export const getIngredients = () =>
  fetch(`${API_HOST}/ingredients`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addIngredient = (ingredient) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  }).then(res => res.json())

export const updateIngredient = (ingredient) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  }).then(res => res.json())

export const deleteIngredient = (ingredient) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: ingredient.name})
  }).then(res => res.json())
