import { VStack, Button, Text } from '@channel.io/bezier-react';
import { useSize } from '@wam/hooks/useSize';

interface ChooseOptionProps {
  onNavigate: (page: 'choose' | 'send' | 'hello') => void;
}

function ChooseOption({ onNavigate }: ChooseOptionProps) {
  useSize({ width: 390, height: 180 });

  return (
    <VStack spacing={16}>
      <Text color="txt-black-darkest" typo="24" bold>
        Choose an Option
      </Text>
      <Button
        colorVariant="blue"
        text="Go to Send Page"
        onClick={() => onNavigate('send')}
      />
      <Button
        colorVariant="blue"
        text="Go to Hello Page"
        onClick={() => onNavigate('hello')}
      />
    </VStack>
  );
}

export default ChooseOption;
