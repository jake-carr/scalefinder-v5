import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { tunings } from '../../constants/tunings'
import { LIGHT_THEME, DARK_THEME, toHex } from '../../constants/themes'

export default connect(mapStateToProps, mapDispatchToProps)(TuningDropdown)

function TuningDropdown({ tuning, set, darkTheme }) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')

  const tuningOptions = tunings.map((option) => {
    return { value: option.values, label: option.name }
  })

  const handleSelectPresetTuning = (event) => {
    let values = []
    for (let option of tuningOptions) {
      values.push(option.value)
    }
    let index = values.indexOf(event.value)
    set('tuning', values[index]) // set('tuning')
  }

  const createTheme = (theme, dark) => {
    const scheme = dark ? DARK_THEME : LIGHT_THEME
    const { tuning0, tuning1, text } = scheme
    const shade1 = toHex(tuning0, dark)
    const shade2 = toHex(tuning1, dark)
    const t = toHex(text, dark)
    return {
      ...theme.colors,
      primary: shade1,
      primary25: shade2,
      primary50: shade2,
      neutral0: shade1,
      neutral5: shade2,
      neutral10: shade2,
      neutral20: shade2,
      neutral30: t,
      neutral40: t,
      neutral50: t,
      neutral60: t,
      neutral70: t,
      neutral80: t,
      neutral90: t,
    }
  }

  useEffect(() => {
    // Dropdown will automatically switch to the name of a tuning if the user manually adjusts to a preset one.
    let values = []
    let names = []
    for (let option of tuningOptions) {
      values.push(option.value.join(','))
      names.push(option.label)
    }
    let target = tuning.join(',')
    if (values.includes(target)) changeSelection(names[values.indexOf(target)])
    // Dropdown reads CUSTOM when the current tuning doesn't match any of the preset tuning options.
    else changeSelection('CUSTOM')
  }, [tuning])

  useEffect(() => {
    toggleOpen(false)
  }, [selection])

  return (
    <div className="w-48" onBlur={() => toggleOpen(false)}>
      <label htmlFor="tuning-dropdown">TUNING</label>
      <Select
        theme={(theme) => ({
          ...theme,
          colors: createTheme(theme, darkTheme),
        })}
        styles={{
          option: (styles) => ({
            ...styles,
            cursor: 'pointer',
          }),
          control: (styles) => ({
            ...styles,
            cursor: 'pointer',
          }),
        }}
        name="tuning-dropdown"
        menuIsOpen={open}
        onFocus={() => toggleOpen(true)}
        blurInputOnSelect
        onChange={handleSelectPresetTuning}
        options={tuningOptions}
        value={{ value: selection, label: selection }}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
    tuning: state.tuning,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
