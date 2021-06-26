import React from 'react'
import Fret from './Fret'
import { connect } from 'react-redux'
import { parseNote } from '../../constants/utils'
import Tuner from '../controls/Tuner'

export default connect(mapStateToProps, null)(GuitarString)

function GuitarString({ stringIndex, frets, tuning }) {
  const renderFrets = () => {
    const root = tuning[stringIndex]
    const fretLabels = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
    return [...Array(frets).keys()].map((fret, i) => {
      const fretNumber = i + 1
      let note = parseNote(root + fretNumber)
      let label = null
      if (fretLabels.includes(fretNumber) && stringIndex === tuning.length - 1) {
        label = fretNumber
      }
      return <Fret key={i} note={note} label={label} />
    })
  }

  return (
    <div className="w-full flex flex-row justify-center my-1">
      <Tuner stringIndex={stringIndex} />
      {renderFrets()}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    frets: state.frets,
    tuning: state.tuning,
  }
}
