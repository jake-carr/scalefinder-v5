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
    <span
      className="ml-1 mt-2 w-50 flex flex-row flex-nowrap justify-left duration-300"
      style={{ opacity: rememberSettings ? 1 : 0.5 }}
    >
      <input
        name="rememberSettings"
        type="checkbox"
        className="rounded-lg"
        checked={rememberSettings}
        onChange={() => handleToggle()}
        style={{
          border: `2px solid ${
            rememberSettings ? theme.secondary0 : theme.primary0
          }`,
          backgroundColor: rememberSettings ? theme.secondary1 : theme.primary1,
        }}
      />
      <label
        className="mx-1 text-xs cursor-pointer duration-300"
        style={{ color: theme.text }}
        htmlFor="rememberSettings"
        onClick={() => handleToggle()}
      >
        remember my settings
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
