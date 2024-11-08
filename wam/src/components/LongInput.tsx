import styled from 'styled-components'
import Text from './Text'
import { colors } from '@wam/utils/styles'

interface LongInputProps {
  title: string
  maxLength: number
  value: string
  onChange: (val: string) => void
}

export default function LongInput(props: LongInputProps) {
  const onInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = evt.currentTarget.value

    if (newInput.length > props.maxLength) return
    else props.onChange(newInput)
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
        onChange={onInput}
        maxLength={props.maxLength}
      />

      <div style={{ alignSelf: 'flex-end' }}>
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

const LongInputContainer = styled.textarea`
  width: 100%;
  height: 320px;

  background-color: transparent;
  border: 1px solid ${colors.lightgray};
  border-radius: 12px;

  box-sizing: border-box;
  padding: 12px;

  font-size: 24px;
  color: white;

  resize: none;
  font-family: Pretendard;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`
