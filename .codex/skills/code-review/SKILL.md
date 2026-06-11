---
name: code-review
description: Enforce code quality rules for this project: max 30 lines per function, max 500 lines per file, no console.log leftovers, and TypeScript prop types without any. Use when reviewing code, before committing, or on request to check code quality.
---

# Code Review

Review code in this project against the following rules. Report issues with file path, line number, and a clear description. Do not auto-fix; only report.

## Rules

### 1. Function length: 30 lines max

Every function body (including arrow functions assigned to variables) must not exceed 30 lines.

For `.tsx` / `.ts` files:
- Count lines between the opening `{` and closing `}` of the function body
- Exclude only blank lines and single-line comments; include multi-line comments
- For nested functions, count each nested function independently against the same limit
- For React components, the component function body counts; hooks inside do not exempt it

### 2. File length: 500 lines max

No source file (`.ts`, `.tsx`, `.js`, `.css`) in `src/` may exceed 500 lines.

- Count all lines (including blank and comment lines)
- Only scan files under `src/`; ignore `node_modules/`, `out/`, `outputs/`

### 3. No `console.log` leftovers

No source file may contain `console.log(`.

- Also flag `console.warn(`, `console.error(`, `console.info(`, `console.debug(`
- Check all `.ts`, `.tsx`, `.js` files under `src/` and `electron/`

### 4. Component props must have TypeScript type definitions, no `any`

Every React component defined with `function Xxx(...)` or `export function Xxx(...)` that accepts props must have an explicit TypeScript prop type.

- The prop type must be declared as `interface XxxProps { ... }` or `type XxxProps = { ... }`
- No prop field may use `any` — use specific types instead
- Report components that accept destructured props without a named type annotation

## Review workflow

1. Use `rg` (ripgrep) or `Select-String` to scan `src/` and `electron/` for violations
2. For function length: inspect each `.ts` / `.tsx` file, identify function boundaries, count lines
3. For file length: run `wc -l` or `Measure-Object -Line` on each source file
4. For `console.log`: search with `rg "console\.\(log|warn|error|info|debug)\(" src/ electron/`
5. For prop types: scan `.tsx` files for component functions lacking typed props
6. Group findings by rule, ordered by file path
