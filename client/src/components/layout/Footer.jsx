import React from 'react'
import { connect } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(Footer)

function Footer({ darkTheme }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  return (
    <div
      className={`w-full bg-${theme.bg3} text-${theme.text} flex flex-row justify-center`}
    >
      <a
        className="mx-1"
        rel="noopener noreferrer"
        href="mailto: jake.ralph.carr@gmail.com"
        target="_blank"
      >
        Contact
      </a>
      <span className="mx-1">•</span>
      <a
        className="mx-1"
        rel="noopener noreferrer"
        href="https://apps.apple.com/us/app/guitar-scale-finder/id1487884068"
        target="_blank"
      >
        Download on the App Store (free, no ads)
      </a>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
