import React from 'react'
import { connect } from 'react-redux'
import GuitarString from '../display/GuitarString.jsx'
import { DARK_THEME, LIGHT_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(Fretboard)

function Fretboard({ tuning, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const renderGuitarStrings = () => {
    return tuning.map((note, i) => {
      return (
        <GuitarString
          stringIndex={i} // index within tuning
          key={i}
        />
      )
    })
  }

  return (
    <div className="h-full flex flex-col p-2" style={{ backgroundColor: theme.bg2 }}>
      {renderGuitarStrings()}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
    darkTheme: state.darkTheme,
  }
}
