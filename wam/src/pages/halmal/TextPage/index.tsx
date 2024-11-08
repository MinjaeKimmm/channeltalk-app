import { useState } from 'react';
import { VStack, Button, Text, TextField } from '@channel.io/bezier-react';
import { useSize } from '@wam/hooks/useSize';

interface TextPageProps {
  onNext: (message: string) => void;
  initialMessage: string;
}

function TextPage({ onNext, initialMessage }: TextPageProps) {
  useSize({ width: 491, height: 757 });
  const [message, setMessage] = useState(initialMessage);

  return (
    <VStack spacing={24} style={{ height: '100%' }}>
      <Text typo="24" bold color="txt-black-darkest">
        할 말
      </Text>
      
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="보내는말"
        style={{ flex: 1 }}
      />
      
      <Button
        colorVariant="blue"
        styleVariant="primary"
        text="다음으로"
        onClick={() => onNext(message)}
        disabled={!message.trim()}
      />
    </VStack>
  );
}

export default TextPage;