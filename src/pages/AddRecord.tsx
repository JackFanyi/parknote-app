import RecordForm from '../components/RecordForm'
import { useRecords } from '../hooks/useRecords'
import { ParkingRecord } from '../types'

interface AddRecordProps {
  onBack: () => void
}

export default function AddRecord({ onBack }: AddRecordProps) {
  const { addRecord } = useRecords()

  const handleSubmit = (data: {
    location: string
    startTime: Date
    fee: { firstHour: number; perHour: number; maxFee?: number }
    notes?: string
    photos: string[]
  }) => {
    const record: ParkingRecord = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    addRecord(record)
    onBack()
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <header className="px-4 py-4 border-b border-gray-200 flex items-center gap-4">
        <button onClick={onBack} className="text-2xl">←</button>
        <h1 className="text-lg font-semibold text-gray-800">开始停车</h1>
      </header>
      <main className="p-4">
        <RecordForm onSubmit={handleSubmit} onCancel={onBack} />
      </main>
    </div>
  )
}
