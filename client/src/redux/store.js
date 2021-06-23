import { createStore } from 'redux'
import { reducer } from './reducer'
import { tunings } from '../constants/tunings'

const defaultSettings = {
  darkTheme: true,
  rememberSettings: false,
  rootIndex: 4,
  scaleIndex: 0,
  sharps: true,
  highlightRoots: false,
  labelAllNotes: false,
  degrees: false,
  degreeNotation: 'Numeric',
  tuning: tunings[0].values, // Standard
  frets: 12,
  tempo: 120, // Metronome
  infoModal: false,
  currentScale: [],
}

const store = createStore(reducer, defaultSettings)
export default store
