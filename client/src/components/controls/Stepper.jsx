import React from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(Stepper)

function Stepper({ label, value, action, min, max, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const decrement = () => {
    if (value > min) {
      action(value - 1)
    }
  }

  const increment = () => {
    if (value < max) {
      action(value + 1)
    }
  }

  return (
    <div className="flex flex-col mx-2 justify-center align-center pb-3">
      <label>{label.toUpperCase()}</label>
      <div className="flex flex-row">
        <button
          className="px-2 h-5 w-5 flex items-center justify-center"
          onClick={decrement}
        >
          -
        </button>
        <div
          className="h-5 w-5 text-center transition duration-300"
          style={{ color: theme.tertiary0 }}
        >
          {value}
        </div>
        <button
          className="px-2 h-5 w-5 flex items-center justify-center"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
