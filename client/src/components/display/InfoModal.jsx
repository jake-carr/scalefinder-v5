import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAlteration, makeChord, indexToString } from '../../constants/utils'

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)

function InfoModal({
  rootIndex,
  scaleIndex,
  showChord,
  chordNotes,
  darkTheme,
  sharps,
  set,
  toggle,
}) {
  // Displays information about the scale and chords in key (for at least 7 main modes)
  // Clicking on a chord will add a border to all notes on the fretboard that make up that chord; user can figure out all inversions/shapes from experimenting with them.
  // State will need 2 additional fields; 'showChord' and 'chordNotes' (from makeChord function)
  // Only one chord can be selected at a time. The chord selection and borders should persist even if the info modal is closed.
  // render chords in key based on rootIndex, scaleIndex with function from old version.
  const chords = 'todo'
  const [selectedChord, selectChord] = useState(null)
  useEffect(() => {
    // makeChord
    // set('chordNotes', makeChord result)
  }, [selectedChord])

  // when any are clicked on, toggle showChord on and selectedChord to that, or off if clicking the already selectedChord. text should change to match.
  // when selected chord changes, recalculate chordNotes and update state accordingly with makechord function.
  // Frets will need to be updated to connect to showChord & chordNotes

  return <div>this is the info modal</div>
}

function mapStateToProps(state) {
  return {
    showChord: state.showChord,
    chordNotes: state.chordNotes,
    darkTheme: state.darkTheme,
    sharps: state.sharps,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
