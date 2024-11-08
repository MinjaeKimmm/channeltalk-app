import styled from 'styled-components'
import Text from './Text'
import { colors } from '@wam/utils/styles'

interface TaskManagerProps {
  username: string
  url: string
}

export default function TaskManager(props: TaskManagerProps) {
  return (
    <TaskManagerWrapper>
      <Text
        type="Subtitle"
        label="할 일 담당자"
        color="lightgray"
      />
      <ManagerWrapper>
        <Text
          type="Subtitle"
          label={props.username}
          color="white"
        />
        <ManagerImg src={props.url} />
      </ManagerWrapper>
    </TaskManagerWrapper>
  )
}

const TaskManagerWrapper = styled.div`
  width: 100%;
  height: 85px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${colors.lightgray};
`

const ManagerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 16px;
`

const ManagerImg = styled.img`
  width: 54px;
  height: 54px;

  object-fit: cover;
`
