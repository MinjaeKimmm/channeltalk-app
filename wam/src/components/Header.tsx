import styled from 'styled-components'
import Text from './Text'

interface HeaderProps {
  label: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function Header(props: HeaderProps) {
  return (
    <HeaderWrapper>
      <Text
        type="Title"
        label={props.label}
        color="white"
      />
      <Text
        type="Caption"
        label={props.action?.label ?? ''}
        color="lightgray"
        onClick={props.action?.onClick}
      />
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
