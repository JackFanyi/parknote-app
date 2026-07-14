import { useState } from 'react'
import Home from './pages/Home'
import AddRecord from './pages/AddRecord'
import RecordDetail from './pages/RecordDetail'

type View = 'home' | 'add' | 'detail'

function App() {
  const [view, setView] = useState<View>('home')
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null)

  const goToHome = () => {
    setView('home')
    setSelectedRecordId(null)
  }

  const goToAdd = () => setView('add')

  const goToDetail = (id: string) => {
    setSelectedRecordId(id)
    setView('detail')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {view === 'home' && (
        <Home onAdd={goToAdd} onViewDetail={goToDetail} />
      )}
      {view === 'add' && (
        <AddRecord onBack={goToHome} />
      )}
      {view === 'detail' && selectedRecordId && (
        <RecordDetail id={selectedRecordId} onBack={goToHome} />
      )}
    </div>
  )
}

export default App
