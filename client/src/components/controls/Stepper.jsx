import React from 'react'

export default function Stepper({ label, value, action, min, max }) {
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
    <div className="flex flex-col mx-2">
      <label>{label.toUpperCase()}</label>
      <div className="flex flex-row justify-center">
        <button className="px-1" onClick={decrement}>
          -
        </button>
        <div className="px-1">{value}</div>
        <button className="px-1" onClick={increment}>
          +
        </button>
      </div>
    </div>
  )
}
