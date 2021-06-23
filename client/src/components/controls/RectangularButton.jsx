import React from 'react'
import { connect } from 'react-redux'

export default connect(mapStateToProps, null)(RectangularButton)

function RectangularButton({ title, action, value, condition, darkTheme }) {
  const applyStyles = () => {
    // if (value) {
    //   switch (condition)
    //     // return style objects based on condition setting & darkTheme
    // }
  }

  return (
    <button
      className=""
      title={title}
      onClick={() => action(!value)}
      style={applyStyles()}
    >
      {title}
    </button>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
