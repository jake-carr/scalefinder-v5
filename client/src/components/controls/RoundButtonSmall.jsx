import React from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'

export default connect(mapStateToProps, null)(RoundButtonSmall)

function RoundButtonSmall({ title, action, darkTheme, sharps, margin }) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME

  const icons = {
    alteration: sharps ? <span>♭</span> : <span>♯</span>,
    info: <i className="fas fa-info-circle" />,
  }
  const keyword = title.split(' ')[0]
  const mapTitleToIcon = () => {
    switch (keyword) {
      case 'Toggle':
        return icons.alteration
      case 'Information':
        return icons.info
    }
  }
  return (
    <button
      title={title}
      onClick={() => action()}
      className={`rounded-full h-8 w-8 flex items-center justify-center text-${theme.text} bg-${theme.bg2} border-2 border-${theme.bg1} ${margin}`}
    >
      {mapTitleToIcon()}
    </button>
  )
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    darkTheme: state.darkTheme,
  }
}
