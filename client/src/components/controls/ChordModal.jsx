import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAlteration, makeChord, indexToString, getChords } from '../../constants/utils'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(ChordModal)

function ChordModal({
  rootIndex,
  scaleIndex,
  showChords,
  chordNotes,
  darkTheme,
  sharps,
  set,
  toggle,
}) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const [chordsInKey, setChordsInKey] = useState({})
  const [selectedChord, selectChord] = useState('')
  const [prev, setPrev] = useState('')

  useEffect(() => {
    // Currently only supports 7 major modes, not all scales
    if (scaleIndex < 7) {
      const chords = getChords(scaleIndex, rootIndex, sharps)
      setChordsInKey(chords)
    } else {
      selectChord('')
      setChordsInKey({})
      set('chordModal', false)
      if (showChords) toggle('showChords')
    }
  }, [scaleIndex, rootIndex, sharps])

  useEffect(() => {
    if (selectedChord) {
      let root = selectedChord.split(' ')[0]
      let type = selectedChord.split(' ')[1]
      if (type === 'Major') type = 'maj'
      else if (type === 'Minor') type = 'min'
      else if (type === 'Augmented') type = 'aug'
      else if (type === 'Diminished') type = 'dim'
      const ROOT_INDEX = getAlteration(sharps).indexOf(root)
      const chord = makeChord(ROOT_INDEX, type, sharps)
      setPrev(selectedChord)
      set('chordNotes', chord)
      if (!showChords) toggle('showChords')
    }
  }, [selectedChord])

  const handleSelectChord = (chord) => {
    if (chord == prev) {
      set('chordNotes', [])
      selectChord('')
      setPrev('')
      if (showChords) toggle('showChords')
    } else {
      selectChord(chord)
    }
  }

  const renderSquares = (fourth = false) => {
    const squares = [1, 2, 3]
    if (fourth) squares.push(4)
    return squares.map((i) => {
      let col
      if (i == 1) col = theme.chord0
      else if (i == 2) col = theme.chord1
      else if (i == 3) col = theme.chord2
      else col = theme.chord3
      return <span className="rounded-sm h-4 w-4 mx-1" style={{ backgroundColor: col }} />
    })
  }

  return (
    <div
      className="absolute top-2 left-1/2 border-2 flex flex-col justify-center text-center h-3/4 px-2"
      style={{ backgroundColor: theme.bg0 }}
    >
      {chordsInKey['basicChords'] && chordsInKey['seventhChords'] ? (
        <>
          <div className="text-lg absolute top-1 self-center">
            <span style={{ color: theme.secondary0 }}>
              {indexToString(rootIndex, sharps)}{' '}
            </span>
            <span style={{ color: theme.primary1 }}>{scales[scaleIndex].name}</span>
          </div>

          <div>
            <span
              className="flex flex-row justify-center items-center"
              style={{ color: theme.chord0 }}
            >
              Basic chords {renderSquares()}
            </span>
            <div>
              {chordsInKey.basicChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => handleSelectChord(chord)}>
                    <span
                      style={{
                        color: chord === selectedChord ? theme.chord1 : theme.text,
                      }}
                    >
                      {chord}
                    </span>
                    {i < 6 ? <span className="mx-1">•</span> : null}
                  </span>
                )
              })}
            </div>
          </div>
          <div>
            <span
              className="flex flex-row justify-center items-center"
              style={{ color: theme.chord3 }}
            >
              Seventh chords {renderSquares('four')}
            </span>
            <div>
              {chordsInKey.seventhChords.map((chord, i) => {
                return (
                  <span key={i} onClick={() => handleSelectChord(chord)}>
                    <span
                      style={{
                        color: chord === selectedChord ? theme.chord2 : theme.text,
                      }}
                    >
                      {chord}
                    </span>
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
    showChords: state.showChords,
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
