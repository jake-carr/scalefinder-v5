import React, { useState } from 'react'
import { connect } from 'react-redux'
import { indexToString, getAlteration } from '../../constants/utils'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(Tuner)

function Tuner({ tuning, stringIndex, set, sharps, darkTheme }) {
  const [modal, toggleModal] = useState(false)
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

  const Modal = () => {
    const notes = getAlteration(sharps)
    return (
      <div
        className="absolute bottom-10 flex flex-row duration-300"
        style={{ opacity: modal ? 1 : 0 }}
      >
        {notes.map((note, i) => {
          return (
            <button
              className={`focus:outline-none rounded-full text-xs h-5 w-5 flex items-center justify-center mx-1 ${
                modal ? 'cursor-pointer' : 'cursor-default'
              }`}
              style={
                tuning[stringIndex] === i
                  ? {
                      backgroundColor: theme.tuning1,
                      color: theme.bg0,
                      opactiy: 0.75,
                    }
                  : {
                      backgroundColor: theme.tuning0,
                      color: theme.text,
                    }
              }
              onClick={() => handleNoteSelect(i)}
            >
              {note}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="relative flex justify-center align-center items-center text-lg">
      <button
        className="px-2 h-6 w-6 flex text-sm items-center text-center justify-center focus:outline-none"
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneDown()}
      >
        -
      </button>
      <button
        className="focus:outline-none rounded-full text-sm h-7 w-7 flex items-center justify-center mx-1"
        style={{
          backgroundColor: theme.tuning0,
          color: theme.text,
        }}
        onClick={() => toggleModal(!modal)}
      >
        {indexToString(tuning[stringIndex], sharps)}
      </button>
      <button
        className="px-2 h-6 w-6 flex text-sm items-center text-center justify-center focus:outline-none"
        style={{
          color: theme.text,
          borderRadius: '50%',
        }}
        onClick={() => tuneUp()}
      >
        +
      </button>
      {Modal()}
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
