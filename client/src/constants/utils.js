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
