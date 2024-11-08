import { useState } from 'react';
import { VStack, Button, Text, TextField, HStack } from '@channel.io/bezier-react';
import { useSize } from '@wam/hooks/useSize';

interface AddPageProps {
    onAdd: (task: { title: string; deadline: Date; assignee: string }) => void;
    onCancel: () => void;
    availableAssignees: string[];
}

function AddPage({ onAdd, onCancel }: AddPageProps) {
    useSize({ width: 491, height: 757 });
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignee, setAssignee] = useState('');

    const handleSubmit = () => {
        if (title && deadline && assignee) {
            onAdd({
                title,
                deadline: new Date(deadline),
                assignee
            });
        }
    };

    return (
        <VStack spacing={24}>
            <Text typo="24" bold color="txt-black-darkest">
                할 일 생성
            </Text>

            <Text typo="16" bold color="txt-black-darkest">
                할 일 제목
            </Text>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Text typo="16" bold color="txt-black-darkest">
                할 일 기한
            </Text>
            <TextField
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />

            <Text typo="16" bold color="txt-black-darkest">
                할 일 담당자
            </Text>
            <TextField
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
            />

            <HStack spacing={8} justify="center" style={{ marginTop: 'auto' }}>
                <Button
                    colorVariant="red"
                    styleVariant="secondary"
                    text="취소"
                    onClick={onCancel}
                />
                <Button
                    colorVariant="blue"
                    styleVariant="primary"
                    text="추가"
                    onClick={handleSubmit}
                    disabled={!title || !deadline || !assignee}
                />
            </HStack>
        </VStack>
    );
}

export default AddPage