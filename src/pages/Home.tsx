import { useRecords } from '../hooks/useRecords'
import RecordList from '../components/RecordList'
import SearchBar from '../components/SearchBar'

interface HomeProps {
  onAdd: () => void
  onViewDetail: (id: string) => void
}

export default function Home({ onAdd, onViewDetail }: HomeProps) {
  const { records, activeRecord, searchQuery, setSearchQuery } = useRecords()

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      <header className="bg-white px-4 py-6 border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">停车小助手</h1>
      </header>

      <main className="p-4 space-y-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <RecordList
          records={records}
          activeRecord={activeRecord}
          onViewDetail={onViewDetail}
        />
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-100">
        <div className="max-w-md mx-auto">
          {!activeRecord && (
            <button
              onClick={onAdd}
              className="w-full py-4 bg-primary text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-600 transition-colors"
            >
              + 开始停车
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
