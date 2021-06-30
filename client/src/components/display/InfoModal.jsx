import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(InfoModal)

function InfoModal({ darkTheme, scaleIndex }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  // should pop up and fade out; i button to open it should be placed next to scale label
  return <span>{scales[scaleIndex].info}</span>
}

function mapStateToProps(state) {
  return {
    scaleIndex: state.scaleIndex,
    darkTheme: state.darkTheme,
  }
}
