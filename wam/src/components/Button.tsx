import { colors } from '@wam/utils/styles'
import Text from './Text'
import styled from 'styled-components'

interface ButtonProps {
  label: string
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <ButtonWrapper>
      <Text
        type="Body"
        label={props.label}
        color={colors.white}
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

  background-color: ${colors.darkgray};
`
