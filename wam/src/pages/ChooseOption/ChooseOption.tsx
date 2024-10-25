import { VStack, Button, Text } from '@channel.io/bezier-react';

import { useSize } from '../../hooks/useSize';


interface ChooseOptionProps {
  onNavigate: (page: 'choose' | 'send') => void;
}

function ChooseOption({ onNavigate }: ChooseOptionProps) {
    useSize({ width: 390, height: 150 });

    return (
        <VStack spacing={16}>
        <Text color="txt-black-darkest" typo="24" bold>
            Choose an Option
        </Text>
        <Button
            colorVariant="blue"
            styleVariant="primary"
            text="Go to Send Component"
            onClick={() => onNavigate('send')}
        />
        </VStack>
    );
}

export default ChooseOption;