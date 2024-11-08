import styled from 'styled-components'
import Text from './Text'
import { colors } from '@wam/utils/styles'

interface LongInputProps {
  title: string
  maxLength: number
  value: string
  onValue: (val: string) => void
}

export default function LongInput(props: LongInputProps) {
  const onInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const newInput = evt.currentTarget.value

    if (newInput.length > props.maxLength) return
    else props.onValue(newInput)
  }

  return (
    <LongInputWrapper>
      <Text
        type="Subtitle"
        label={props.title}
        color="lightgray"
      />
      <LongInputContainer
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
    </LongInputWrapper>
  )
}

const LongInputWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
`

const LongInputContainer = styled.input`
  width: 100%;
  height: 320px;

  background-color: none;
  border: 1px solid ${colors.lightgray};
  border-radius: 12px;

  font-size: 24px;
  color: white;
`
