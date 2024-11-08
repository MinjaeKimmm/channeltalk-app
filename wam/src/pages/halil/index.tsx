/* eslint-disable @typescript-eslint/no-unused-vars */
// index.tsx
import { useEffect, useState } from 'react'
import ViewPage from './ViewPage'
import AddPage from './AddPage'
import MorePage from './MorePage'
import { addTask, completeTask, deleteTask, getUsers } from '@wam/utils/api'
import { Task, User } from './type'

type HalilPage = 'view' | 'add' | 'more'

function Halil() {
  const [currentPage, setCurrentPage] = useState<HalilPage>('view')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const [users, setUsers] = useState<User[]>()
  const [userIndex, setuserIndex] = useState(0)

  useEffect(() => {
    const asyncWrapper = async () => {
      // call all users at first
      setUsers(await getUsers())
    }
    asyncWrapper()
  }, [])

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setCurrentPage('more')
  }

  const handlePersonClick = () => {
    if (!users) return
    setuserIndex((prev) => (prev + 1) % users.length)
  }

  const handleAddTask = async (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    }

    await addTask(newTask)

    setCurrentPage('view')
  }

  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId)
    setCurrentPage('view')
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
    setCurrentPage('view')
  }

  return (
    <>
      {currentPage === 'view' && (
        <ViewPage
          user={users ? users[userIndex] : undefined}
          onTaskClick={handleTaskClick}
          onPersonClick={handlePersonClick}
          onAddClick={() => setCurrentPage('add')}
        />
      )}
      {currentPage === 'add' && (
        <AddPage
          user={users ? users[userIndex] : undefined}
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
  )
}

export default Halil
