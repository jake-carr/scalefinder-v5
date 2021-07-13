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
  tuners: 0,
  // Chords
  chordModal: false,
  showChords: false,
  chordNotes: [],
  // Metronome
  tempo: 120,
  hz: 440,
}

const storage = retrieveLocalStorage()

const store = createStore(
  reducer,
  storage.rememberSettings ? storage : defaultSettings,
)

export default store
