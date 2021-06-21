import React, { useState } from 'react'
import { connect } from 'react-redux'
import { listScales } from '../constants/scales'
import { indexToString } from '../constants/utils'

export default connect(mapStateToProps, mapDispatchToProps)(App)

function App({ sharps, rootIndex, scaleIndex, toggle }) {
  const scaleNames = listScales()
  return (
    <div className="text-3xl mx-100 text-pink-200 font-bold">
      {indexToString(rootIndex, sharps)}
      {scaleNames[scaleIndex]}
      <button onClick={() => toggle('sharps')}>click</button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    rootIndex: state.rootIndex,
    scaleIndex: state.scaleIndex,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (name) => dispatch({ type: 'TOGGLE', payload: name }),
  }
}
