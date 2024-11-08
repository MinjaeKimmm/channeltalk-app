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
      <ClockBallWrapper angle={(360 * props.rate) / 100}>
        <ClockBall />
      </ClockBallWrapper>
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
  cursor: pointer;
`
const ClockBallWrapper = styled.div<{ angle: number }>`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 0px 12px;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%)
    ${(props) => `rotate(${props.angle - 90}deg)`};

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  transition: all ease 2s;
`

const ClockBall = styled.div`
  width: 54px;
  height: 54px;

  border-radius: 10000px;

  background-color: ${colors.highlight};
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
