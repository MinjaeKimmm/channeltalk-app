import { Task, User } from "@wam/pages/halil/type"

export const getUsers = async (): Promise<User[]> => {

  return [
    { id: "1", username: "김철수", url: "" },
    { id: "2", username: "이영희", url: "" }
  ]
}

export const getTasks = async (userid: string): Promise<Task[]> => {
  return tasklists[userid]
}

export const deleteTask = async (taskid: string): Promise<boolean> => {
  console.log(`delete ${taskid}`)
  return true
}

export const completeTask = async (taskid: string): Promise<boolean> => {
  console.log(`complete ${taskid}`)
  return true
}

export const addTask = async (task: Task): Promise<boolean> => {
  console.log(`add ${task}`)
  return true
}




// mock data

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
      id: '1',
      title: '보고서 작성',
      deadline: new Date('2024-11-10T14:00:00').toISOString(),
      assignee: { id: "2", username: '김철수', url: '' },
      completed: false,
    },
    {
      id: '2',
      title: '회의 준비',
      deadline: new Date('2024-11-11T10:00:00').toISOString(),
      assignee: { id: "2", username: '김철수', url: '' },
      completed: false,
    },
  ],
}

