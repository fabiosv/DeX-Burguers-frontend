import { API_HOST, headers } from '../api_settings'

export const getBurgers = () =>
  fetch(`${API_HOST}/ingredients`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addBurger = (ingredient) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  }).then(res => res.json())

export const updateBurger = (ingredient) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ingredient)
  }).then(res => res.json())

export const deleteBurger = (name) =>
  fetch(`${API_HOST}/ingredients`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name})
  }).then(res => res.json())
