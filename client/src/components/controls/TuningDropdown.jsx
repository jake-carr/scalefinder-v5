import React, { useState, useEffect, useContext, lazy } from 'react'
import { connect } from 'react-redux'
import { ThemeContext } from '../App'
import { tunings } from '../../constants/tunings'
const Select = lazy(() => import('react-select'))

export default connect(mapStateToProps, mapDispatchToProps)(TuningDropdown)

function TuningDropdown({ tuning, set, mobile }) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')
  const scheme = useContext(ThemeContext) // Theme keyword reserved for react-select

  let tuningOptions = tunings.map((option) => {
    return { value: option.values, label: option.name }
  })

  // Remove 8-string standard option on mobile since layout is max 7 strings
  if (mobile) tuningOptions.pop()

  const handleSelectPresetTuning = (event) => {
    let values = []
    for (let option of tuningOptions) {
      values.push(option.value)
    }
    let index = values.indexOf(event.value)
    set('tuning', values[index])
  }

  const createTheme = (theme) => {
    const { tuning0, tuning1, text } = scheme
    return {
      ...theme.colors,
      primary: tuning0,
      primary25: tuning1,
      primary50: tuning1,
      neutral0: tuning0,
      neutral5: tuning1,
      neutral10: tuning1,
      neutral20: tuning1,
      neutral30: text,
      neutral40: text,
      neutral50: text,
      neutral60: text,
      neutral70: text,
      neutral80: text,
      neutral90: text,
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
    <div
      className="w-48 flex flex-col relative"
      onBlur={() => toggleOpen(false)}>
      <label
        className="relative text-sm bottom-5 h-0"
        htmlFor="tuning-dropdown">
        TUNING
      </label>
      <Select
        theme={(theme) => ({
          ...theme,
          colors: createTheme(theme),
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
    tuning: state.tuning,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    set: (field, value) =>
      dispatch({ type: 'SET_VALUE', setting: field, payload: value }),
  }
}
