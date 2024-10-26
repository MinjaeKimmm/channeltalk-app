import { VStack, Button, Text } from '@channel.io/bezier-react';
import { useSize } from '../../../hooks/useSize';

interface HelloProps {
  onNavigate: (page: 'choose' | 'send' | 'hello') => void;
}

function Hello({ onNavigate }: HelloProps) {
  useSize({ width: 390, height: 180 });

  return (
    <VStack spacing={16}>
      <Text typo="24" bold>Hello from the Tutorial WAM!</Text>
      <Button
        colorVariant="blue"
        text="Back to Choose Option"
        onClick={() => onNavigate('choose')}
      />
    </VStack>
  );
}

export default Hello;
