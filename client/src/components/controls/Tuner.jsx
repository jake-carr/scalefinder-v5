import React, { useState } from 'react'
import { connect } from 'react-redux'
import { indexToString, getAlteration } from '../../constants/utils'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

import TunerModal from './TunerModal'

export default connect(mapStateToProps, mapDispatchToProps)(Tuner)

function Tuner({ tuning, stringIndex, set, sharps, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

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
        className="border-box border-2 border-transparent duration-200 px-2 h-6 w-6 flex text-sm items-center text-center justify-center focus:outline-none"
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneDown()}
      >
        -
      </button>
      <TunerModal stringIndex={stringIndex} />
      <button
        className="border-box border-2 border-transparent duration-200 px-2 h-6 w-6 flex text-sm items-center text-center justify-center focus:outline-none"
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneUp()}
      >
        +
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
    sharps: state.sharps,
    darkTheme: state.darkTheme,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
