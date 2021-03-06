// export const API_HOST = "http://localhost:3001"
export const API_HOST = "https://dex-burgers-backend.herokuapp.com"

export const API_VERSION = "api/v1.0"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const generateID = () => {
  return Math.random().toString(36).substr(2, 9)
}
