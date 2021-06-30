import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import Slider from 'react-input-slider'

export default connect(mapStateToProps, mapDispatchToProps)(Metronome)

function Metronome({ tempo, set, darkTheme }) {
  const [audioContext, setAudioContext] = useState(null)
  const [currentQuarterNote, setCurrentQuarterNote] = useState(0)
  const [nextNoteTime, setNextNoteTime] = useState(0.0)
  const [isPlaying, playPause] = useState(false)
  const [intervalID, setIntervalID] = useState(null)

  const theme = darkTheme ? DARK_THEME : LIGHT_THEME
  const SCHEDULE_AHEAD = 0.1
  const LOOKAHEAD = 25

  const nextNote = () => {
    const secondsPerBeat = 60.0 / tempo
    setNextNoteTime(nextNoteTime + secondsPerBeat)
    setCurrentQuarterNote(currentQuarterNote + 1)
  }

  useEffect(() => {
    if (currentQuarterNote == 4) setCurrentQuarterNote(0)
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
    const time = audioContext.currentTime + SCHEDULE_AHEAD
    while (nextNoteTime < time) {
      scheduleNote(currentQuarterNote, nextNoteTime)
      nextNote()
    }
  }
  const start = () => {
    if (isPlaying) return
    if (audioContext == null) {
      let AUDIO_CONTEXT = new (window.AudioContext || window.webkitAudioContext)()
      setAudioContext(AUDIO_CONTEXT)
    } else {
      playPause(true)
      setCurrentQuarterNote(0)
      setNextNoteTime(audioContext.currentTime + 0.05)
      setIntervalID(setInterval(() => scheduler(), LOOKAHEAD))
    }
  }

  useEffect(() => {
    if (audioContext !== null && !isPlaying) {
      playPause(true)
      setCurrentQuarterNote(0)
      setNextNoteTime(audioContext.currentTime + 0.05)
      setIntervalID(setInterval(() => scheduler(), LOOKAHEAD))
    }
  }, [audioContext])

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
    <div className="metronome">
      <button
        className="play-pause-button"
        aria-label="metronome-play-pause-button"
        style={{
          border: `2px solid ${theme.primary1}`,
          background: theme.primary0,
          color: theme.text,
        }}
        onClick={() => startStop()}
      >
        <i id="play-pause-icon" className={isPlaying ? 'fas fa-pause' : 'fas fa-play'} />
      </button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <label
          className="metronome-label"
          htmlFor="bpm-slider"
          style={{ color: theme.text }}
        >
          METRONOME
        </label>
        <Slider
          name="bpm-slider"
          axis="x"
          x={tempo}
          xmin={30}
          xmax={300}
          onChange={({ x }) => handleTempoChange(x, isPlaying)}
          styles={{
            track: {
              backgroundColor: theme.tuning0,
            },
            active: {
              backgroundColor: theme.tertiary0,
            },
          }}
        />
        <label
          className="bpm-label"
          htmlFor="bpm-slider"
          style={{ color: theme.tertiary0 }}
        >
          BPM {tempo}
        </label>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tempo: state.tempo,
    darkTheme: state.darkTheme,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
