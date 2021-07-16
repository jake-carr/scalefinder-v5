import React from 'react'
import { connect } from 'react-redux'
import { parseNote } from '../../constants/utils'
import Tuner from '../controls/Tuner'
import Fret from './Fret'

export default connect(mapStateToProps, null)(GuitarString)

function GuitarString({ stringIndex, frets, tuning, mobile }) {
  const renderFrets = () => {
    const root = tuning[stringIndex]
    const fretLabels = [1, 3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
    return [...Array(frets).keys()].map((fret, i) => {
      const fretNumber = i + 1
      let note = parseNote(root + fretNumber)
      let label = null
      if (
        fretLabels.includes(fretNumber) &&
        stringIndex === tuning.length - 1
      ) {
        label = fretNumber
      }
      return (
        <Fret
          key={i}
          note={note}
          label={label}
          strings={tuning.length}
          mobile={mobile}
        />
      )
    })
  }

  const setStringHeight = () => {
    const strings = tuning.length
    if (mobile) {
      if (strings >= 5) return 'h-6'
      else return 'h-8'
    } else {
      if (strings >= 7) return 'h-11'
      else if (strings >= 5) return 'h-12'
      else return 'h-14'
    }
  }

  return (
    <div
      className={`${setStringHeight()} w-full flex flex-row justify-center my-1 duration-300`}>
      <Tuner stringIndex={stringIndex} mobile={mobile} />
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
