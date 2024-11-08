export interface TextProps {
  label: string
  type: TextType
}
export type TextType = 'Title' | 'Subtitle' | 'Body' | 'Caption'

const fontStyle = {
  Title: {
    weight: 600,
    size: 32,
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
        fontWeight: fontStyle[props.type].weight,
        fontSize: `${fontStyle[props.type].size}`,
      }}
    >
      {props.label}
    </div>
  )
}
