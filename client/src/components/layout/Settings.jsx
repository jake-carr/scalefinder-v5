import React, { useState } from 'react'
import { connect } from 'react-redux'
import { scales, createScale, listScales } from '../../constants/scales'
import { getAlteration } from '../../constants/utils'
import RectangularButton from '../controls/RectangularButton'
import RoundButtonSmall from '../controls/RoundButtonSmall'
import RoundButton from '../controls/RoundButton'
import Metronome from '../controls/Metronome'
import Dropdown from '../controls/Dropdown'

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

  return (
    <main>
      {/* <Metronome /> */}
      <div className="settings-upper">
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
        />{' '}
        <RoundButtonSmall
          title="Information about this scale."
          action={() => toggle('infoModal')}
        />
        [Tuning Dropdown ] [Fret and String steppers] (Space){' '}
        <RoundButton
          title="Toggle between light and dark theme."
          action={() => toggle('darkTheme')}
        />
        [Remember] (Right)
      </div>
      <div className="settings-lower">
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
        />{' '}
        (Space) Metronome (Right)
        {rootIndex}
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
