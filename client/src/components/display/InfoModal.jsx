// Displays information about the scale and chords in key (for at least 7 main modes)
// Clicking on a chord will add a border to all notes on the fretboard that make up that chord; user can figure out all inversions/shapes from experimenting with them.
// State will need 2 additional fields; 'showChord' and 'notesInChord' (from makeChord function)
// Only one chord can be selected at a time. The chord selection and borders should persist even if the info modal is closed.

import React from 'react'
import { connect } from 'react-redux'

export default connect(mapStateToProps, mapDispatchToProps)(InfoModal)

function InfoModal({
  rootIndex,
  scaleIndex,
  showChord,
  notesInChord,
  darkTheme,
  sharps,
  set,
  toggle,
}) {
  return <div>this is the info modal</div>
}

function mapStateToProps(state) {
  return {
    showChord: state.showChord,
    notesInChord: state.notesInChord,
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
