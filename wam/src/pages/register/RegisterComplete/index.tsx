import { VStack, Button, Text } from '@channel.io/bezier-react';
import { useSize } from '../../../hooks/useSize';

interface RegisterCompleteProps {
  onRestart: () => void;
}

function RegisterComplete({ onRestart }: RegisterCompleteProps) {
  useSize({ width: 300, height: 200 });

  return (
    <VStack spacing={16}>
      <Text typo="24" bold color="txt-black-darkest">
        Registration Complete!
      </Text>
      <Button
        colorVariant="green"
        styleVariant="primary"
        text="Register Again"
        onClick={onRestart}
      />
    </VStack>
  );
}

export default RegisterComplete;