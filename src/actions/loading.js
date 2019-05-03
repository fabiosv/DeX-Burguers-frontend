export const LOADED = "LOADED"
export const LOADING = "LOADING"

export function loaded() {
  return {
    type: LOADED
  }
}

export function loading() {
  return {
    type: LOADING
  }
}