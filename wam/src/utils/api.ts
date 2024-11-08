import { Task, User } from "@wam/pages/halil/type";
import { callNativeFunction } from './wam';

// Mock task lists for initial testing
const tasklists: Record<string, Task[]> = {
  "1": [
    {
      id: '1',
      title: '보고서 작성',
      deadline: new Date('2024-11-10T14:00:00').toISOString(),
      assignee: { id: "1", username: '김철수', url: '' },
      completed: false,
    },
    {
      id: '2',
      title: '회의 준비',
      deadline: new Date('2024-11-11T10:00:00').toISOString(),
      assignee: { id: "1", username: '김철수', url: '' },
      completed: false,
    },
  ],
  "2": [
    {
      id: '3',
      title: '자료 조사',
      deadline: new Date('2024-11-15T09:00:00').toISOString(),
      assignee: { id: "2", username: '이영희', url: '' },
      completed: false,
    },
  ],
};

// Get users
export const getUsers = async (): Promise<User[]> => {
  return [
    { id: "1", username: "김철수", url: "" },
    { id: "2", username: "이영희", url: "" }
  ];
};

// Get tasks for a specific user
export const getTasks = async (userId: string): Promise<Task[]> => {
  return tasklists[userId] || [];
};

// Add a new task using callNativeFunction
export const addTask = async (task: Omit<Task, 'id' | 'completed'>): Promise<void> => {
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    completed: false,
  };

  // Push the task to the user's list in the mock data
  if (!tasklists[task.assignee.id]) {
    tasklists[task.assignee.id] = [];
  }
  tasklists[task.assignee.id].push(newTask);

  // Send data to backend
  await callNativeFunction('addTask', { task: newTask });
};

// Complete a task
export const completeTask = async (taskId: string): Promise<void> => {
  for (const userTasks of Object.values(tasklists)) {
    const task = userTasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = true;
      await callNativeFunction('completeTask', { taskId });
      break;
    }
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  for (const [userId, tasks] of Object.entries(tasklists)) {
    tasklists[userId] = tasks.filter((task) => task.id !== taskId);
  }
  await callNativeFunction('deleteTask', { taskId });
};
