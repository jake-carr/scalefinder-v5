import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAlteration, makeChord, indexToString, getChords } from '../../constants/utils'
import { scales } from '../../constants/scales'

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
  const [chordsInKey, setChordsInKey] = useState({})
  const [selectedChord, selectChord] = useState(null)

  useEffect(() => {
    console.log(chordsInKey)
  }, [chordsInKey])

  useEffect(() => {
    console.log('calling', scaleIndex)
    const chords = getChords(scaleIndex, rootIndex, sharps)
    console.log(chords)
    setChordsInKey(chords)
  }, [scaleIndex, rootIndex, sharps])

  useEffect(() => {
    // makeChord
    // set('chordNotes', makeChord result)
  }, [selectedChord])

  // when any are clicked on, toggle showChord on and selectedChord to that, or off if clicking the already selectedChord. text should change to match.
  // when selected chord changes, recalculate chordNotes and update state accordingly with makechord function.
  // Frets will need to be updated to connect to showChord & chordNotes

  return (
    <>
      {chordsInKey['basicChords'] && chordsInKey['seventhChords'] ? (
        <div>
          <div>
            <span>{`Basic chords in key of ${indexToString(rootIndex, sharps)}:`}</span>
            <span>
              {chordsInKey.basicChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => alert('selected')}>
                    {chord}
                    <span className="mx-1">•</span>
                  </span>
                )
              })}
            </span>
          </div>
          <div>
            <span>{`Seventh chords in key of ${indexToString(rootIndex, sharps)}:`}</span>
            <span>
              {chordsInKey.seventhChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => alert('selected')}>
                    {chord}
                    <span className="mx-1">•</span>
                  </span>
                )
              })}
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

function mapStateToProps(state) {
  return {
    showChord: state.showChord,
    rootIndex: state.rootIndex,
    scaleIndex: state.scaleIndex,
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
