import React from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'

export default connect(mapStateToProps, null)(Fret)

function Fret({
  note,
  sharps,
  allNotes,
  highlight,
  degrees,
  degreeNotation,
  label,
  currentScale,
}) {
  const colorizeFret = () => {
    if (currentScale[0] === note && highlight) {
      // highlight color
    } else if (currentScale.includes(note)) {
      // primary color
    } else {
      // empty color
    }
  }

  // const displayDegree = () => {
  //   let i = currentScale.indexOf(note);
  //   if (i >= 0) {
  //     return getDegree(i, degreeNotation);
  //   }
  // };

  return (
    <div>
      {indexToString(note, sharps)}
      {/* degree and label logic */}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    labelAllNotes: state.labelAllNotes,
    highlightRoots: state.highlightRoots,
    degrees: state.degrees,
    degreeNotation: state.degreeNotation,
    currentScale: state.currentScale,
  }
}
