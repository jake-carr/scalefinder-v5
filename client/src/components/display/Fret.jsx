import React from 'react'
import { connect } from 'react-redux'
import { indexToString, getDegree } from '../../constants/utils'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(Fret)

function Fret({
  note,
  sharps,
  labelAllNotes,
  highlightRoots,
  degrees,
  degreeNotation,
  label,
  currentScale,
  darkTheme,
  showChords,
  chordNotes,
}) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

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
      return `2px solid ${theme.chord}`
    } else {
      return '2px solid transparent'
    }
  }

  const colorText = () => {
    return currentScale[0] === note && highlightRoots ? theme.bg0 : theme.text
  }

  const showOrHideDegree = () => {
    const degree = getDegree(currentScale.indexOf(note), degreeNotation)
    return degree ? degree : ''
  }

  return (
    <div
      className={`w-16 h-12 duration-300 rounded mx-1 border-box transition duration-300`}
      style={{ backgroundColor: colorFret(), border: colorBorder() }}
    >
      <div
        className={`relative absolute top-0 left-1 h-0 text-sm`}
        style={{ color: theme.tertiary1, opacity: degrees ? 1 : 0 }}
      >
        {showOrHideDegree()}
      </div>
      <div
        className={`pt-2 text-center text-lg`}
        style={{
          color: colorText(),
          opacity: currentScale.includes(note) || labelAllNotes ? 1 : 0,
        }}
      >
        {indexToString(note, sharps)}
      </div>
      {/* label bottom frets */}
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
    darkTheme: state.darkTheme,
    showChords: state.showChords,
    chordNotes: state.chordNotes,
  }
}
