// src/components/RegisterForm.tsx
import { useCallback, useState, useEffect } from 'react';
import { VStack, Button, Text, HStack, TextField } from '@channel.io/bezier-react';
import { useSize } from '@wam/hooks/useSize';
import useApi from '@wam/hooks/useApi';

interface RegisterFormProps {
  onComplete: (username: string) => void;
  onCancel: () => void;
}

function RegisterForm({ onComplete, onCancel }: RegisterFormProps) {
  useSize({ width: 400, height: 300 });
  const [username, setUsername] = useState('');
  const { data, error, loading, request } = useApi<{ result: { message: string } }>();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (username.trim()) {
      request({
        url: '/users/createUser',
        method: 'POST',
        data: { name: username },
      });
    }
  }, [username, request]);

  useEffect(() => {
    if (data?.result?.message) {
      alert(data.result.message);
      onComplete(username);
    } else if (error) {
      alert(error);
    }
  }, [data, error, onComplete, username]);

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
          text={loading ? 'Submitting...' : 'Submit'}
          onClick={handleSubmit}
          disabled={loading}
        />
        <Button
          colorVariant="red"
          styleVariant="secondary"
          text="Cancel"
          onClick={onCancel}
        />
      </HStack>
      {error && <Text color="bgtxt-red-dark">{error}</Text>}
    </VStack>
  );
}

export default RegisterForm;
