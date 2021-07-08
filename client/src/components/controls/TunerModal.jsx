import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { indexToString, getAlteration } from '../../constants/utils'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(TunerModal)

function TunerModal({ darkTheme, sharps, tuning, stringIndex, set, tuners }) {
  const [isOpen, toggle] = useState(false)
  const [tunerID, setID] = useState(0)

  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const open = () => {
    const id = tuners + 1
    setID(id)
    set('tuners', id)
    toggle(true)
  }
  const close = () => {
    toggle(false)
  }

  // Only one tuner modal can be open at a time (tuner IDs & state reset on every page load)
  useEffect(() => {
    if (isOpen && tuners != tunerID) close()
  }, [tuners])

  const handleSelect = (note) => {
    let update = [...tuning]
    update[stringIndex] = note
    set('tuning', update)
    toggle(false)
  }

  const renderNoteOptions = (notes) => {
    return notes.map((note, i) => (
      <div
        key={i}
        onClick={() => handleSelect(i)}
        className="box text-xs"
        style={{
          backgroundColor:
            tuning[stringIndex] == i ? theme.tuning1 : theme.tuning0,
          color: theme.text,
        }}
      >
        {indexToString(i, sharps)}
      </div>
    ))
  }

  return (
    <>
      <div className="note-picker">
        <div className="outer" onClick={() => open()}>
          <div
            className="trigger focus:outline-none border-box border-2 border-transparent rounded-full h-6 w-6 my-1 mx-1 text-sm font-bold text-center"
            style={{ backgroundColor: theme.tuning0, color: theme.text }}
          >
            {indexToString(tuning[stringIndex], sharps)}
          </div>
        </div>
      </div>
      <div
        onClick={() => close()}
        className={`rounded-lg dimmer ${isOpen && 'active'}`}
      ></div>
      <div className={`expanded-container ${isOpen && 'active'}`}>
        <div
          className="boxes border-box rounded-sm"
          style={{
            backgroundColor: theme.bg1,
            border: `2px solid ${theme.tuning1}`,
          }}
        >
          {renderNoteOptions(getAlteration(sharps))}
        </div>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
    tuning: state.tuning,
    sharps: state.sharps,
    tuners: state.tuners,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
