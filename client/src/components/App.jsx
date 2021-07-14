import React, { useEffect, useState, lazy, Suspense } from 'react'

export default function App() {
  const [layout, setLayout] = useState(null)

  // dynamically import the components needed
  useEffect(() => {
    if (/Mobi/.test(navigator.userAgent)) {
      async function loadMobileLayout() {
        const MobileLayout = lazy(() =>
          import('../layouts/mobile/MobileLayout'),
        )
        setLayout(() => {
          return <MobileLayout />
        })
      }
      loadMobileLayout()
    } else {
      async function loadDesktopLayout() {
        const Settings = lazy(() => import('../layouts/desktop/Settings'))
        const Fretboard = lazy(() => import('../layouts/desktop/Fretboard'))
        setLayout(() => {
          return (
            <>
              <Settings />
              <Fretboard />
            </>
          )
        })
      }
      loadDesktopLayout()
    }
  }, [])

  // TODO: move ThemeContext.Provider between Suspense and app-main

  return (
    <Suspense fallback={<div>HANG ON (this should be a spinner)</div>}>
      <div className="app-main relative">{layout ? layout : null}</div>
    </Suspense>
  )
}
