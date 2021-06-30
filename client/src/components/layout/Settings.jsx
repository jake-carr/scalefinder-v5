import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import RectangularButton from '../controls/RectangularButton'
import TuningDropdown from '../controls/TuningDropdown'
import { getAlteration } from '../../constants/utils'
import { tunings } from '../../constants/tunings'
import RoundButton from '../controls/RoundButton'
import ChordModal from '../controls/ChordModal'
import Metronome from '../controls/Metronome'
import Checkbox from '../controls/Checkbox'
import Dropdown from '../controls/Dropdown'
import Stepper from '../controls/Stepper'

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

function Settings({
  darkTheme,
  rootIndex,
  scaleIndex,
  chordModal,
  highlightRoots,
  labelAllNotes,
  degreeNotation,
  degrees,
  sharps,
  tuning,
  toggle,
  frets,
  set,
}) {
  // todo - local storage (including for tempo on metronome class)

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

  useEffect(() => {
    set('currentScale', createScale(rootIndex, scales[scaleIndex].pattern))
  }, [rootIndex, scaleIndex])

  return (
    <main className={`w-full text-base h-1/4 relative`} style={{ color: theme.text }}>
      <div
        className={`flex flex-row justify-between h-1/2`}
        style={{ backgroundColor: theme.bg0 }}
      >
        <div className="inline-flex flex-row justify-left">
          <RoundButton
            title="Randomize root and scale."
            action={randomize}
            margin={'my-6 ml-2'}
          />
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
          <TuningDropdown />
          <Stepper
            label="Strings"
            value={tuning.length}
            action={changeStringCount}
            min={4}
            max={12}
          />
          <Stepper
            label="Frets"
            value={frets}
            action={changeFretCount}
            min={12}
            max={24}
          />
          {chordModal ? <ChordModal /> : null}
        </div>
        <div className="flex flex-row justify-right py-2 px-2">
          <Checkbox />
          <RoundButton
            title="Toggle between light and dark theme."
            action={() => toggle('darkTheme')}
          />
        </div>
      </div>
      <div
        className={`flex flex-row justify-between h-1/2 content-center items-center`}
        style={{ backgroundColor: theme.bg1 }}
      >
        <div className="flex flex-row justify-left">
          <button
            title="Toggle preferred alteration between sharps and flats."
            onClick={() => toggle('sharps')}
            className="focus:outline-none rounded-full h-8 w-8 flex items-center justify-center my-2 mx-2"
            style={{
              border: `2px solid ${theme.bg0}`,
              backgroundColor: theme.bg2,
              color: theme.text,
            }}
          >
            <span className="text-xl">{sharps ? '♭' : '♯'}</span>
          </button>
          <RectangularButton
            title="Highlight root notes"
            action={() => toggle('highlightRoots')}
            value={highlightRoots}
            condition={'highlightRoots'}
          />
          <RectangularButton
            title={labelAllNotes ? 'Label scale only' : 'Label all notes'}
            action={() => toggle('labelAllNotes')}
            value={labelAllNotes}
          />
          <RectangularButton
            title={degrees ? 'Hide scale degrees' : 'Show scale degrees'}
            action={() => toggle('degrees')}
            value={degrees}
            condition={'degrees'}
          />
          {degrees ? (
            <Dropdown
              options={degreeOptions}
              action={selectDegreeNotation}
              val={degreeNotation}
              name={'Degree Notation'}
            />
          ) : (
            <div>placeholder</div>
          )}
        </div>
        <div className="flex flex-row justify-right">
          <Metronome darkTheme={darkTheme} />
        </div>
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
    chordModal: state.chordModal,
    currentScale: state.currentScale,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
