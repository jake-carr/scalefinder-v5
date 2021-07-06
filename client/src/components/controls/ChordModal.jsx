import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAlteration, makeChord, indexToString, getChords } from '../../constants/utils'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(ChordModal)

function ChordModal({
  rootIndex,
  scaleIndex,
  chordModal,
  showChords,
  chordNotes,
  darkTheme,
  sharps,
  toggle,
  set,
}) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const [chordsInKey, setChordsInKey] = useState({})
  const [selectedChord, selectChord] = useState('')
  const [prev, setPrev] = useState('')

  useEffect(() => {
    // Currently only supports 7 major modes, not all scales
    if (scaleIndex < 7 && rootIndex && sharps) {
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
    // Persists highlighted chord selection between sessions when rememberSettings is enabled.
    if (chordNotes.length && showChords) {
      const chords = getChords(scaleIndex, rootIndex, sharps)
      let options = chords.basicChords
      if (chordNotes.length == 4) options = chords.seventhChords
      for (let chord of options) {
        let root = chord.split(' ')[0]
        let type = chord.split(' ')[1]
        if (type === 'Major') type = 'maj'
        else if (type === 'Minor') type = 'min'
        else if (type === 'Augmented') type = 'aug'
        else if (type === 'Diminished') type = 'dim'
        const ROOT_INDEX = getAlteration(sharps).indexOf(root)
        const comparison = makeChord(ROOT_INDEX, type, sharps)
        let match = true
        for (let i = 0; i < chordNotes.length; i++) {
          if (chordNotes[i] !== comparison[i]) match = false
        }
        if (match) handleSelectChord(chord)
      }
    }
  }, [])

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

  const circles = () => {
    const colors = [theme.chord0, theme.chord1, theme.chord2, theme.chord3]
    return colors.map((color, i) => {
      return (
        <span
          key={i}
          className="rounded-full h-5 w-5 flex items-center justify-center mx-1 text-sm text-center duration-300"
          style={{
            color: color.text,
            backgroundColor: color,
            opacity: i < 3 || chordNotes.length === 4 ? 1 : 0,
          }}
        >
          {i + 1}
        </span>
      )
    })
  }

  return (
    <>
      <div
        className="p-1 h-full w-full transition duration-300 flex flex-col text-left lg:text-center justify-left lg:justify-center items-center"
        style={{ backgroundColor: theme.bg0, opacity: chordModal ? 1 : 0 }}
      >
        <span className="text-xs mx-1" style={{ color: theme.bg3 }}>
          Click a chord name to highlight its intervals on the fretboard.
        </span>
        {chordsInKey['basicChords'] && chordsInKey['seventhChords'] ? (
          <>
            <div className="text-sm">
              <span
                className="flex flex-row flex-nowrap items-center"
                style={{ color: theme.chord0 }}
              >
                <span className="mx-1">Basic chords •</span>
                <span>
                  {chordsInKey.basicChords.map((chord, i) => {
                    return (
                      <button
                        key={i}
                        className="focus:outline-none"
                        onClick={() => handleSelectChord(chord)}
                      >
                        <span
                          style={{
                            color: chord === selectedChord ? theme.chord1 : theme.text,
                          }}
                        >
                          {chord}
                        </span>
                        {i < 6 ? <span className="mx-1">•</span> : null}
                      </button>
                    )
                  })}
                </span>
              </span>
            </div>
            <div className="text-sm">
              <span
                className="flex flex-row justify-left items-center"
                style={{ color: theme.chord3 }}
              >
                <span className="mx-1">Seventh chords •</span>
                <span>
                  {chordsInKey.seventhChords.map((chord, i) => {
                    return (
                      <button
                        key={i}
                        className="focus:outline-none"
                        onClick={() => handleSelectChord(chord)}
                      >
                        <span
                          style={{
                            color: chord === selectedChord ? theme.chord2 : theme.text,
                          }}
                        >
                          {chord}
                        </span>
                        {i < 6 ? <span className="mx-1">•</span> : null}
                      </button>
                    )
                  })}
                </span>
              </span>
            </div>
            <div className="flex flex-row mt-1">{circles()}</div>
          </>
        ) : null}
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    chordModal: state.chordModal,
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
