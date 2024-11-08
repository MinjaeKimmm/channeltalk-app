import { colors } from '@wam/utils/styles'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styled from 'styled-components'

interface IconButtonProps {
  type: 'left' | 'right'
  onClick: () => void
}

export default function IconButton(props: IconButtonProps) {
  return (
    <IconButtonWrapper onClick={props.onClick}>
      {props.type === 'left' ? (
        <ChevronLeft
          size={28}
          color={colors.lightgray}
        />
      ) : (
        <ChevronRight
          size={28}
          color={colors.lightgray}
        />
      )}
    </IconButtonWrapper>
  )
}

const IconButtonWrapper = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  background-color: ${colors.black};

  &:active {
    background-color: ${colors.darkgray};
  }
  cursor: pointer;
`
