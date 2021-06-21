import React, { useState, useContext } from 'react'
import GuitarString from '../display/GuitarString.jsx'
import { connect } from 'react-redux'

export default connect(mapStateToProps, null)(Fretboard)

function Fretboard({ tuning }) {
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

  return <div className="fretboard">{renderGuitarStrings()}</div>
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
  }
}
