import { formatRelativeTime } from '../../lib/formatters'

interface StatusBarProps {
  updatedAt: number
  contentLength: number
  onDelete: () => void
}

export function StatusBar({ updatedAt, contentLength, onDelete }: StatusBarProps) {
  return (
    <div className="status-bar">
      <span>最后修改：{formatRelativeTime(updatedAt)}</span>
      <span>
        <span className="word-count">{contentLength} 字</span>
        <button className="btn btn-sm" onClick={onDelete}>
          删除笔记
        </button>
      </span>
    </div>
  )
}
