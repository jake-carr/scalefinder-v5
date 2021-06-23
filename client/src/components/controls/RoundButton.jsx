import React from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(RoundButton)

function RoundButton({ title, action, darkTheme, margin }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const icons = {
    random: <i className="fas fa-dice" />,
    reset: <i className="fas fa-redo-alt" />,
    light: <i className="not-italic text-5xl">🌞</i>,
    dark: <i className="not-italic text-5xl">🌚</i>,
  }
  const keyword = title.split(' ')[0]
  const mapTitleToIcon = () => {
    switch (keyword) {
      case 'Randomize':
        return icons.random
      case 'Reset':
        return icons.reset
      case 'Toggle':
        return darkTheme ? icons.light : icons.dark
    }
  }
  return (
    <button
      title={title}
      onClick={() => action()}
      className={`rounded-full h-9 w-9 flex items-center justify-center text-${theme.text} bg-${theme.primary0} border-1 border-${theme.primary0} ${margin}`}
    >
      {mapTitleToIcon()}
    </button>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
