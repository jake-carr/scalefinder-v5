import React from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(RectangularButton)

function RectangularButton({ title, action, value, condition, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const { secondary0, secondary1, tertiary0, tertiary1, bg0, bg1, bg2, bg3, text } = theme
  const applyStyles = () => {
    if (value) {
      switch (condition) {
        case 'highlightRoots':
          return {
            backgroundColor: secondary0,
            border: `2px solid ${secondary1}`,
            color: bg0,
          }
        case 'degrees':
          return {
            backgroundColor: tertiary0,
            border: `2px solid ${tertiary1}`,
            color: text,
          }
        default:
          return {
            backgroundColor: bg3,
            border: `2px solid ${bg2}`,
            color: text,
          }
      }
    } else {
      return {
        backgroundColor: bg0,
        border: `2px solid ${bg1}`,
        color: text,
      }
    }
  }

  return (
    <button
      className="w-40 h-12 mx-2 rounded"
      style={applyStyles()}
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
