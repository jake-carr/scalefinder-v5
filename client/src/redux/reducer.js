import * as actions from './actionTypes'

export const reducer = (state, action) => {
  if (action.type === actions.TOGGLE) {
    return {
      ...state,
      [action.payload]: !state[action.payload],
    }
  }
  if (action.type === actions.SET_VALUE) {
    return {
      ...state,
      [action.setting]: action.payload,
    }
  }
  return state
}
