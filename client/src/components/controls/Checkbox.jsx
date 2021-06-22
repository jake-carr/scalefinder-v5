import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { saveLocally } from '../constants/storage'

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)

function Checkbox({ rememberSettings, toggle }) {
  const handleToggle = () => {
    toggle('rememberSettings')
  }

  useEffect(() => {
    if (!rememberSettings) saveLocally('saveSettings', false)
  }, [rememberSettings])

  return (
    <div className="checkbox">
      <input
        name="saveSettings"
        type="checkbox"
        checked={on}
        onChange={() => handleToggle()}
      />
      <label
        className="checkbox-label"
        style={{ color: theme.text }}
        htmlFor="saveSettings"
        onClick={() => handleToggle()}
      >
        Remember my settings
      </label>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    rememberSettings: state.rememberSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
  }
}
