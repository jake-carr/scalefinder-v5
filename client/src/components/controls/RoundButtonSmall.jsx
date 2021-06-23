import React from 'react'
import { connect } from 'react-redux'

export default connect(mapStateToProps, null)(RoundButtonSmall)

function RoundButtonSmall({ title, action, darkTheme, sharps }) {
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
      className={`rounded-full h-8 w-8 flex items-center justify-center ${
        darkTheme ? 'bg-blue-500' : 'bg-green-500'
      }`}
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
