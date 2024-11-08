import { colors } from '@wam/utils/styles'
import { Plus } from 'lucide-react'
import styled from 'styled-components'

export default function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <AddButtonWrapper onClick={onClick}>
      <Plus
        size={36}
        color={colors.lightgray}
      />
    </AddButtonWrapper>
  )
}

const AddButtonWrapper = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.darkgray};
  border-radius: 1000px;
  cursor: pointer;
`
