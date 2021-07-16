import React, {
  useEffect,
  useState,
  lazy,
  Suspense,
  createContext,
} from 'react'
import { connect } from 'react-redux'
import { DARK_THEME, LIGHT_THEME } from '../constants/themes'
import DeviceOrientation, { Orientation } from 'react-screen-orientation'

export const ThemeContext = createContext(DARK_THEME)

const { Provider } = ThemeContext

export default connect(mapStateToProps, null)(App)

function App({ darkTheme }) {
  const [layout, setLayout] = useState(null)

  // Load mobile or desktop layout
  useEffect(() => {
    if (/Mobi/.test(navigator.userAgent)) {
      async function loadMobileLayout() {
        const MobileSettings = lazy(() =>
          import('../layouts/mobile/MobileSettings'),
        )
        const MobileFretboard = lazy(() =>
          import('../layouts/mobile/MobileFretboard'),
        )
        setLayout(() => {
          return (
            <DeviceOrientation lockOrientation={'landscape'}>
              <Orientation orientation="landscape" alwaysRender={false}>
                <div className="app-main relative">
                  <MobileSettings />
                  <MobileFretboard />
                </div>
              </Orientation>
              <Orientation orientation="portrait" alwaysRender={false}>
                <div
                  style={{
                    width: '100vw',
                    height: '100vh',
                    textAlign: 'center',
                    backgroundColor: '#404040',
                  }}>
                  <h2
                    style={{
                      fontSize: 30,
                      paddingTop: '10%',
                      color: 'white',
                    }}>
                    Please rotate your device
                  </h2>
                  <LoadingSpinner />
                </div>
              </Orientation>
            </DeviceOrientation>
          )
        })
      }
      loadMobileLayout()
    } else {
      async function loadDesktopLayout() {
        const Settings = lazy(() => import('../layouts/desktop/Settings'))
        const Fretboard = lazy(() => import('../layouts/desktop/Fretboard'))
        setLayout(() => {
          return (
            <div className="app-main relative">
              <Settings />
              <Fretboard />
            </div>
          )
        })
      }
      loadDesktopLayout()
    }
  }, [])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Provider value={darkTheme ? DARK_THEME : LIGHT_THEME}>
        <>{layout ? layout : null}</>
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
    <div className="loader">
      <div className="loader-circle">
        <div className="loader-circle1 loader-child"></div>
        <div className="loader-circle2 loader-child"></div>
        <div className="loader-circle3 loader-child"></div>
        <div className="loader-circle4 loader-child"></div>
        <div className="loader-circle5 loader-child"></div>
        <div className="loader-circle6 loader-child"></div>
        <div className="loader-circle7 loader-child"></div>
        <div className="loader-circle8 loader-child"></div>
        <div className="loader-circle9 loader-child"></div>
        <div className="loader-circle10 loader-child"></div>
        <div className="loader-circle11 loader-child"></div>
        <div className="loader-circle12 loader-child"></div>
      </div>
    </div>
  )
}
