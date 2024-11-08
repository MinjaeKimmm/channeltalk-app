import styled from 'styled-components'
import Text from './Text'
import { colors } from '@wam/utils/styles'

interface ShortInputProps {
  title: string
  maxLength: number
  value: string
  onValue: (val: string) => void
}

export default function ShortInput(props: ShortInputProps) {
  const onInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const newInput = evt.currentTarget.value

    if (newInput.length > props.maxLength) return
    else props.onValue(newInput)
  }

  return (
    <ShortInputWrapper>
      <Text
        type="Subtitle"
        label={props.title}
        color="lightgray"
      />
      <ShortInputContainer
        value={props.value}
        onInput={onInput}
        maxLength={props.maxLength}
      />

      <div style={{ justifySelf: 'flex-end' }}>
        <Text
          type="Caption"
          label={`${props.value.length}/${props.maxLength}`}
          color="lightgray"
        />
      </div>
    </ShortInputWrapper>
  )
}

const ShortInputWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`

const ShortInputContainer = styled.input`
  width: 100%;
  height: 50px;

  background-color: none;
  border-bottom: 1px solid ${colors.lightgray};
  border-radius: 12px;

  font-size: 28px;
  color: white;
`
