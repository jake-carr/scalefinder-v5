import React, { useContext } from 'react'

export default function Footer() {
  return (
    <div className="footer">
      <a
        style={{ marginRight: '0.5rem' }}
        rel="noopener noreferrer"
        href="mailto: jake.ralph.carr@gmail.com"
        target="_blank"
      >
        Contact
      </a>
      <span style={{ marginRight: '0.5rem' }}>•</span>
      <a
        rel="noopener noreferrer"
        href="https://apps.apple.com/us/app/guitar-scale-finder/id1487884068"
        target="_blank"
      >
        Download on the App Store (free, no ads)
      </a>
    </div>
  )
}
