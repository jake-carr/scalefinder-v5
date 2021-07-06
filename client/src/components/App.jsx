import React from 'react'
import Settings from './layout/Settings'
import Fretboard from './layout/Fretboard'
import Footer from './layout/Footer'

export default function App() {
  return (
    <div className="relative w-full h-screen">
      <div className="h-1/3">
        <Settings />
      </div>
      <div className="h-2/3">
        <Fretboard />
      </div>
      <Footer />
    </div>
  )
}
