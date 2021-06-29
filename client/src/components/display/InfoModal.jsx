import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAlteration, makeChord, indexToString, getChords } from '../../constants/utils'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

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
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  // Displays information about the scale and chords in key (for at least 7 main modes)
  // Clicking on a chord will add a border to all notes on the fretboard that make up that chord; user can figure out all inversions/shapes from experimenting with them.
  // State will need 2 additional fields; 'showChord' and 'chordNotes' (from makeChord function)
  // Only one chord can be selected at a time. The chord selection and borders should persist even if the info modal is closed.
  // render chords in key based on rootIndex, scaleIndex with function from old version.
  const [chordsInKey, setChordsInKey] = useState({})
  const [selectedChord, selectChord] = useState(null)

  useEffect(() => {
    if (scaleIndex < 7) {
      const chords = getChords(scaleIndex, rootIndex, sharps)
      setChordsInKey(chords)
    }
  }, [scaleIndex, rootIndex, sharps])

  useEffect(() => {
    // derive type from selectedChord
    // const type = ''
    // const chord = makeChord(rootIndex, type, sharps)
    // set('chordNotes', chord)
  }, [selectedChord])

  // when any are clicked on, toggle showChord on and selectedChord to that, or off if clicking the already selectedChord. text should change to match.
  // when selected chord changes, recalculate chordNotes and update state accordingly with makechord function.
  // Frets will need to be updated to connect to showChord & chordNotes

  // todo: change this to chordModal and only offer it for the seven major modes. offer infoModal as a smaller, text-based popup that fades out.
  return (
    <div
      className="absolute top-1/8 left-1/2 border-2 flex flex-col justify-center text-center h-3/4 px-2"
      style={{ backgroundColor: theme.bg0 }}
    >
      {chordsInKey['basicChords'] && chordsInKey['seventhChords'] ? (
        <>
          <div className="text-lg absolute top-1 self-center">
            <span style={{ color: theme.text }}>Chords in </span>
            <span style={{ color: theme.secondary0 }}>
              {indexToString(rootIndex, sharps)}{' '}
            </span>
            <span style={{ color: theme.primary1 }}>{scales[scaleIndex].name}</span>
          </div>

          <div>
            <span style={{ color: theme.tertiary0 }}>Basic chords</span>
            <div>
              {chordsInKey.basicChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => alert('selected')}>
                    {chord}
                    {i < 6 ? <span className="mx-1">•</span> : null}
                  </span>
                )
              })}
            </div>
          </div>
          <div>
            <span style={{ color: theme.tertiary1 }}>Seventh chords</span>
            <div>
              {chordsInKey.seventhChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => alert('selected')}>
                    {chord}
                    {i < 6 ? <span className="mx-1">•</span> : null}
                  </span>
                )
              })}
            </div>
          </div>
        </>
      ) : null}
      <div className="text-sm absolute bottom-1 self-center">
        Click a chord name to highlight its intervals on the fretboard.
      </div>
    </div>
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
