import DoubleButton from '@wam/components/DoubleButton'
import Header from '@wam/components/Header'
import Layout from '@wam/components/Layout'
import ShortInput from '@wam/components/ShortInput'
import TaskManager from '@wam/components/TaskManager'
import { useSize } from '@wam/hooks/useSize'
import { useEffect } from 'react'
import { Task } from '../type'

interface MorePageProps {
  task: Task
  onDelete: (taskId: string) => void
  onComplete: (taskId: string) => void
  onCancel: () => void
}

function MorePage({ task, onDelete, onComplete, onCancel }: MorePageProps) {
  useSize({ width: 490, height: 760 })

  useEffect(() => {
    console.log('this is morepage')
  }, [])

  return (
    <Layout>
      <Header
        label="할 일"
        action={{ label: '뒤로가기', onClick: onCancel }}
      />

      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          padding: '54px 0px',
        }}
      >
        <ShortInput
          title="할 일 제목"
          value={task.title}
          maxLength={0}
          onChange={() => {}}
          disabled={true}
        />

        <ShortInput
          title="할 일 기한"
          value={task.deadline.toLocaleString()}
          maxLength={0}
          onChange={() => {}}
          disabled={true}
        />
        <TaskManager
          username={task.assignee.username}
          url={task.assignee.url}
        />
      </div>

      <DoubleButton
        labelLeft="삭제하기"
        onClickLeft={() => onDelete(task.id)}
        labelRight="완료하기"
        onClickRight={() => onComplete(task.id)}
      />
    </Layout>
  )
}

export default MorePage
