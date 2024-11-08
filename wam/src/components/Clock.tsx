import styled from 'styled-components'
import Text from './Text'
import { colors } from '@wam/utils/styles'

interface ClockProps {
  onClick: () => void
  username: string
  rate: number
}

export default function Clock(props: ClockProps) {
  return (
    <ClockWrapper onClick={props.onClick}>
      <ClockCore>
        <Text
          type="Subtitle"
          label={props.username}
          color="lightgray"
        />
        <Text
          type="Title"
          label={props.rate.toString() + '%'}
          color="white"
        />
      </ClockCore>
    </ClockWrapper>
  )
}

const ClockWrapper = styled.div`
  width: 390px;
  height: 390px;

  position: relative;

  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;

  background-color: white;
  border-radius: 500px;
`

const ClockCore = styled.div`
  width: 244px;
  height: 244px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${colors.darkgray};
  border-radius: 500px;
`
