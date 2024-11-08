import { useState } from 'react'
import { useSize } from '@wam/hooks/useSize'
import Header from '@wam/components/Header'
import Layout from '@wam/components/Layout'
import Button from '@wam/components/Button'
import LongInput from '@wam/components/LongInput'

interface TextPageProps {
  onNext: (message: string) => void
  initialMessage: string
}

function TextPage({ onNext, initialMessage }: TextPageProps) {
  useSize({ width: 490, height: 760 })
  const [message, setMessage] = useState(initialMessage)

  return (
    <Layout>
      <Header label="할 말" />
      <LongInput
        title="못할 말"
        value={message}
        onChange={(val) => setMessage(val)}
        maxLength={100}
      />
      <Button
        label="다음으로"
        onClick={() => onNext(message)}
      />
    </Layout>
  )
}

export default TextPage
