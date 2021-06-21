import React, { useState } from 'react'
import { connect } from 'react-redux'

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function Settings() {
  return (
    <main>
      <div className="settings-upper">
        (Left) Dice - Root - Scale [i button below] - Tuning - Fret and String steppers
        (Space) Theme and Remember (Right)
      </div>
      <div className="settings-lower">
        (Left) Alt - Highlights - Labels - Degrees - Degree Dropdown (Space) Metronome
        (Right)
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    hello: state.hello,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (name) => dispatch({ type: 'TOGGLE', payload: name }),
  }
}
