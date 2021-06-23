import React from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import RectangularButton from '../controls/RectangularButton'
import RoundButtonSmall from '../controls/RoundButtonSmall'
import TuningDropdown from '../controls/TuningDropdown'
import { getAlteration } from '../../constants/utils'
import RoundButton from '../controls/RoundButton'
import { tunings } from '../../constants/tunings'
import Metronome from '../controls/Metronome'
import Checkbox from '../controls/Checkbox'
import Dropdown from '../controls/Dropdown'
import Stepper from '../controls/Stepper'

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function Settings({
  darkTheme,
  rootIndex,
  scaleIndex,
  sharps,
  highlightRoots,
  labelAllNotes,
  degrees,
  degreeNotation,
  tuning,
  frets,
  set,
  toggle,
}) {
  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const noteOptions = getAlteration(sharps)
  const scaleOptions = listScales()
  const degreeOptions = ['Numeric', 'Roman numeral', 'Indian sargams']

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
        if (i + tuning.length === 7) note = 9 // 8th string, F#
        update.push(note)
      }
    }
    set('tuning', update)
  }

  return (
    <main className={`w-full text-${theme.text}`}>
      <div className={`flex flex-row bg-${theme.bg0}`}>
        <RoundButton title="Randomize root and scale." action={randomize} />
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
        <RoundButtonSmall
          title="Information about this scale."
          action={() => toggle('infoModal')}
        />
        <TuningDropdown />
        <Stepper
          label="Strings"
          value={tuning.length}
          action={changeStringCount}
          min={4}
          max={12}
        />
        <Stepper label="Frets" value={frets} action={changeFretCount} min={12} max={24} />
        <RoundButton
          title="Toggle between light and dark theme."
          action={() => toggle('darkTheme')}
        />
        <Checkbox />
      </div>
      <div className={`flex flex-row bg-${theme.bg1}`}>
        <RoundButtonSmall
          title="Toggle preferred alteration between sharps and flats."
          action={() => toggle('sharps')}
        />
        <RectangularButton
          title="Highlight root notes"
          action={() => toggle('highlightRoots')}
          value={highlightRoots}
          condition={'highlightRoots'}
        />{' '}
        <RectangularButton
          title={labelAllNotes ? 'Label scale only' : 'Label all notes'}
          action={() => toggle('labelAllNotes')}
          value={labelAllNotes}
        />{' '}
        <RectangularButton
          title={degrees ? 'Hide scale degrees' : 'Show scale degrees'}
          action={() => toggle('degrees')}
          value={degrees}
          condition={'degrees'}
        />
        <Dropdown
          options={degreeOptions}
          action={selectDegreeNotation}
          val={degreeNotation}
          name={'Degree Notation'}
        />
        <Metronome />
      </div>
    </main>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
    rootIndex: state.rootIndex,
    scaleIndex: state.scaleIndex,
    sharps: state.sharps,
    highlightRoots: state.highlightRoots,
    labelAllNotes: state.labelAllNotes,
    degrees: state.degrees,
    degreeNotation: state.degreeNotation,
    tuning: state.tuning,
    frets: state.frets,
    infoModal: state.infoModal,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
