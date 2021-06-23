import React from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(Fret)

function Fret({
  note,
  sharps,
  allNotes,
  highlightRoots,
  degrees,
  degreeNotation,
  label,
  currentScale,
  darkTheme,
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

  const colorText = () => {
    return currentScale[0] === note && highlightRoots ? theme.bg0 : theme.text
  }

  // const displayDegree = () => {
  //   let i = currentScale.indexOf(note);
  //   if (i >= 0) {
  //     return getDegree(i, degreeNotation);
  //   }
  // };

  return (
    <div
      className={`w-16 h-12 pt-3 rounded text-center text-${colorText()} bg-${colorFret()} duration-300 mx-1`}
    >
      <span>{indexToString(note, sharps)}</span>
      {/* degree and label logic */}
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
  }
}
