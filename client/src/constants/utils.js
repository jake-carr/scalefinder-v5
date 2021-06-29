export const sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
export const flats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

export const parseNote = (n) => {
  if (n >= 24) return n - 24
  else if (n >= 12) return n - 12
  else return n
}

export const getAlteration = (isSharps) => {
  return isSharps ? sharps : flats
}

export const indexToString = (index, isSharps) => {
  return isSharps ? sharps[index] : flats[index]
}

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const sargams = ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni']

export const getDegree = (i, type) => {
  if (type === 'Numeric') {
    return i + 1
  }
  if (type === 'Roman numeral') {
    return numerals[i]
  }
  if (type === 'Indian sargams') {
    return sargams[i]
  }
}

export const makeChord = (root, type, isSharps) => {
  let intervals
  const result = []
  if (type === 'maj') {
    intervals = [root, parseNote(root + 4), parseNote(root + 7)]
  }
  if (type === 'min') {
    intervals = [root, parseNote(root + 3), parseNote(root + 7)]
  }
  if (type === 'maj7') {
    intervals = [root, parseNote(root + 4), parseNote(root + 7), parseNote(root + 11)]
  }
  if (type === 'min7') {
    intervals = [root, parseNote(root + 3), parseNote(root + 7), parseNote(root + 10)]
  }
  if (type === 'dom7') {
    intervals = [root, parseNote(root + 4), parseNote(root + 7), parseNote(root + 10)]
  }
  // todo (type === 'min7b5')
  //  while B minor seventh flat five consists of the notes, B – D – F – A. (key of C)
  for (let interval of intervals) {
    result.push(interval)
  }
  return result
}

// needs to acount for 7ths
export const getChords = (scaleIndex, rootIndex, sharps) => {
  let note = rootIndex
  const parseNote = (n) => {
    if (n >= 24) return n - 24
    else if (n >= 12) return n - 12
    else return n
  }
  const pattern = scales[scaleIndex].pattern
  const chords = scales[scaleIndex].qualities.map((qual, i) => {
    let chord
    switch (qual) {
      case 'min':
        chord = `${indexToString(note, sharps)} Minor`
        note = parseNote(note + pattern[i])
        return chord
      case 'maj':
        chord = `${indexToString(note, sharps)} Major`
        note = parseNote(note + pattern[i])
        return chord
      case 'dim':
        chord = `${indexToString(note, sharps)} Diminished`
        note = parseNote(note + pattern[i])
        return chord
      case 'aug':
        chord = `${indexToString(note, sharps)} Minor`
        note = parseNote(note + pattern[i])
        return chord
    }
  })
  return chords.join(', ')
}
