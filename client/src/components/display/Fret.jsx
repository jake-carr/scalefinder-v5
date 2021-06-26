import React from 'react'
import { connect } from 'react-redux'
import { indexToString, getDegree } from '../../constants/utils'
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

  return (
    <div className={`w-16 h-12 duration-300 rounded mx-1`} style={{backgroundColor: colorFret()}}>
      <div
        className={`relative absolute top-0 left-1 h-0 text-sm`}
        style={{color: theme.tertiary1}}
      >
        {getDegree(currentScale.indexOf(note), degreeNotation)}
      </div>
      <div className={`pt-3 text-center text-base`} style={{color: colorText()}}>
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
  }
}
