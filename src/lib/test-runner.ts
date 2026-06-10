// Embedded test framework mirroring the original app's in-app test runner.
// Used both in the renderer (via TestPanel) and in Vitest (for validation).

export interface TestCase {
  name: string
  fn: () => void
}

export interface TestResult {
  name: string
  pass: boolean
  error?: string
}

export interface TestSuite {
  results: TestResult[]
  passed: number
  failed: number
  total: number
}

const testCases: TestCase[] = []

export function test(name: string, fn: () => void): void {
  testCases.push({ name, fn })
}

export function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) throw new Error(msg || '断言失败')
}

export function getTestCases(): TestCase[] {
  return testCases
}

export function clearTestCases(): void {
  testCases.length = 0
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function runAllTests(
  saveState: () => unknown,
  restoreState: (saved: unknown) => void
): TestSuite {
  const saved = saveState()

  const results: TestResult[] = []
  let passed = 0
  let failed = 0

  for (const tc of testCases) {
    try {
      tc.fn()
      results.push({ name: tc.name, pass: true })
      passed++
    } catch (e) {
      results.push({
        name: tc.name,
        pass: false,
        error: e instanceof Error ? e.message : String(e)
      })
      failed++
    }
  }

  restoreState(saved)

  return {
    results,
    passed,
    failed,
    total: testCases.length
  }
}
