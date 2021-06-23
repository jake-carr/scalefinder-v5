export const LIGHT_THEME = {
  // TODO
}

export const DARK_THEME = {
  // none of these are finalized
  text: 'gray-100',
  bg0: 'gray-900',
  bg1: 'gray-800',
  bg2: 'gray-600',
  bg3: 'gray-400',
  primary0: 'purple-600', // main selectors, large round buttons, frets
  primary1: 'purple-500',
  secondary0: 'green-400', // highlighted frets
  secondary1: 'green-300',
  tertiary0: 'blue-600', // degrees, degree notation selector
  tertiary1: 'blue-500',
  tuning0: 'pink-500', // tuning selector, indivdual tuners
  tuning1: 'pink-400',
  hover0: 'gray-700', // bg color on button hover
  hover1: 'coolGray-200', // text and border color on button hover
}

// todo
export const toHex = (tailwind, dark) => {
  if (dark) {
    switch (tailwind) {
      case 'purple-600':
        return '#7C3AED'
      case 'purple-500':
        return '#8B5CF6'
      case 'gray-100':
        return '#F3F4F6'
      case 'pink-500':
        return '#EC4899'
      case 'pink-400':
        return '#F472B6'
      case 'blue-600':
        return '#2563EB'
      case 'blue-500':
        return '#3B82F6'
    }
  }
}
