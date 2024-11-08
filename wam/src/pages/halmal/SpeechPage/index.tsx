import { useState } from 'react';
import { VStack, Button, Text, HStack, Icon } from '@channel.io/bezier-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@channel.io/bezier-icons';
import { useSize } from '@wam/hooks/useSize';

interface SpeechPageProps {
  onBack: () => void;
  message: string;
}

function SpeechPage({ onBack, message }: SpeechPageProps) {
  useSize({ width: 491, height: 757 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = 5; 

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  };

  const handleSend = async () => {
    console.log('Sending message:', message, 'with image:', currentImageIndex);
  };

  return (
    <VStack spacing={24} style={{ height: '100%' }}>
      <Text typo="24" bold color="txt-black-darkest">
        할 말
      </Text>
      
      <VStack spacing={16} style={{ flex: 1 }}>
        <Text color="txt-black-dark">{message}</Text>
        
        <HStack justify="between" align="center" style={{ flex: 1 }}>
          <Button
            colorVariant="monochrome"
            styleVariant="tertiary"
            leftContent={ChevronLeftIcon}
            onClick={handlePrevImage}
          />
          
          {/* Placeholder for your image */}
          <div style={{ 
            width: '300px', 
            height: '300px', 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Image {currentImageIndex + 1}
          </div>
          
          <Button
            colorVariant="monochrome"
            styleVariant="tertiary"
            leftContent={ChevronRightIcon}
            onClick={handleNextImage}
          />
        </HStack>
      </VStack>
      
      <HStack spacing={8} justify="center">
        <Button
          colorVariant="red"
          styleVariant="secondary"
          text="뒤로"
          onClick={onBack}
        />
        <Button
          colorVariant="blue"
          styleVariant="primary"
          text="보내기"
          onClick={handleSend}
        />
      </HStack>
    </VStack>
  );
}

export default SpeechPage;