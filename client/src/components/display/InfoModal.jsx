import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(InfoModal)

function InfoModal({ darkTheme, scaleIndex }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  // should pop up and fade out after some time or close onClick.
  return <span>{scales[scaleIndex].info}</span>
}

function mapStateToProps(state) {
  return {
    scaleIndex: state.scaleIndex,
    darkTheme: state.darkTheme,
  }
}
