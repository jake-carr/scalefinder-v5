import { TOGGLE } from './actionTypes'

export const toggle = (name) => ({
  type: TOGGLE,
  payload: name,
})
