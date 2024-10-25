import { useEffect, useState } from 'react'
import { AppProvider, type ThemeName } from '@channel.io/bezier-react'
import { isMobile } from './utils/userAgent'
import { getWamData } from './utils/wam'
import { ChooseOption, Send } from './pages';

function App() {
  const [theme, setTheme] = useState<ThemeName>('light')
  const [currentPage, setCurrentPage] = useState<'choose' | 'send'>('choose');

  const handleNavigate = (page: 'choose' | 'send') => setCurrentPage(page);

  useEffect(() => {
    const appearance = getWamData('appearance')
    setTheme(appearance === 'dark' ? 'dark' : 'light')
  }, [])

  return (
    <AppProvider themeName={theme}>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        {currentPage === 'choose' && <ChooseOption onNavigate={handleNavigate} />}
        {currentPage === 'send' && <Send onNavigate={handleNavigate} />}
      </div>
    </AppProvider>
  );
}

export default App
