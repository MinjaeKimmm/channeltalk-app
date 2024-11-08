import { colors } from '@wam/utils/styles'

export interface TextProps {
  label: string
  type: TextType
  color: keyof typeof colors
  onClick?: () => void
}
export type TextType =
  | 'Title'
  | 'Subtitle'
  | 'Body'
  | 'Caption'
  | 'Supertitle'
  | 'Powertitle'

const fontStyle = {
  Title: {
    weight: 600,
    size: 32,
  },
  Supertitle: {
    weight: 600,
    size: 45,
  },
  Powertitle: {
    weight: 600,
    size: 64,
  },
  Subtitle: {
    weight: 600,
    size: 18,
  },
  Body: {
    weight: 600,
    size: 24,
  },
  Caption: {
    weight: 600,
    size: 16,
  },
}

export default function Text(props: TextProps) {
  return (
    <div
      style={{
        height: 'fit-content',
        width: 'fit-content',
        color: colors[props.color],
        fontWeight: fontStyle[props.type].weight,
        fontSize: `${fontStyle[props.type].size}px`,
      }}
      onClick={props.onClick}
    >
      {props.label}
    </div>
  )
}
