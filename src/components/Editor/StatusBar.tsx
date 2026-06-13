import { formatRelativeTime } from '../../lib/formatters'

interface StatusBarProps {
  updatedAt: number
  contentLength: number
  saveState: 'idle' | 'saving' | 'saved' | 'error'
  onSave: () => void
  onDelete: () => void
}

const saveLabels = {
  idle: '保存笔记',
  saving: '保存中...',
  saved: '已保存',
  error: '保存失败'
}

export function StatusBar({ updatedAt, contentLength, saveState, onSave, onDelete }: StatusBarProps) {
  return (
    <div className="status-bar">
      <span>最后修改：{formatRelativeTime(updatedAt)}</span>
      <span className="status-actions">
        <span className="word-count">{contentLength} 字</span>
        <button
          className={`btn btn-sm btn-save ${saveState}`}
          onClick={onSave}
          disabled={saveState === 'saving'}
          title="保存到 MySQL"
        >
          {saveLabels[saveState]}
        </button>
        <button className="btn btn-sm" onClick={onDelete}>
          删除笔记
        </button>
      </span>
    </div>
  )
}
