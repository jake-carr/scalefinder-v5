import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { indexToString, getDegree } from '../../constants/utils'
import { ThemeContext } from '../App'

export default connect(mapStateToProps, null)(Fret)

function Fret({
  highlightRoots,
  degreeNotation,
  labelAllNotes,
  currentScale,
  showChords,
  chordNotes,
  degrees,
  strings,
  sharps,
  label,
  frets,
  note,
}) {
  const theme = useContext(ThemeContext)

  const colorFret = () => {
    if (currentScale[0] === note && highlightRoots) {
      return theme.secondary0
    } else if (currentScale.includes(note)) {
      return theme.primary0
    } else {
      return theme.bg3
    }
  }

  const colorBorder = () => {
    if (showChords && chordNotes.includes(note)) {
      const i = chordNotes.indexOf(note) // 0-3
      if (i == 0) return `2px solid ${theme.chord0}`
      else if (i == 1) return `2px solid ${theme.chord1}`
      else if (i == 2) return `2px solid ${theme.chord2}`
      else return `2px solid ${theme.chord3}`
    } else {
      return '2px solid transparent'
    }
  }

  const colorText = () => {
    return currentScale[0] === note && highlightRoots ? theme.bg0 : theme.text
  }

  const setFretWidth = () => {
    if (frets == 24) return '3rem'
    else if (frets >= 22) return '3.1rem'
    else if (frets >= 20) return '3.2rem'
    else if (frets >= 18) return '3.3rem'
    else if (frets >= 16) return '3.5rem'
    else if (frets >= 14) return '3.75rem'
    else return '4rem'
  }

  const setLabelDistance = () => {
    if (strings >= 7) return '11'
    else if (strings >= 5) return '12'
    else return '14'
  }

  const showOrHideDegree = () => {
    const degree = getDegree(currentScale.indexOf(note), degreeNotation)
    return degree ? degree : ''
  }

  return (
    <div
      className="h-full rounded mx-1 duration-300 border-box flex items-center justify-center relative"
      style={{
        backgroundColor: colorFret(),
        border: colorBorder(),
        width: setFretWidth(),
      }}>
      <div
        className="absolute top-0 left-1 text-xs duration-300 "
        style={{ color: theme.tertiary1, opacity: degrees ? 1 : 0 }}>
        <span>{showOrHideDegree()}</span>
      </div>
      <div
        className="self-center align-center text-center text-sm duration-300"
        style={{
          fontWeight: 'bold',
          color: colorText(),
          opacity: currentScale.includes(note) || labelAllNotes ? 1 : 0,
        }}>
        {indexToString(note, sharps)}
      </div>
      {label ? (
        <div
          className={`absolute top-${setLabelDistance()} self-center text-base`}
          style={{ color: theme.text }}>
          {String(label)}
        </div>
      ) : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    labelAllNotes: state.labelAllNotes,
    highlightRoots: state.highlightRoots,
    degrees: state.degrees,
    degreeNotation: state.degreeNotation,
    currentScale: state.currentScale,
    showChords: state.showChords,
    chordNotes: state.chordNotes,
    frets: state.frets,
  }
}
