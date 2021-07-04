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
    <span className="absolute top-1 left-2 w-60 flex flex-row text-center transition duration-300">
      <input
        name="rememberSettings"
        className="float-right self-center"
        type="checkbox"
        checked={rememberSettings}
        onChange={() => handleToggle()}
        style={{
          display: 'inline-flex',
          cursor: 'pointer',
          position: 'relative',
          alignItems: 'center',
          // color todo
        }}
      />
      <label
        className="mx-1 text-sm cursor-pointer"
        htmlFor="rememberSettings"
        onClick={() => handleToggle()}
      >
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
