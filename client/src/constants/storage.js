const parseTuning = (str) => {
  const arr = str.split(',')
  return arr.map((i) => {
    return Number(i)
  })
}

export const retrieveLocalStorage = () => {
  let values = {},
    keys = Object.keys(localStorage),
    i = keys.length
  while (i--) {
    let item = localStorage.getItem(keys[i])
    if (keys[i] === 'tuning') {
      values[keys[i]] = parseTuning(item) // convert to numeric array
    } else if (keys[i] === 'theme' || keys[i] === 'degreeNotation') {
      values[keys[i]] = item // leave as string
    } else {
      values[keys[i]] = JSON.parse(item) // JSON.parse bools & nums
    }
  }
  return values
}

export const saveInLocalStorage = (setting, value) => {
  localStorage.setItem(setting, value)
}
