import React from 'react'
import Settings from './layout/Settings'
import Fretboard from './layout/Fretboard'

export default function App() {
  return (
    <div className="relative w-full h-screen">
      <Settings />
      <Fretboard />
    </div>
  )
}
