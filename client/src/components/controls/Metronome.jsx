import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-input-slider'

export default connect(mapStateToProps, mapDispatchToProps)(Metronome)

function Metronome({ tempo, set }) {
  const [audioContext, setAudioContext] = useState(null)
  const [currentQuarterNote, setCurrentQuarterNote] = useState(0)
  const [nextNoteTime, setNextNoteTime] = useState(0.0)
  const [isPlaying, playPause] = useState(false)
  const [intervalID, setIntervalID] = useState(null)

  const SCHEDULE_AHEAD = 0.1
  const LOOKAHEAD = 25

  const nextNote = () => {
    const secondsPerBeat = 60.0 / tempo
    setNextNoteTime(nextNoteTime + secondsPerBeat)
    setCurrentQuarterNote(currentQuarterNote + 1)
  }

  useEffect(() => {
    if (currentQuarterNote === 4) setCurrentQuarterNote(0)
  }, [currentQuarterNote])

  const scheduleNote = (beatNumber, time) => {
    const osc = audioContext.createOscillator()
    const envelope = audioContext.createGain()

    // TODO: allow user to change frequency values from 660/440
    osc.frequency.value = beatNumber == 0 ? 660 : 440
    //

    envelope.gain.value = 1
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

    osc.connect(envelope)
    envelope.connect(audioContext.destination)

    osc.start(time)
    osc.stop(time + 0.03)
  }

  const scheduler = () => {
    while (nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD) {
      scheduleNote(currentQuarterNote, nextNoteTime)
      nextNote()
    }
  }

  const start = () => {
    if (isPlaying) return
    if (audioContext == null) {
      const AC = new (window.AudioContext || window.webkitAudioContext)()
      setAudioContext(AC)
      playPause(true)
      setCurrentQuarterNote(0)
      setNextNoteTime(AC.currentTime + 0.05)
      setIntervalID(setInterval(() => scheduler(), LOOKAHEAD))
    } else {
      playPause(true)
      setCurrentQuarterNote(0)
      setNextNoteTime(audioContext.currentTime + 0.05)
      setIntervalID(setInterval(() => scheduler(), LOOKAHEAD))
    }
  }

  const stop = () => {
    playPause(false)
    clearInterval(intervalID)
  }

  const startStop = () => {
    isPlaying ? stop() : start()
  }

  const handleTempoChange = async (tempo, wasPlaying) => {
    stop()
    await set('tempo', tempo)
    if (wasPlaying) start()
  }

  return (
    <div className="border-2 border-black">
      <button onClick={() => startStop()}>
        <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'} />
      </button>
      <Slider
        name="bpm-slider"
        axis="x"
        x={tempo}
        xmin={30}
        xmax={300}
        onChange={({ x }) => handleTempoChange(x, isPlaying)}
        // styles={{
        //   track: {
        //     backgroundColor: this.props.trackColor,
        //   },
        //   active: {
        //     backgroundColor: this.props.activeColor,
        //   },
        // }}
      />
      <label className="bpm-label" htmlFor="bpm-slider">
        BPM {tempo}
      </label>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tempo: state.tempo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
