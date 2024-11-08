import { colors } from '@wam/utils/styles'
import styled from 'styled-components'
import Text from './Text'
import { getDateInfo, isImpend } from '@wam/utils/utils'
// import { getDateInfo } from '@wam/utils/utils'

interface TaskProps {
  id: string
  date: string //isostring
  title: string
  userid: string
}

export default function Task(props: TaskProps) {
  const date = getDateInfo(props.date)
  const impend = isImpend(props.date)

  return (
    <TaskWrapper>
      <DateWrapper>
        <Text
          type="Subtitle"
          label={date.day.toString()}
          color="white"
        />
        <Text
          type="Caption"
          label={date.month.toString()}
          color="white"
        />
      </DateWrapper>
      <TitleWrapper>
        <Text
          type="Caption"
          label={date.weekday.toString() + `${date.hours}:${date.minutes}`}
          color={impend ? 'highlight' : 'white'}
        />
        <Text
          type="Body"
          label={props.title}
          color={impend ? 'highlight' : 'white'}
        />
      </TitleWrapper>
    </TaskWrapper>
  )
}

const TaskWrapper = styled.div`
  width: 100%;
  height: 110px;

  box-sizing: border-box;
  padding: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  background-color: ${colors.darkgray};
`

const DateWrapper = styled.div`
  width: 70px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  background-color: ${colors.black};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
