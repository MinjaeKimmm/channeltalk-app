import { useSize } from '@wam/hooks/useSize'
import { Task, User } from '../type'
import { useEffect, useState } from 'react'
import { getTasks } from '@wam/utils/api'
import Layout from '@wam/components/Layout'
import Clock from '@wam/components/Clock'
import Header from '@wam/components/Header'
import TaskBox from '@wam/components/TaskBox'
import AddButton from '@wam/components/AddButton'
import Text from '@wam/components/Text'

interface ViewPageProps {
  user: User | undefined
  onTaskClick: (task: Task) => void
  onPersonClick: () => void
  onAddClick: () => void
}

function ViewPage({
  user,
  onTaskClick,
  onPersonClick,
  onAddClick,
}: ViewPageProps) {
  useSize({ width: 490, height: 760 })

  const [tasks, setTasks] = useState<Task[]>()

  useEffect(() => {
    const asyncWrapper = async () => {
      // call all users at first
      if (!user) return
      setTasks((await getTasks(user.id)).sort())
      console.log('this is viewpage')
    }
    asyncWrapper()
  }, [user])

  return (
    <Layout>
      <Header label="할 일" />
      {user && tasks && (
        <Clock
          onClick={onPersonClick}
          username={user.username}
          rate={Math.round(
            (100 * tasks.filter((task) => task.completed).length) / tasks.length
          )}
        />
      )}
      {user && tasks && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            boxSizing: 'border-box',
            padding: '10px 0px',
            flexDirection: 'row',
            alignItems: 'center',
            height: 'fit-content',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Text
              type="Supertitle"
              label={tasks.filter((task) => !task.completed).length.toString()}
              color="white"
            />
            <Text
              type="Caption"
              label="개의 할일"
              color="lightgray"
            />
          </div>

          <AddButton onClick={onAddClick} />
        </div>
      )}

      <div style={{ width: '100%', flex: 1, overflowY: 'scroll' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks &&
            tasks.map((task) => (
              <TaskBox
                onClick={() => onTaskClick(task)}
                id={task.id}
                date={task.deadline}
                title={task.title}
                userid={task.assignee.id}
              />
            ))}
        </div>
      </div>
    </Layout>
  )
}

// Helper function to calculate current time position on progress bar
// function getCurrentTimePosition(tasks: Task[]): number {
//   if (tasks.length < 2) return 0

//   const now = new Date()
//   const firstDate = tasks[0].deadline.getTime()
//   const lastDate = tasks[tasks.length - 1].deadline.getTime()
//   const totalDuration = lastDate - firstDate

//   if (totalDuration <= 0) return 0

//   const currentProgress = now.getTime() - firstDate
//   return Math.max(0, Math.min(100, (currentProgress / totalDuration) * 100))
// }

export default ViewPage
