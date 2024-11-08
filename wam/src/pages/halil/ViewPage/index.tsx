import { VStack, Button, Text, HStack } from '@channel.io/bezier-react';
import { PlusIcon } from '@channel.io/bezier-icons';
import { useSize } from '@wam/hooks/useSize';
import * as Styled from './ViewPage.styled';

interface Task {
    id: string;
    title: string;
    deadline: Date;
    assignee: string;
    completed: boolean;
}

interface Person {
    name: string;
    tasks: Task[];
}

interface ViewPageProps {
    person: Person;
    onTaskClick: (task: Task) => void;
    onPersonClick: () => void;
    onAddClick: () => void;
    onClose: () => void;
    currentTask: Task | undefined;
    completionPercentage: number;
}

function ViewPage({ 
    person, 
    onTaskClick, 
    onPersonClick, 
    onAddClick,
    onClose,
    currentTask,
    completionPercentage
}: ViewPageProps) {
    useSize({ width: 491, height: 757 });

    // Sort tasks by deadline
    const sortedTasks = [...person.tasks].sort((a, b) => 
        a.deadline.getTime() - b.deadline.getTime()
    );

    return (
        <VStack spacing={24}>
            <HStack justify="between" align="center">
                <Text typo="24" bold color="txt-black-darkest">
                    할 일
                </Text>
                <Button
                    colorVariant="monochrome"
                    styleVariant="tertiary"
                    text="닫기"
                    onClick={onClose}
                />
            </HStack>

            {/* Progress Component */}
            <Styled.ProgressContainer onClick={onPersonClick}>
                <Text typo="18" bold>{person.name}</Text>
                <Styled.ProgressWrapper>
                    <Styled.ProgressBar>
                        {sortedTasks.map((task) => (
                            <Styled.ProgressDot 
                                key={task.id}
                                active={currentTask?.id === task.id}
                                completed={task.completed}
                                style={{ left: `${(sortedTasks.indexOf(task) / Math.max(1, sortedTasks.length - 1)) * 100}%` }}
                            />
                        ))}
                    </Styled.ProgressBar>
                    <Styled.TimeIndicator 
                        left={`${getCurrentTimePosition(sortedTasks)}%`}
                    />
                </Styled.ProgressWrapper>
                <Styled.PercentageText percentage={completionPercentage}>
                    {completionPercentage}%
                </Styled.PercentageText>
            </Styled.ProgressContainer>

            {/* Task List */}
            <Styled.TaskList>
                {sortedTasks.map((task) => (
                    <Styled.TaskItem
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        active={currentTask?.id === task.id}
                        completed={task.completed}
                    >
                        <Styled.TaskHeader>
                            <Styled.DateTimeWrapper>
                                {task.deadline.toLocaleDateString()} {task.deadline.toLocaleTimeString()}
                            </Styled.DateTimeWrapper>
                        </Styled.TaskHeader>
                        <Styled.TaskTitle completed={task.completed}>
                            {task.title}
                        </Styled.TaskTitle>
                    </Styled.TaskItem>
                ))}
            </Styled.TaskList>

            {/* Add Button */}
            <Styled.AddButtonWrapper>
                <Button
                    colorVariant="blue"
                    styleVariant="primary"
                    leftContent={PlusIcon}
                    text="할 일 추가"
                    onClick={onAddClick}
                />
            </Styled.AddButtonWrapper>
        </VStack>
    );
}

// Helper function to calculate current time position on progress bar
function getCurrentTimePosition(tasks: Task[]): number {
    if (tasks.length < 2) return 0;
    
    const now = new Date();
    const firstDate = tasks[0].deadline.getTime();
    const lastDate = tasks[tasks.length - 1].deadline.getTime();
    const totalDuration = lastDate - firstDate;
    
    if (totalDuration <= 0) return 0;
    
    const currentProgress = now.getTime() - firstDate;
    return Math.max(0, Math.min(100, (currentProgress / totalDuration) * 100));
}

export default ViewPage;