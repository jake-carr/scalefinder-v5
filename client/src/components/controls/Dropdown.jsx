import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { indexToString } from '../../constants/utils'
import { scales, listScales } from '../../constants/scales'
import { LIGHT_THEME, DARK_THEME } from '../../constants/themes'
import Select from 'react-select'
import ReactTooltip from 'react-tooltip'

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)

function Dropdown({
  options,
  action,
  val,
  name,
  sharps,
  darkTheme,
  infoModal,
  toggle,
  scaleIndex,
}) {
  const [open, toggleOpen] = useState(false)
  const [selection, changeSelection] = useState('')
  const scheme = darkTheme ? DARK_THEME : LIGHT_THEME

  const createTheme = (theme) => {
    const { secondary0, primary0, primary1, text, tertiary0, tertiary1, bg0 } =
      scheme
    if (name === 'Degree Notation') {
      return {
        ...theme.colors,
        primary: tertiary0,
        primary25: tertiary1,
        primary50: primary1,
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
        primary50: secondary0,
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
      return 'w-48'
    } else {
      return 'w-56'
    }
  }

  const multiline = (str) => {
    // Add break tags to long info strings for use with React-tooltip
    str = str.split(' ')
    const len = str.length
    for (let i = 1; i < len; i += 4) {
      str[i] += `<br />`
    }
    return str.join(' ')
  }

  return (
    <div
      className={`${setWidth()} mx-2 flex flex-col relative duration-300`}
      onBlur={() => toggleOpen(false)}
    >
      <div
        className={`relative flex flex-row h-0 ${
          name === 'Degree Notation' ? 'text-xs bottom-4' : 'text-sm bottom-5'
        }  `}
      >
        <label htmlFor={name}>{name.toUpperCase()}</label>
        {name === 'Scale' ? (
          <>
            <a
              className="rounded-full h-4 w-4 mx-1 border-box flex items-center justify-center transition duration-300 focus:outline-none"
              data-tip={multiline(scales[scaleIndex].info)}
            >
              <i className="fas fa-info-circle cursor-pointer" />
            </a>
            <ReactTooltip
              place="bottom"
              className="tooltip"
              border={true}
              borderColor={scheme.secondary0}
              multiline={true}
              type={darkTheme ? 'dark' : 'light'}
              effect="float"
            />
          </>
        ) : null}
      </div>
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
    scaleIndex: state.scaleIndex,
    infoModal: state.infoModal,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (field) => dispatch({ type: 'TOGGLE', payload: field }),
  }
}
