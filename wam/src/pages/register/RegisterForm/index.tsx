import { useCallback, useState } from 'react';
import { VStack, Button, Text, HStack, TextField } from '@channel.io/bezier-react';
import { useSize } from '../../../hooks/useSize';

interface RegisterFormProps {
  onComplete: (username: string) => void;
  onCancel: () => void;
}

function RegisterForm({ onComplete, onCancel }: RegisterFormProps) {
    useSize({ width: 400, height: 300 });
    const [username, setUsername] = useState('');

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        if (username.trim()) {
            onComplete(username);
        }
    }, [username, onComplete]);

    return (
        <VStack spacing={16}>
            <Text typo="24" bold color="txt-black-darkest">
                Register
            </Text>
            <TextField
                value={username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                autoFocus
                allowClear
            />
            <HStack justify="center" spacing={8}>
                <Button
                    colorVariant="blue"
                    styleVariant="primary"
                    text="Submit"
                    onClick={handleSubmit}
                />
                <Button
                    colorVariant="red"
                    styleVariant="secondary"
                    text="Cancel"
                    onClick={onCancel}
                />
            </HStack>
        </VStack>
    );
}

export default RegisterForm;