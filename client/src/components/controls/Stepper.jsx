import React, { useContext } from 'react'
import { ThemeContext } from '../App'

export default function Stepper({ label, value, action, min, max }) {
  const theme = useContext(ThemeContext)

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
    <div className="flex flex-col ml-2 relative text-center">
      <label className="relative bottom-5 h-0 text-xs">
        {label.toUpperCase()}
      </label>
      <div className="flex flex-row justify-center items-center">
        <button
          className="px-2 h-6 w-6 flex text-sm items-center text-center border-box border-2 border-transparent duration-100 justify-center outline-none focus:outline-none"
          style={{
            color: theme.text,
            borderRadius: '50%',
          }}
          onClick={decrement}>
          -
        </button>
        <span
          className="mx-1 w-6 text-center font-bold transition duration-300"
          style={{ color: theme.tertiary0 }}>
          {value}
        </span>
        <button
          className="px-2 h-6 w-6 flex text-sm items-center text-center border-box border-2 border-transparent duration-100 justify-center outline-none focus:outline-none"
          style={{
            color: theme.text,
            borderRadius: '50%',
          }}
          onClick={increment}>
          +
        </button>
      </div>
    </div>
  )
}
