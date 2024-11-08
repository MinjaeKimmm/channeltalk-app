// index.tsx
import { useState } from 'react';
import ViewPage from './ViewPage';
import AddPage from './AddPage';
import MorePage from './MorePage';

type HalilPage = 'view' | 'add' | 'more';

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

interface HalilProps {
    onClose: () => void;
}

function Halil({ onClose }: HalilProps) {
    const [currentPage, setCurrentPage] = useState<HalilPage>('view');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
    
    // 에시
    const [people, setPeople] = useState<Person[]>([
        {
            name: "김철수",
            tasks: [
                {
                    id: "1",
                    title: "보고서 작성",
                    deadline: new Date("2024-11-10T14:00:00"),
                    assignee: "김철수",
                    completed: false
                },
                {
                    id: "2",
                    title: "회의 준비",
                    deadline: new Date("2024-11-11T10:00:00"),
                    assignee: "김철수",
                    completed: false
                }
            ]
        },
        {
            name: "이영희",
            tasks: [
                {
                    id: "3",
                    title: "프레젠테이션 준비",
                    deadline: new Date("2024-11-09T15:00:00"),
                    assignee: "이영희",
                    completed: true
                }
            ]
        }
    ]);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setCurrentPage('more');
    };

    const handlePersonClick = () => {
        setCurrentPersonIndex((prev) => 
            (prev + 1) % people.length
        );
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'completed'>) => {
        const newTask = {
            ...task,
            id: Date.now().toString(),
            completed: false
        };
        
        setPeople(prev => prev.map(person => 
            person.name === task.assignee
                ? { ...person, tasks: [...person.tasks, newTask] }
                : person
        ));
        setCurrentPage('view');
    };

    const handleCompleteTask = (taskId: string) => {
        setPeople(prev => prev.map(person => ({
            ...person,
            tasks: person.tasks.map(task => 
                task.id === taskId 
                    ? { ...task, completed: true }
                    : task
            )
        })));
        setCurrentPage('view');
    };

    const handleDeleteTask = (taskId: string) => {
        setPeople(prev => prev.map(person => ({
            ...person,
            tasks: person.tasks.filter(task => task.id !== taskId)
        })));
        setCurrentPage('view');
    };

    const getCurrentTask = (tasks: Task[]) => {
        const now = new Date();
        return tasks.find(task => 
            !task.completed && task.deadline > now
        ) || tasks[0];
    };

    const getCompletionPercentage = (tasks: Task[]) => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.completed);
        return Math.round((completedTasks.length / tasks.length) * 100);
    };

    return (
        <>
            {currentPage === 'view' && (
                <ViewPage
                    person={people[currentPersonIndex]}
                    currentTask={getCurrentTask(people[currentPersonIndex].tasks)}
                    completionPercentage={getCompletionPercentage(people[currentPersonIndex].tasks)}
                    onTaskClick={handleTaskClick}
                    onPersonClick={handlePersonClick}
                    onAddClick={() => setCurrentPage('add')}
                    onClose={onClose}
                />
            )}
            {currentPage === 'add' && (
                <AddPage
                    availableAssignees={people.map(p => p.name)}
                    onAdd={handleAddTask}
                    onCancel={() => setCurrentPage('view')}
                />
            )}
            {currentPage === 'more' && selectedTask && (
                <MorePage
                    task={selectedTask}
                    onComplete={handleCompleteTask}
                    onDelete={handleDeleteTask}
                    onCancel={() => setCurrentPage('view')}
                />
            )}
        </>
    );
}

export default Halil;