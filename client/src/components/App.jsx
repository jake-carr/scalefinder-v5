import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  createContext,
} from 'react'
import { connect } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from '../constants/themes'

export const ThemeContext = createContext(DARK_THEME)

const { Provider } = ThemeContext

export default connect(mapStateToProps, null)(App)

function App({ darkTheme }) {
  const [layout, setLayout] = useState(null)

  // Load mobile or desktop layout
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

  return (
    <Suspense fallback={<div>HANG ON (this should be a spinner)</div>}>
      <Provider value={darkTheme ? DARK_THEME : LIGHT_THEME}>
        <div className="app-main relative">{layout ? layout : null}</div>
      </Provider>
    </Suspense>
  )
}

function mapStateToProps(state) {
  return {
    darkTheme: state.darkTheme,
  }
}
