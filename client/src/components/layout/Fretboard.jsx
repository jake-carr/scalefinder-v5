import React from 'react'
import { connect } from 'react-redux'
import GuitarString from '../display/GuitarString.jsx'
import { DARK_THEME, LIGHT_THEME } from '../../constants/themes'
import Footer from './Footer'

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
    <div
      className="h-3/4 flex flex-col justify-between"
      style={{ backgroundColor: theme.bg2 }}
    >
      <div />
      <div className="flex flex-col justify-center align-center self-center">
        {renderGuitarStrings()}
      </div>
      <Footer />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
    darkTheme: state.darkTheme,
  }
}
