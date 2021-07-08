import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import RectangularButton from '../controls/RectangularButton'
import { saveInLocalStorage } from '../../constants/storage'
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
  rememberSettings,
  currentScale,
  tempo,
  rootIndex,
  scaleIndex,
  tuning,
  highlightRoots,
  labelAllNotes,
  degreeNotation,
  degrees,
  frets,
  sharps,
  toggle,
  set,
  chordModal,
  showChords,
  chordNotes,
  hz,
}) {
  const settings = {
    darkTheme,
    rememberSettings,
    tempo,
    hz,
    rootIndex,
    scaleIndex,
    currentScale,
    tuning,
    highlightRoots,
    labelAllNotes,
    degreeNotation,
    degrees,
    frets,
    sharps,
    chordModal,
    showChords,
    chordNotes,
  }
  // Local Storage
  useEffect(() => {
    if (rememberSettings) {
      for (let key in settings) {
        if (key != 'rememberSettings')
          saveInLocalStorage(`${key}`, settings[key])
      }
    }
  }, [settings])

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

  // Update page (overscroll) background color on theme change
  useEffect(() => {
    if (theme) document.body.style.backgroundColor = theme.primary0
  }, [theme])

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
      style={{ color: theme.text, backgroundColor: theme.bg1 }}
    >
      <div className="h-full w-1/6 flex flex-col justify-between">
        <RoundButton
          title="Toggle between light and dark theme."
          action={() => toggle('darkTheme')}
          margin={'mx-2 my-2'}
        />
        <div>
          <Metronome
            darkTheme={darkTheme}
            tempoSetting={tempo}
            hzSetting={hz}
            set={set}
          />
        </div>
        <Checkbox />
      </div>
      <div className="h-full w-3/6 flex flex-col justify-around">
        <div className="pt-4 flex flex-row flex-nowrap justify-center">
          <TuningDropdown />
          <RoundButton
            title="Randomize root and scale."
            action={randomize}
            margin={'ml-2'}
          />
          <Dropdown
            options={noteOptions}
            action={selectNote}
            val={rootIndex}
            name={'Root'}
          />
          <span className="flex flex-row flex-nowrap relative">
            <Dropdown
              options={scaleOptions}
              action={selectScale}
              val={scaleIndex}
              name={'Scale'}
            />
            {scaleIndex < 7 ? (
              <button
                className="w-16 h-full mx-1 text-sm text-center rounded focus:outline-none duration-300 opacity-1 border-box border-2 border-transparent"
                style={
                  chordModal
                    ? {
                        backgroundColor: theme.chord0,
                      }
                    : { backgroundColor: theme.bg2 }
                }
                title="Chords"
                onClick={() => toggle('chordModal')}
              >
                Chords
              </button>
            ) : (
              <button
                className="w-16 h-full mx-1 text-sm text-center rounded focus:outline-none duration-300 cursor-default"
                style={{ opacity: 0, backgroundColor: theme.bg2 }}
                onClick={() => {
                  return null
                }}
              />
            )}
          </span>
        </div>
        <div className="flex flex-row flex-nowrap justify-center">
          <button
            title="Toggle preferred alteration between sharps and flats."
            onClick={() => toggle('sharps')}
            className="focus:outline-none border-box border-2 border-transparent rounded-full h-8 w-8 my-1 mx-1 duration-300"
            style={{
              backgroundColor: theme.bg2,
              color: theme.text,
            }}
          >
            <span className="text-xl self-center">{sharps ? '♭' : '♯'}</span>
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
          ) : null}
        </div>
        <div className="pt-2 flex flex-row flex-nowrap justify-center">
          <Stepper
            label="Strings"
            value={tuning.length}
            action={changeStringCount}
            min={4}
            max={8}
          />
          <Stepper
            label="Frets"
            value={frets}
            action={changeFretCount}
            min={12}
            max={24}
          />
        </div>
      </div>
      <div className="h-full w-2/6">
        <ChordModal />
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
    rememberSettings: state.rememberSettings,
    chordModal: state.chordModal,
    showChords: state.showChords,
    chordNotes: state.chordNotes,
    tempo: state.tempo,
    hz: state.hz,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
