import { API_HOST, API_VERSION, headers } from '../api_settings'

export const calculatePrice = (burger) =>
  fetch(`${API_HOST}/${API_VERSION}/calculate`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(burger)
  }).then(res => res.json())
