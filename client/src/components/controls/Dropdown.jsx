import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'
import { listScales } from '../../constants/scales'
import Select from 'react-select'

export default connect(mapStateToProps, null)(Dropdown)

function Dropdown({ options, action, val, name, sharps }) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')

  // TODO
  const createTheme = (theme) => {
    // return {
    //   ...theme.colors,
    //   primary: // TODO
    //   primary25: // TODO,
    //   primary50: // TODO,
    //   primary75: // TODO,
    //   neutral0: // TODO
    //   neutral5: // TODO
    //   neutral10: // TODO,
    //   neutral20: // TODO,
    //   neutral30: // TODO,
    //   neutral40: // TODO,
    //   neutral50: // TODO,
    //   neutral60: // TODO,
    //   neutral70: // TODO,
    //   neutral80: // TODO,
    //   neutral90: // TODO,
    // };
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
        // theme={(theme) => ({
        //   ...theme,
        //   colors: createTheme(theme),
        // })}
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
  }
}
