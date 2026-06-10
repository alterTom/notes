interface TitleInputProps {
  value: string
  onChange: (value: string) => void
}

export function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <div className="editor-header">
      <input
        type="text"
        className="title-input"
        placeholder="无标题"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
