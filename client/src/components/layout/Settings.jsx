import React, { useState } from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import { getAlteration } from '../../constants/utils'
import RoundButton from '../controls/RoundButton'
import Metronome from '../controls/Metronome'
import Dropdown from '../controls/Dropdown'

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
  const noteOptions = getAlteration(sharps)
  const scaleOptions = listScales()
  const degreeOptions = ['Numeric', 'Roman numeral', 'Indian sargams']

  const randomize = () => {
    set('noteIndex', Math.floor(Math.random() * 12))
    set('scaleIndex', Math.floor(Math.random() * scales.length))
  }

  const selectNote = (i) => {
    set('rootIndex', Number(i))
  }

  const selectScale = (i) => {
    set('scaleIndex', Number(i))
  }

  const selectDegreeNotation = (notation) => {
    set('degreeNotation', notation)
  }

  return (
    <main>
      {/* <Metronome /> */}
      <div className="settings-upper">
        <RoundButton title="Randomize root and scale." action={randomize} />
        <Dropdown
          options={noteOptions}
          action={selectNote}
          val={rootIndex}
          name={'Root'}
        />
        <Dropdown
          options={scaleOptions}
          action={selectScale}
          val={scaleIndex}
          name={'Scale'}
        />{' '}
        [i button below scale] - Tuning Dropdown - Fret and String steppers (Space) Theme
        and Remember (Right)
      </div>
      <div className="settings-lower">
        (Left) Alt - Highlights - Labels - Degrees -{' '}
        <Dropdown
          options={degreeOptions}
          action={selectDegreeNotation}
          val={degreeNotation}
          name={'Degree Notation'}
        />{' '}
        (Space) Metronome (Right)
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
