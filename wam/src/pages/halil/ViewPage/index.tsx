import { VStack, Button, Text, HStack } from '@channel.io/bezier-react'
import { PlusIcon } from '@channel.io/bezier-icons'
import { useSize } from '@wam/hooks/useSize'
import * as Styled from './ViewPage.styled'
import { Task, User } from '../type'
import { useEffect, useState } from 'react'
import { getTasks } from '@wam/utils/api'

interface ViewPageProps {
  user: User | undefined
  onTaskClick: (task: Task) => void
  onPersonClick: () => void
  onAddClick: () => void
  onClose: () => void
}

function ViewPage({
  user,
  onTaskClick,
  onPersonClick,
  onAddClick,
  onClose,
}: ViewPageProps) {
  useSize({ width: 490, height: 760 })

  const [tasks, setTasks] = useState<Task[]>()

  useEffect(() => {
    const asyncWrapper = async () => {
      // call all users at first
      if (!user) return
      setTasks(await getTasks(user.id))
    }
    asyncWrapper()
  }, [])

  if (!tasks || !user) return

  // Sort tasks by deadline
  const sortedTasks = tasks.sort(
    (a, b) => a.deadline.getTime() - b.deadline.getTime()
  )

  return (
    <VStack spacing={24}>
      <HStack
        justify="between"
        align="center"
      >
        <Text
          typo="24"
          bold
          color="txt-black-darkest"
        >
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
        <Text
          typo="18"
          bold
        >
          {user.username}
        </Text>
      </Styled.ProgressContainer>

      {/* Task List */}
      <Styled.TaskList>
        {sortedTasks.map((task) => (
          <div onClick={() => onTaskClick(task)}>{task.title}</div>
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
