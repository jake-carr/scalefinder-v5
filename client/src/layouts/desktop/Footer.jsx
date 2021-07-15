import React, { useContext } from 'react'
import { ThemeContext } from '../../components/App'

export default function Footer({ darkTheme }) {
  const theme = useContext(ThemeContext)

  return (
    <div
      className="h-10 w-full text-lg flex flex-row justify-center items-center"
      style={{ backgroundColor: theme.bg3, color: theme.tertiary1 }}>
      <a
        className="mx-1"
        rel="noopener noreferrer"
        href="mailto: jake.ralph.carr@gmail.com"
        target="_blank">
        Contact
      </a>
      <span className="mx-1">•</span>
      <a
        className="mx-1"
        rel="noopener noreferrer"
        href="https://apps.apple.com/us/app/guitar-scale-finder/id1487884068"
        target="_blank">
        Download on the App Store (free, no ads)
      </a>
    </div>
  )
}
