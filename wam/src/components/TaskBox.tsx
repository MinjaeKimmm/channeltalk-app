import { colors } from '@wam/utils/styles'
import styled from 'styled-components'
import Text from './Text'
import { formatDigit, getDateInfo, isImpend } from '@wam/utils/utils'
// import { getDateInfo } from '@wam/utils/utils'

interface TaskBoxProps {
  id: string
  date: string //isostring
  title: string
  userid: string
  onClick: () => void
}

const monthName = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function TaskBox(props: TaskBoxProps) {
  const date = getDateInfo(props.date)
  const impend = isImpend(props.date)

  return (
    <TaskBoxWrapper onClick={props.onClick}>
      <DateWrapper>
        <Text
          type="Subtitle"
          label={date.day.toString()}
          color="white"
        />
        <Text
          type="Caption"
          label={monthName[date.month - 1]}
          color="white"
        />
      </DateWrapper>
      <TitleWrapper>
        <Text
          type="Caption"
          label={
            date.weekday.toString() +
            ' ' +
            `${formatDigit(date.hours)}:${formatDigit(date.hours)}`
          }
          color={impend ? 'highlight' : 'white'}
        />
        <Text
          type="Body"
          label={props.title}
          color={impend ? 'highlight' : 'white'}
        />
      </TitleWrapper>
    </TaskBoxWrapper>
  )
}

const TaskBoxWrapper = styled.div`
  width: 100%;
  height: 110px;

  box-sizing: border-box;
  padding: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  border-radius: 12px;
  background-color: ${colors.darkgray};
`

const DateWrapper = styled.div`
  width: 70px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  background-color: ${colors.black};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`
