import * as actions from './actionTypes'

export const reducer = (state, action) => {
  if (action.type === actions.TOGGLE) {
    return {
      ...state,
      [action.payload]: !state[action.payload],
    }
  }
  return state
}
