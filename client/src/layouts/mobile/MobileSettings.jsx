import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import RectangularButton from '../../components/controls/RectangularButton'
import TuningDropdown from '../../components/controls/TuningDropdown'
// import ChordModal from '../../components/controls/ChordModal'
// import Metronome from '../../components/controls/Metronome'
// import Checkbox from '../../components/controls/Checkbox'
import Dropdown from '../../components/controls/Dropdown'
import Stepper from '../../components/controls/Stepper'
import { scales, createScale, listScales } from '../../constants/scales'
// import { saveInLocalStorage } from '../../constants/storage'
import { getAlteration } from '../../constants/utils'
import { ThemeContext } from '../../components/App'
import { tunings } from '../../constants/tunings'

export default connect(mapStateToProps, mapDispatchToProps)(MobileSettings)

function MobileSettings({
  darkTheme,
  currentScale,
  rootIndex,
  scaleIndex,
  tuning,
  highlightRoots,
  labelAllNotes,
  degreeNotation,
  degrees,
  sharps,
  toggle,
  set,
}) {
  const theme = useContext(ThemeContext)
  const noteOptions = getAlteration(sharps)
  const scaleOptions = listScales()
  const degreeOptions = ['Numeric', 'Roman numeral', 'Indian swaras']

  const randomize = () => {
    set('rootIndex', Math.floor(Math.random() * 12))
    set('scaleIndex', Math.floor(Math.random() * scales.length))
  }

  const selectNote = (i) => {
    set('rootIndex', Number(i))
  }

  const selectScale = (i) => {
    set('scaleIndex', Number(i))
  }

  const selectDegreeNotation = (notation) => {
    set('degreeNotation', notation)
  }

  const changeFretCount = (n) => {
    set('frets', n)
  }

  useEffect(() => {
    set('currentScale', createScale(rootIndex, scales[scaleIndex].pattern))
  }, [rootIndex, scaleIndex])

  useEffect(() => {
    // On mount, reset state logic for only allowing one tuner modal to be open at a time
    set('tuners', 0)
  }, [])

  return (
    <main
      className="w-full text-base h-1/4 relative duration-300 flex flex-row flex-nowrap justify-center"
      style={{ color: theme.text, backgroundColor: theme.bg1 }}>
      <div className="border-box border-2 border-red-400 w-3/4 h-full">
        settings
      </div>
      <div className="border-box border-2 border-green-400 w-1/4 h-full">
        chords
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
    currentScale: state.currentScale,
    rootIndex: state.rootIndex,
    scaleIndex: state.scaleIndex,
    tuning: state.tuning,
    highlightRoots: state.highlightRoots,
    labelAllNotes: state.labelAllNotes,
    degreeNotation: state.degreeNotation,
    degrees: state.degrees,
    sharps: state.sharps,
    toggle: state.toggle,
    set: state.set,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
