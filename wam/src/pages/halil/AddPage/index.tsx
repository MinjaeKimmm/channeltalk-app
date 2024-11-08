import { useEffect, useState } from 'react'

import { useSize } from '@wam/hooks/useSize'
import { Task, User } from '../type'
import Layout from '@wam/components/Layout'
import Header from '@wam/components/Header'
import ShortInput from '@wam/components/ShortInput'
import TaskManager from '@wam/components/TaskManager'
import Button from '@wam/components/Button'

interface AddPageProps {
  user: User | undefined
  onAdd: (task: Task) => void
  onCancel: () => void
}

function AddPage({ user, onAdd, onCancel }: AddPageProps) {
  useSize({ width: 490, height: 760 })
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')

  useEffect(() => {
    console.log('this is morepage')
  }, [])

  if (!user) return

  const handleSubmit = () => {
    if (title && deadline) {
      onAdd({
        id: '',
        title,
        deadline: deadline,
        assignee: user,
        completed: false,
      })
    }
  }

  return (
    <Layout>
      <Header
        label="할 일 생성"
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
          value={title}
          onChange={(val) => setTitle(val)}
          maxLength={30}
          disabled={false}
        />
        <ShortInput
          title="할 일 기한"
          value={new Date().toISOString()}
          onChange={(val) => setDeadline(val)}
          maxLength={30}
          disabled={true}
        />
        <TaskManager
          username={user.username}
          url={user.url}
        />
      </div>
      <Button
        label="추가하기"
        onClick={title && deadline ? handleSubmit : () => {}}
      />
    </Layout>
  )
}

export default AddPage
