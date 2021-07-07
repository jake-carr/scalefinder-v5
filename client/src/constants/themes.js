const colors = require('tailwindcss/colors')

// TODO; hover colors

export const LIGHT_THEME = {
  text: colors.blueGray[800],
  bg0: colors.blueGray[50],
  bg1: colors.blueGray[100],
  bg2: colors.blueGray[200],
  bg3: colors.blueGray[300],
  primary0: colors.emerald[400],
  primary1: colors.emerald[300],
  secondary0: colors.sky[500],
  secondary1: colors.sky[400],
  tertiary0: colors.fuchsia[600],
  tertiary1: colors.fuchsia[500],
  tuning0: colors.yellow[500],
  tuning1: colors.yellow[400],
  chord0: colors.rose[600],
  chord1: colors.rose[500],
  chord2: colors.rose[400],
  chord3: colors.rose[300],
}

export const DARK_THEME = {
  text: colors.trueGray[50],
  bg0: colors.trueGray[900],
  bg1: colors.trueGray[800],
  bg2: colors.trueGray[700],
  bg3: colors.trueGray[600],
  primary0: colors.purple[700],
  primary1: colors.purple[600],
  secondary0: colors.green[500],
  secondary1: colors.green[400],
  tertiary0: colors.blue[400],
  tertiary1: colors.blue[300],
  tuning0: colors.pink[500],
  tuning1: colors.pink[400],
  chord0: colors.amber[500],
  chord1: colors.amber[400],
  chord2: colors.amber[300],
  chord3: colors.amber[200],
  hover0: 'purple-400',
  hover1: 'coolGray-200',
}
