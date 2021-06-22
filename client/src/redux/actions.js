import { TOGGLE, SET_VALUE } from './actionTypes'

// Booleans
export const toggle = (field) => ({
  type: TOGGLE,
  payload: field,
})

// Number, string or array
export const setValue = (field, value) => ({
  type: SET_VALUE,
  setting: field,
  payload: value,
})
