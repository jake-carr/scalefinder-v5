import React, { useState, useContext } from 'react'
import { connect } from 'react-redux'
import { indexToString, getAlteration } from '../../constants/utils'
import TuningPicker from './TuningPicker'
import { ThemeContext } from '../App'

export default connect(mapStateToProps, mapDispatchToProps)(Tuner)

function Tuner({ tuning, stringIndex, set, sharps, mobile }) {
  const theme = useContext(ThemeContext)

  const parseDown = (n) => {
    return n === 0 ? 11 : n - 1
  }

  const parseUp = (n) => {
    return n === 11 ? 0 : n + 1
  }

  const tuneDown = () => {
    let update = [...tuning]
    update[stringIndex] = parseDown(update[stringIndex])
    set('tuning', update)
  }

  const tuneUp = () => {
    let update = [...tuning]
    update[stringIndex] = parseUp(update[stringIndex])
    set('tuning', update)
  }

  const handleNoteSelect = (noteIndex) => {
    if (modal) {
      let update = [...tuning]
      update[stringIndex] = noteIndex
      set('tuning', update)
      toggleModal(false)
    }
  }

  return (
    <div className="relative flex justify-center align-center items-center text-lg">
      <button
        className={`${
          mobile ? 'h-4 w-4' : 'h-6 w-6'
        } border-box border-2 border-transparent duration-200 px-2 flex text-sm items-center text-center justify-center outline-none focus:outline-none`}
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneDown()}>
        -
      </button>
      {mobile ? (
        <div
          className="outline-none border-box border-2 border-transparent rounded-full h-6 w-6 my-1 mx-1 text-sm font-bold text-center outline-none focus:outline-none"
          style={{ backgroundColor: theme.tuning0, color: theme.text }}>
          {indexToString(tuning[stringIndex], sharps)}
        </div>
      ) : (
        <TuningPicker stringIndex={stringIndex} />
      )}
      <button
        className={`${
          mobile ? 'h-4 w-4' : 'h-6 w-6'
        } border-box border-2 border-transparent duration-200 px-2 flex text-sm items-center text-center justify-center outline-none focus:outline-none`}
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneUp()}>
        +
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
    sharps: state.sharps,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
