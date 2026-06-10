import { useSearch } from '../../hooks/useSearch'

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useSearch()

  return (
    <div className="search-wrap">
      <input
        type="text"
        className="search-input"
        placeholder="搜索笔记..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
