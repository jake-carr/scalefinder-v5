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
    const { primary0, primary1, text, tertiary0, tertiary1 } = scheme
    const txt = toHex(text, dark)
    const p0 = toHex(primary0, dark)
    const p1 = toHex(primary1, dark)
    const t0 = toHex(tertiary0, dark)
    const t1 = toHex(tertiary1, dark)
    if (name === 'Degree Notation') {
      return {
        ...theme.colors,
        primary: t0,
        primary25: t1,
        primary50: txt,
        primary75: t1,
        neutral0: t0,
        neutral5: t0,
        neutral10: t1,
        neutral20: t1,
        neutral30: txt,
        neutral40: txt,
        neutral50: txt,
        neutral60: txt,
        neutral70: txt,
        neutral80: txt,
        neutral90: txt,
      }
    } else {
      return {
        ...theme.colors,
        primary: p0,
        primary25: p1,
        primary50: txt,
        primary75: p1,
        neutral0: p0,
        neutral5: p0,
        neutral10: p1,
        neutral20: p1,
        neutral30: txt,
        neutral40: txt,
        neutral50: txt,
        neutral60: txt,
        neutral70: txt,
        neutral80: txt,
        neutral90: txt,
      }
    }
  }

  const mapOptions = () => {
    return options.map((option, i) => {
      return {
        value: i,
        label: option,
      }
    })
  }

  const opts = mapOptions()
  const scaleNames = listScales()

  const displayValue = () => {
    if (name === 'Root') {
      return indexToString(val, sharps)
    }
    if (name === 'Degree Notation') {
      return val
    } else {
      return scaleNames[val]
    }
  }

  const handleSelect = (e) => {
    if (name === 'Degree Notation') {
      action(options[e.value])
    } else {
      action(e.value)
    }
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
    } else {
      changeSelection(scaleNames[val])
    }
  }, [val])

  const setWidth = () => {
    if (name === 'Root') {
      return 'w-20'
    } else if (name === 'Degree Notation') {
      return 'w-40'
    } else {
      return 'w-56'
    }
  }

  return (
    <div className={`${setWidth()} mx-2`} onBlur={() => toggleOpen(false)}>
      <label htmlFor={name}>{name.toUpperCase()}</label>
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
          value: displayValue(),
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
