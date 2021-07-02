import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { saveInLocalStorage } from '../../constants/storage'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)

function Checkbox({ rememberSettings, toggle, darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const handleToggle = () => {
    toggle('rememberSettings')
  }

  useEffect(() => {
    const save = rememberSettings ? true : false
    saveInLocalStorage('rememberSettings', save)
  }, [rememberSettings])

  return (
    <span className="absolute bottom-1 right-2 w-80 flex flex-row-reverse transition duration-300">
      <input
        name="rememberSettings"
        className="float-right self-center"
        type="checkbox"
        checked={rememberSettings}
        onChange={() => handleToggle()}
        // style={/*todo*/}
      />
      <label className="mx-2" htmlFor="rememberSettings" onClick={() => handleToggle()}>
        Remember my settings
      </label>
    </span>
  )
}

function mapStateToProps(state) {
  return {
    rememberSettings: state.rememberSettings,
    darkTheme: state.darkTheme,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
  }
}
