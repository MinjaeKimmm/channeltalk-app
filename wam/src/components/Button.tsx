import { colors } from '@wam/utils/styles'
import Text from './Text'
import styled, { keyframes } from 'styled-components'
import { useState } from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
}

const growAnimation = keyframes`
  from {
    width: 0px;
    height: 0px;
  }
  to {
    width: 500px;
    height: 500px;
  }
`

const colorAnimation = keyframes`
  from {
    width: 500px;
    height: 500px;
  }
  to {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
`

export default function Button(props: ButtonProps) {
  const [click, setClick] = useState<boolean>()

  const onPointerDown = () => setClick(true)
  const onPointerLeave = () =>
    setClick((prev) => {
      if (prev === undefined) return
      else return false
    })

  return (
    <ButtonWrapper
      onClick={props.onClick}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
    >
      <AnimatedDiv click={click} />
      <Text
        type="Body"
        label={props.label}
        color="white"
      />
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  width: 100%;
  height: 84px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  background-color: ${colors.darkgray};
  border-radius: 12px;
  cursor: pointer;

  overflow: hidden;
  z-index: 1;
`

const AnimatedDiv = styled.div<{ click: boolean | undefined }>`
  width: 0px;
  height: 0px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: ${colors.highlight};

  animation: ${(props) =>
      props.click === true
        ? growAnimation
        : props.click === false
          ? colorAnimation
          : undefined}
    1s ease forwards;

  border-radius: 1000px;
  z-index: -1;
`
