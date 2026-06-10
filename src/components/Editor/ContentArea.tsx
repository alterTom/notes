import { useState, useEffect, useRef } from 'react'
import { renderMarkdown, highlightMarkdown } from '../../lib/markdown'

interface ContentAreaProps {
  value: string
  onChange: (value: string) => void
  mode: 'edit' | 'preview'
}

export function ContentArea({ value, onChange, mode }: ContentAreaProps) {
  const [localValue, setLocalValue] = useState(value)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    onChange(e.target.value)
  }

  // Sync scroll between textarea and highlight overlay
  const handleScroll = () => {
    const ta = textareaRef.current
    const hl = ta?.previousElementSibling as HTMLElement | null
    if (ta && hl) {
      hl.scrollTop = ta.scrollTop
      hl.scrollLeft = ta.scrollLeft
    }
  }

  if (mode === 'preview') {
    const html = renderMarkdown(value || '')
    return (
      <div className="editor-body">
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    )
  }

  // Edit mode with syntax highlighting overlay
  const highlightedHtml = highlightMarkdown(localValue || '')

  return (
    <div className="editor-body">
      <div className="content-editor-wrap">
        <pre
          className="content-highlight"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlightedHtml + '\n' }}
        />
        <textarea
          ref={textareaRef}
          className="content-textarea"
          placeholder="开始输入..."
          value={localValue}
          onChange={handleChange}
          onScroll={handleScroll}
        />
      </div>
    </div>
  )
}
