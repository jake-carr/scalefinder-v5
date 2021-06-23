import React from 'react'
import Settings from './layout/Settings'
import Fretboard from './layout/Fretboard'
import Footer from './layout/Footer'

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Settings />
      <Fretboard />
      <Footer />
    </div>
  )
}
