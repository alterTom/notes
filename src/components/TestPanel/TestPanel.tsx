import type { TestSuite } from '../../lib/test-runner'

interface TestPanelProps {
  suite: TestSuite | null
  onClose: () => void
}

export function TestPanel({ suite, onClose }: TestPanelProps) {
  if (!suite) return null

  const allPass = suite.failed === 0

  return (
    <div
      id="test-overlay"
      className="visible"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="test-panel">
        <div className="test-header">
          <h2>测试结果</h2>
          <button className="btn btn-icon" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={`test-summary ${allPass ? 'all-pass' : 'has-fail'}`}>
          {allPass ? '全部通过 ' : ''}
          {suite.passed}/{suite.total} 通过
          {suite.failed > 0 ? `，${suite.failed} 失败` : ''}
        </div>
        <div className="test-results">
          {suite.results.map((result, i) => (
            <div className="test-result" key={i}>
              <span className={`test-icon ${result.pass ? 'pass' : 'fail'}`}>
                {result.pass ? '✓' : '✗'}
              </span>
              <div>
                <span className="test-name">{i + 1}. {result.name}</span>
                {result.error && (
                  <div className="test-error">{result.error}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
