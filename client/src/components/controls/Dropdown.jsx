import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'
import { listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME  } from '../../constants/themes'
import Select from 'react-select'

export default connect(mapStateToProps, null)(Dropdown)

function Dropdown({ options, action, val, name, sharps, darkTheme }) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')

  const createTheme = (theme) => {
    const scheme = darkTheme ? DARK_THEME : LIGHT_THEME
    const { primary0, primary1, text, tertiary0, tertiary1 } = scheme
    if (name === 'Degree Notation') {
      return {
        ...theme.colors,
        primary: tertiary0,
        primary25: tertiary1,
        primary50: text,
        primary75: tertiary1,
        neutral0: tertiary0,
        neutral5: tertiary0,
        neutral10: tertiary1,
        neutral20: tertiary1,
        neutral30: text,
        neutral40: text,
        neutral50: text,
        neutral60: text,
        neutral70: text,
        neutral80: text,
        neutral90: text,
      }
    } else {
      return {
        ...theme.colors,
        primary: primary0,
        primary25: primary1,
        primary50: text,
        primary75: primary1,
        neutral0: primary0,
        neutral5: primary0,
        neutral10: primary1,
        neutral20: primary1,
        neutral30: text,
        neutral40: text,
        neutral50: text,
        neutral60: text,
        neutral70: text,
        neutral80: text,
        neutral90: text,
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
          colors: createTheme(theme),
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
