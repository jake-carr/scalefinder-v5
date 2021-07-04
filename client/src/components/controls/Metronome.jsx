import React, { Component, useContext } from 'react'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import Slider from 'react-input-slider'

export default class Metronome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempo: this.props.tempoSetting || 120, // 30-300 BPM
      hz: this.props.hzSetting || 440, // frequency of oscillator tone
      audioContext: null,
      currentQuarterNote: 0,
      nextNoteTime: 0.0, // when the next note is due
      isPlaying: false,
      intervalID: null,
    }
  }

  static lookahead = 25 // How frequently to call scheduling function in milliseconds
  static scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec)

  nextNote() {
    // Advance current note and time by a quarter note

    // Calculate beat length using selected tempo
    const secondsPerBeat = 60.0 / this.state.tempo

    // Add beat length to last beat time & advance the beat number, wrapping to zero
    this.setState(
      {
        nextNoteTime: this.state.nextNoteTime + secondsPerBeat,
        currentQuarterNote: this.state.currentQuarterNote + 1,
      },
      () => {
        if (this.state.currentQuarterNote == 4) {
          this.setState({ currentQuarterNote: 0 })
        }
      },
    )
  }

  scheduleNote(beatNumber, time) {
    // Create an oscillator
    const osc = this.state.audioContext.createOscillator()
    const envelope = this.state.audioContext.createGain()

    // Give first beat a slightly higher tone
    osc.frequency.value = beatNumber == 0 ? this.state.hz + 220 : this.state.hz

    envelope.gain.value = 1
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

    osc.connect(envelope)
    envelope.connect(this.state.audioContext.destination)

    osc.start(time)
    osc.stop(time + 0.03)
  }

  scheduler() {
    // While there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (
      this.state.nextNoteTime <
      this.state.audioContext.currentTime + Metronome.scheduleAheadTime
    ) {
      this.scheduleNote(this.state.currentQuarterNote, this.state.nextNoteTime)
      this.nextNote()
    }
  }

  start() {
    if (this.state.isPlaying) return

    if (this.state.audioContext == null) {
      let audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.setState({ audioContext }, () => {
        this.setState({
          isPlaying: true,
          currentQuarterNote: 0,
          nextNoteTime: this.state.audioContext.currentTime + 0.05,
          intervalID: setInterval(() => this.scheduler(), Metronome.lookahead),
        })
      })
    } else {
      this.setState({
        isPlaying: true,
        currentQuarterNote: 0,
        nextNoteTime: this.state.audioContext.currentTime + 0.05,
        intervalID: setInterval(() => this.scheduler(), Metronome.lookahead),
      })
    }
  }

  startStop() {
    if (this.state.isPlaying) {
      this.stop()
    } else {
      this.start()
    }
  }

  stop() {
    this.setState({ isPlaying: false })
    clearInterval(this.state.intervalID)
  }

  handleFrequencyChange(hz) {
    this.setState({ hz }, () => {
      this.props.set('hz', hz)
    })
  }

  handleTempoChange(tempo, wasJustPlaying) {
    this.stop()
    this.setState({ tempo }, () => {
      this.props.set('tempo', tempo)
      if (wasJustPlaying) this.start()
    })
  }

  render() {
    const theme = this.props.darkTheme ? DARK_THEME : LIGHT_THEME
    return (
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row flex-nowrap h-8">
            <label className="my-1" htmlFor="bpm-slider" style={{ color: theme.text }}>
              METRONOME
            </label>
            <button
              className="self-center rounded-full mx-2 h-6 w-6 focus:outline-none"
              aria-label="metronome-play-pause-button"
              style={{
                background: theme.primary0,
                color: theme.text,
              }}
              onClick={() => this.startStop()}
            >
              <i
                id="play-pause-icon"
                className={`text-sm ${
                  this.state.isPlaying ? 'fas fa-pause' : 'fas fa-play'
                }`}
              />
            </button>
          </div>
          <Slider
            name="bpm-slider"
            axis="x"
            x={this.state.tempo}
            xmin={30}
            xmax={300}
            onChange={({ x }) => this.handleTempoChange(x, this.state.isPlaying)}
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
            className="my-1 text-sm"
            htmlFor="bpm-slider"
            style={{ color: theme.tertiary0 }}
          >
            <span style={{ color: theme.text }}>BPM </span>
            <span style={{ color: theme.tertiary0 }}>{this.state.tempo}</span>
          </label>
          <Slider
            name="hz-slider"
            axis="x"
            x={this.state.hz}
            xmin={400}
            xmax={800}
            onChange={({ x }) => this.handleFrequencyChange(x)}
            styles={{
              track: {
                backgroundColor: theme.tuning1,
              },
              active: {
                backgroundColor: theme.tertiary1,
              },
            }}
          />
          <label className="my-1 text-sm" htmlFor="hz-slider">
            <span style={{ color: theme.text }}>TONE </span>
            <span style={{ color: theme.tertiary1 }}>{this.state.hz}Hz</span>
          </label>
        </div>
      </div>
    )
  }
}
