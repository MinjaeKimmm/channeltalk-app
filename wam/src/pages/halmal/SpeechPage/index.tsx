import { useEffect, useState } from 'react'
import { useSize } from '@wam/hooks/useSize'
import Layout from '@wam/components/Layout'
import Header from '@wam/components/Header'
import Button from '@wam/components/Button'
import IconButton from '@wam/components/IconButton'
import Card from '@wam/components/Card'
import { cardNames } from '@wam/utils/files'

interface SpeechPageProps {
  onBack: () => void
  message: string
}

function SpeechPage({ onBack, message }: SpeechPageProps) {
  useSize({ width: 490, height: 760 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const totalImages = cardNames.length

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
