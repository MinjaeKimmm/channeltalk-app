import { colors } from '@wam/utils/styles'
import Text from './Text'
import styled from 'styled-components'

interface DoubleButtonProps {
  labelLeft: string
  labelRight: string
  onClickLeft: () => void
  onClickRight: () => void
}

export default function DoubleButton(props: DoubleButtonProps) {
  return (
    <DoubleButtonWrapper>
      <SubButtonWrapper onClick={props.onClickLeft}>
        <Text
          type="Body"
          label={props.labelLeft}
          color={colors.white}
        />
      </SubButtonWrapper>
      <div
        style={{
          width: '1px',
          height: '80px',
          backgroundColor: colors.lightgray,
        }}
      />
      <SubButtonWrapper onClick={props.onClickRight}>
        <Text
          type="Body"
          label={props.labelRight}
          color={colors.highlight}
        />
      </SubButtonWrapper>
    </DoubleButtonWrapper>
  )
}

const DoubleButtonWrapper = styled.div`
  width: 100%;
  height: 84px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.darkgray};
`

const SubButtonWrapper = styled.div`
  flex: 1;

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`
