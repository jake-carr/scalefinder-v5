import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { scales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(InfoModal)

function InfoModal({ darkTheme, scaleIndex, infoModal }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  return (
    <span
      className="absolute bottom-1 left-2 w-auto flex flex-row flex-nowrap transition duration-300"
      style={{ color: theme.secondary0, opacity: infoModal ? 1 : 0 }}
    >
      {scales[scaleIndex].info}
    </span>
  )
}

function mapStateToProps(state) {
  return {
    scaleIndex: state.scaleIndex,
    darkTheme: state.darkTheme,
    infoModal: state.infoModal,
  }
}
