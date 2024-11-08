import { useEffect, useState } from 'react'
import { AppProvider, type ThemeName } from '@channel.io/bezier-react'
import { isMobile } from './utils/userAgent'
import { getWamData } from './utils/wam'
import { Tutorial, Register, Halmal, Halil } from './pages'

type WamType = 'tutorial' | 'register' | 'halmal' | 'halil' | 'default'

function App() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [currentWam, setCurrentWam] = useState<WamType>('default')

  const getWamFromPath = () => {
    const pathSegments = window.location.pathname.split('/')
    console.log(pathSegments)
    return pathSegments[pathSegments.length - 2] as WamType // Extract WAM name
  }

  useEffect(() => {
    const appearance = getWamData('appearance')
    setTheme(appearance === 'dark' ? 'dark' : 'light')

    const wamName = getWamFromPath()
    console.log(`Detected WAM from path: ${wamName}`)
    setCurrentWam(wamName)
    console.log(currentWam)
  }, [])

  const renderWam = () => {
    switch (currentWam) {
      case 'tutorial':
        return <Tutorial />
      case 'register':
        return <Register />
      case 'halmal':
        return <Halmal />
      case 'halil':
        return <Halil onClose={() => console.log('Halil closed')} />
      default:
        return <div>No WAM found</div>
    }
  }

  return (
    <AppProvider themeName={theme}>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        {renderWam()}
      </div>
    </AppProvider>
  )
}

export default App
