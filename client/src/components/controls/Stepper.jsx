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
    <div className="">
      <label className="">{label.toUpperCase()}</label>
      <div className="">
        <button className="" onClick={decrement}>
          -
        </button>
        <div className="">{value}</div>
        <button className="" onClick={increment}>
          +
        </button>
      </div>
    </div>
  )
}
