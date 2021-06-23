import React from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(RectangularButton)

function RectangularButton({ title, action, value, condition, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const applyStyles = () => {
    if (value) {
      switch (condition) {
        case 'highlightRoots':
          return `bg-${theme.secondary0} border-${theme.secondary1} text-${theme.bg0}`
        case 'degrees':
          return `bg-${theme.tertiary0} border-${theme.tertiary1} text-${theme.text}`
        default:
          return `bg-${theme.bg3} border-${theme.bg2} text-${theme.text}`
      }
    } else {
      return `bg-${theme.bg0} border-${theme.bg1} text-${theme.text}`
    }
  }

  return (
    <button
      className={`w-40 h-12 mx-2 border-solid border-2 rounded ${applyStyles()}`}
      title={title}
      onClick={() => action(!value)}
    >
      {title}
    </button>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
