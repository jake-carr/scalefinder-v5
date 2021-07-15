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
    <Suspense fallback={<LoadingSpinner />}>
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

function LoadingSpinner() {
  return (
    <div class="loader">
      <div class="loader-circle">
        <div class="loader-circle1 loader-child"></div>
        <div class="loader-circle2 loader-child"></div>
        <div class="loader-circle3 loader-child"></div>
        <div class="loader-circle4 loader-child"></div>
        <div class="loader-circle5 loader-child"></div>
        <div class="loader-circle6 loader-child"></div>
        <div class="loader-circle7 loader-child"></div>
        <div class="loader-circle8 loader-child"></div>
        <div class="loader-circle9 loader-child"></div>
        <div class="loader-circle10 loader-child"></div>
        <div class="loader-circle11 loader-child"></div>
        <div class="loader-circle12 loader-child"></div>
      </div>
    </div>
  )
}
