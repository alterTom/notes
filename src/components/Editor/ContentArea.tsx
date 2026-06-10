import { useState, useEffect } from 'react'

interface ContentAreaProps {
  value: string
  onChange: (value: string) => void
}

export function ContentArea({ value, onChange }: ContentAreaProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div className="editor-body">
      <textarea
        className="content-textarea"
        placeholder="开始输入..."
        value={localValue}
        onChange={handleChange}
      />
    </div>
  )
}
