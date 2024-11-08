import { useEffect, useMemo, useState } from 'react'
import { useSize } from '@wam/hooks/useSize'
import Layout from '@wam/components/Layout'
import Header from '@wam/components/Header'
import Button from '@wam/components/Button'
import IconButton from '@wam/components/IconButton'
import Card from '@wam/components/Card'
import { cardNames, getApiInput } from '@wam/utils/files'
import { callFunction, getWamData } from '@wam/utils/wam'

interface SpeechPageProps {
  onBack: () => void
  message: string
}

function SpeechPage({ onBack, message }: SpeechPageProps) {
  useSize({ width: 490, height: 760 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const totalImages = cardNames.length
  const appId = useMemo(() => getWamData('appId') ?? '', [])

  useEffect(() => {
    console.log(currentImageIndex)
  }, [currentImageIndex])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0))
  }

  const handleSend = async () => {
    const inputCategory = getApiInput(currentImageIndex)
    const input = {
      message,
      types: inputCategory[1],
    }
    if (inputCategory[0] === 'tone') {
      // tone
      await callFunction(appId, 'changeTone', { input })
    } else {
      //character
      await callFunction(appId, 'changeCharacter', { input })
    }

    console.log('Sending message:', message, 'with image:', currentImageIndex)
  }

  return (
    <Layout>
      <Header
        label="할 말"
        action={{ label: '뒤로가기', onClick: onBack }}
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <IconButton
          type="left"
          onClick={handlePrevImage}
        />

        <Card index={currentImageIndex} />

        <IconButton
          type="right"
          onClick={handleNextImage}
        />
      </div>

      <Button
        label="보내기"
        onClick={handleSend}
      />
    </Layout>
  )
}

export default SpeechPage
