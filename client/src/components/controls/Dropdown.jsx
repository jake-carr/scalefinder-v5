import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'
import { listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME, toHex } from '../../constants/themes'
import Select from 'react-select'

export default connect(mapStateToProps, null)(Dropdown)

function Dropdown({ options, action, val, name, sharps, darkTheme }) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')

  const createTheme = (theme, dark) => {
    const scheme = dark ? DARK_THEME : LIGHT_THEME
    const { primary0, primary1, text } = scheme
    const p0 = toHex(primary0, dark)
    const p1 = toHex(primary1, dark)
    const t = toHex(text, dark)
    return {
      ...theme.colors,
      primary: p0,
      primary25: p1,
      primary50: t,
      primary75: p1,
      neutral0: p0,
      neutral5: p0,
      neutral10: p1,
      neutral20: p1,
      neutral30: t,
      neutral40: t,
      neutral50: t,
      neutral60: t,
      neutral70: t,
      neutral80: t,
      neutral90: t,
    }
  }

  const mapOptions = () => {
    if (name === 'Degree Notation') {
      return options.map((opt, i) => {
        return {
          value: opt,
          label: opt,
        }
      })
    } else {
      return options.map((opt, i) => {
        return {
          value: i,
          label: opt,
        }
      })
    }
  }

  const opts = mapOptions()
  const scaleNames = listScales()

  const displayValue = () => {
    if (name === 'Root') {
      return indexToString(val, sharps)
    }
    if (name === 'Degree Notation') {
      return val
    }
    // TODO tuning
    else {
      return scaleNames[val]
    }
  }
  const handleSelect = (e) => {
    action(e.value)
    changeSelection(e.label)
  }

  useEffect(() => {
    toggleOpen(false)
  }, [selection])

  useEffect(() => {
    if (name === 'Root') {
      changeSelection(indexToString(val, sharps))
    } else if (name === 'Degree Notation') {
      changeSelection(val)
      // TODO Tuning
    } else {
      changeSelection(scaleNames[val])
    }
  }, [val])

  return (
    <div className="" onBlur={() => toggleOpen(false)}>
      <label className="" htmlFor={name}>
        {name.toUpperCase()}
      </label>
      <Select
        theme={(theme) => ({
          ...theme,
          colors: createTheme(theme, darkTheme),
        })}
        styles={{
          menu: (provided) => ({
            ...provided,
            opacity: 1,
          }),
          option: (styles) => ({
            ...styles,
            cursor: 'pointer',
          }),
          control: (styles) => ({
            ...styles,
            cursor: 'pointer',
          }),
        }}
        id={name}
        name={name}
        menuIsOpen={open}
        onFocus={() => toggleOpen(true)}
        blurInputOnSelect
        onChange={(e) => handleSelect(e)}
        options={opts}
        value={{
          value: val,
          label: selection,
        }}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sharps: state.sharps,
    darkTheme: state.darkTheme,
  }
}
