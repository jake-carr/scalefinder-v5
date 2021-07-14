import React, { useContext } from 'react'
import { ThemeContext } from '../App'

export default function RectangularButton({ title, action, value, condition }) {
  const theme = useContext(ThemeContext)
  const {
    secondary0,
    secondary1,
    tertiary0,
    tertiary1,
    bg0,
    bg1,
    bg2,
    bg3,
    text,
  } = theme

  const applyStyles = () => {
    if (value) {
      switch (condition) {
        case 'highlightRoots':
          return {
            backgroundColor: secondary0,
            color: bg0,
          }
        case 'degrees':
          return {
            backgroundColor: tertiary0,
            color: text,
          }
        default:
          return {
            backgroundColor: bg3,
            color: text,
          }
      }
    } else {
      return {
        backgroundColor: bg0,
        color: text,
      }
    }
  }

  return (
    <button
      className={`w-40 h-10 mx-1 rounded border-box border-2 border-transparent duration-300 outline-none focus:outline-none`}
      style={applyStyles()}
      title={title}
      onClick={() => action(!value)}
    >
      {title}
    </button>
  )
}
