import { createStore } from 'redux'
import { reducer } from './reducer'
import { tunings } from '../constants/tunings'
import { createScale, scales } from '../constants/scales'
import { retrieveLocalStorage } from '../constants/storage'

const defaultSettings = {
  // App
  darkTheme: true,
  rememberSettings: false,
  // Main
  rootIndex: 3,
  scaleIndex: 0,
  tuning: tunings[0].values, // Standard
  currentScale: createScale(3, scales[0].pattern), // C Major
  // Fretboard
  frets: 12,
  sharps: true,
  degrees: false,
  degreeNotation: 'Numeric',
  highlightRoots: false,
  labelAllNotes: false,
  // Chords
  chordModal: true,
  showChords: false,
  chordNotes: [],
  // Metronome
  tempo: 120,
  hz: 440,
}

let store
const storage = retrieveLocalStorage()

if (storage.rememberSettings) store = createStore(reducer, storage)
else store = createStore(reducer, defaultSettings)

export default store
