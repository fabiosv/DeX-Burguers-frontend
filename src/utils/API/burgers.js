import { API_HOST, headers } from '../api_settings'

export const getBurgers = () =>
  fetch(`${API_HOST}/burgers`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addBurger = (burger) =>
  fetch(`${API_HOST}/burgers`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(burger)
  }).then(res => res.json())

export const updateBurger = (burger) =>
  fetch(`${API_HOST}/burgers`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(burger)
  }).then(res => res.json())

export const deleteBurger = (name) =>
  fetch(`${API_HOST}/burgers`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: name})
  }).then(res => res.json())
