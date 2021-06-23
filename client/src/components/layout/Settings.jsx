import React, { useState } from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import RoundButton from '../controls/RoundButton'
import Metronome from '../controls/Metronome'

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function Settings({
  darkTheme,
  rootIndex,
  scaleIndex,
  sharps,
  highlightRoots,
  labelAllNotes,
  degrees,
  degreeNotation,
  tuning,
  frets,
  set,
  toggle,
}) {
  const scaleNames = listScales()
  const randomize = () => {
    set('noteIndex', Math.floor(Math.random() * 12))
    set('scaleIndex', Math.floor(Math.random() * scales.length))
  }
  return (
    <main>
      <Metronome />
      <h2>{sharps ? 'b' : '#'}</h2>
      <div className="settings-upper">
        <RoundButton title="Randomize root and scale." action={randomize} />
        (Left) Dice - Root - Scale [i button below] - Tuning - Fret and String steppers
        (Space) Theme and Remember (Right)
      </div>
      <div className="settings-lower">
        (Left) Alt - Highlights - Labels - Degrees - Degree Dropdown (Space) Metronome
        (Right)
        {rootIndex}
        <button onClick={() => set('rootIndex', 8)}>aaa</button>
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
    rootIndex: state.rootIndex,
    scaleIndex: state.scaleIndex,
    sharps: state.sharps,
    highlightRoots: state.highlightRoots,
    labelAllNotes: state.labelAllNotes,
    degrees: state.degrees,
    degreeNotation: state.degreeNotation,
    tuning: state.tuning,
    frets: state.frets,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
