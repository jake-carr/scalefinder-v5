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

  const changeStringCount = (strings) => {
    let update = [...tuning]
    if (strings < tuning.length) update.length = strings
    else if (strings > tuning.length) {
      for (let i = strings - tuning.length - 1; i >= 0; i--) {
        let note = 7 // default note E
        if (i + tuning.length === 4) note = 0 // 5th string, A
        if (i + tuning.length === 6) note = 2 // 7th string, B
        update.push(note)
      }
    }
    set('tuning', update)
  }

  useEffect(() => {
    set('currentScale', createScale(rootIndex, scales[scaleIndex].pattern))
  }, [rootIndex, scaleIndex])

  useEffect(() => {
    // On mount, reset state logic for only allowing one tuner modal to be open at a time, and lock certain mobile settings
    set('tuners', 0)
    set('frets', 12)
    set('strings', 6)
    set('chordNotes', [])
  }, [])

  return (
    <main
      className="w-full text-base h-1/3 relative duration-300 flex flex-col flex-nowrap justify-around pt-4"
      style={{ color: theme.text, backgroundColor: theme.bg1 }}>
      <div className="flex flex-row flex-nowrap justify-center">
        <TuningDropdown />
        <button
          title="Randomize root and scale."
          onClick={() => randomize()}
          className="border-box border-2 border-transparent rounded-full h-9 w-9 flex items-center justify-center ml-2 outline-none focus:outline-none"
          style={{
            backgroundColor: theme.primary0,
            color: theme.text,
          }}>
          <i className="fas fa-dice" />
        </button>
        <Dropdown
          options={noteOptions}
          action={selectNote}
          val={rootIndex}
          name={'Root'}
        />
        <Dropdown
          options={scaleOptions}
          action={selectScale}
          val={scaleIndex}
          name={'Scale'}
        />
        <Stepper
          label="Strings"
          value={tuning.length}
          action={changeStringCount}
          min={4}
          max={7}
        />
      </div>
      <div className="flex flex-row flex-nowrap justify-center">
        <button
          title="Toggle preferred alteration between sharps and flats."
          onClick={() => toggle('sharps')}
          className="outline-none border-box border-2 border-transparent rounded-full h-8 w-8 my-1 mx-1 duration-300 focus:outline-none"
          style={{
            backgroundColor: theme.bg2,
            color: theme.text,
          }}>
          <span className="text-xl self-center">{sharps ? '♭' : '♯'}</span>
        </button>
        <RectangularButton
          title="Highlight root notes"
          action={() => toggle('highlightRoots')}
          value={highlightRoots}
          condition={'highlightRoots'}
          mobile={true}
        />
        <RectangularButton
          title={labelAllNotes ? 'Label scale only' : 'Label all notes'}
          action={() => toggle('labelAllNotes')}
          value={labelAllNotes}
          mobile={true}
        />
        <RectangularButton
          title={degrees ? 'Hide scale degrees' : 'Show scale degrees'}
          action={() => toggle('degrees')}
          value={degrees}
          condition={'degrees'}
          mobile={true}
        />
        {degrees ? (
          <Dropdown
            options={degreeOptions}
            action={selectDegreeNotation}
            val={degreeNotation}
            name={'Degree Notation'}
          />
        ) : null}
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
