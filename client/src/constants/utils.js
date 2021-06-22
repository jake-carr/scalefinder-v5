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

// TODO: degrees
