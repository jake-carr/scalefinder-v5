import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from '../../components/App'
import GuitarString from '../../components/display/GuitarString.jsx'
import MobileFooter from './MobileFooter'

export default connect(mapStateToProps, null)(MobileFretboard)

function MobileFretboard({ tuning, darkTheme }) {
  const theme = useContext(ThemeContext)

  const renderGuitarStrings = () => {
    return tuning.map((note, i) => {
      return (
        <GuitarString
          stringIndex={i} // index within tuning
          key={i}
          mobile={true}
        />
      )
    })
  }

  return (
    <div
      className="h-2/3 flex flex-col justify-between"
      style={{ backgroundColor: theme.bg2 }}>
      <div />
      <div className="flex flex-col justify-center align-center self-center">
        {renderGuitarStrings()}
      </div>
      <MobileFooter />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tuning: state.tuning,
    darkTheme: state.darkTheme,
  }
}
