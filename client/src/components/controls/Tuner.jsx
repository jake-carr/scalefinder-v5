import React, { useState } from 'react'
import { connect } from 'react-redux'
import { indexToString, getAlteration } from '../../constants/utils'

export default connect(mapStateToProps, mapDispatchToProps)(Tuner)

function Tuner({ tuning, stringIndex, set, sharps }) {
  const [modal, toggleModal] = useState(false)

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
    let update = [...tuning]
    update[stringIndex] = noteIndex
    set('tuning', update)
    toggleModal(false)
  }

  const Modal = () => {
    const notes = getAlteration(sharps)
    return (
      <div className="relative bottom-5 right-5 border-2 border-solid grid grid-cols-4 grid-rows-3 gap-2">
        {notes.map((note, i) => {
          return (
            <button className="rounded-full border-1" onClick={() => handleNoteSelect(i)}>
              {note}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    // styling todo
    <div className="flex justify-center align-center text-lg">
      <button className="" onClick={() => tuneDown()}>
        -
      </button>
      <button className="" onClick={() => toggleModal(!modal)}>
        {indexToString(tuning[stringIndex], sharps)}
      </button>
      <button className="" onClick={() => tuneUp()}>
        +
      </button>
      {modal ? Modal() : null}
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
