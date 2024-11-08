import { VStack, Button, Text, TextField, HStack } from '@channel.io/bezier-react';
import { useSize } from '@wam/hooks/useSize';

interface Task {
    id: string;
    title: string;
    deadline: Date;
    assignee: string;
    completed: boolean;
}

interface MorePageProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
    onCancel: () => void;
}

function MorePage({ task, onDelete, onComplete, onCancel }: MorePageProps) {
    useSize({ width: 491, height: 757 });

    return (
        <VStack spacing={24}>
            <Text typo="24" bold color="txt-black-darkest">
                할 일
            </Text>

            <Text typo="16" bold color="txt-black-darkest">
                할 일 제목
            </Text>
            <TextField
                value={task.title}
                readOnly
            />

            <Text typo="16" bold color="txt-black-darkest">
                할 일 기한
            </Text>
            <TextField
                value={task.deadline.toLocaleString()}
                readOnly
            />

            <Text typo="16" bold color="txt-black-darkest">
                할 일 담당자         
            </Text>
            <TextField
                value={task.assignee}
                readOnly
            />

            <HStack spacing={8} justify="center" style={{ marginTop: 'auto' }}>
                <Button
                    colorVariant="red"
                    styleVariant="secondary"
                    text="취소"
                    onClick={onCancel}
                />
                <Button
                    colorVariant="red"
                    styleVariant="secondary"
                    text="삭제"
                    onClick={() => onDelete(task.id)}
                />
                <Button
                    colorVariant="blue"
                    styleVariant="primary"
                    text="완료"
                    onClick={() => onComplete(task.id)}
                    disabled={task.completed}
                />
            </HStack>
        </VStack>
    );
}

export default MorePage;