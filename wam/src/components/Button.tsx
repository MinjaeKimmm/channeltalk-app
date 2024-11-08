interface ButtonProps {
  label: string
  onClick: () => void
}

export default function Button(props: ButtonProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.label}
    </div>
  )
}
