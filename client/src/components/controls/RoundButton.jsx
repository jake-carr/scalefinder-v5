import React from 'react'
import { connect } from 'react-redux'

export default connect(mapStateToProps, null)(RoundButton)

function RoundButton({ title, action, darkTheme }) {
  const icons = {
    random: <i className="fas fa-dice" />,
    reset: <i className="fas fa-redo-alt" />,
    light: <i className="emoji">🌞</i>,
    dark: <i className="emoji">🌚</i>,
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
      className={`rounded-full h-12 w-12 flex items-center justify-center ${
        darkTheme ? 'bg-blue-500' : 'bg-green-500'
      }`}
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
