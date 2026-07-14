import { ParkingRecord } from '../types'
import RecordCard from './RecordCard'

interface RecordListProps {
  records: ParkingRecord[]
  activeRecord?: ParkingRecord
  onViewDetail: (id: string) => void
}

export default function RecordList({ records, activeRecord, onViewDetail }: RecordListProps) {
  const historyRecords = records.filter(r => r.endTime)

  return (
    <div className="space-y-4">
      {activeRecord && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">正在停车</h2>
          <RecordCard record={activeRecord} onClick={() => onViewDetail(activeRecord.id)} />
        </div>
      )}

      {historyRecords.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">历史记录</h2>
          <div className="space-y-3">
            {historyRecords.map(record => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={() => onViewDetail(record.id)}
              />
            ))}
          </div>
        </div>
      )}

      {records.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🅿️</div>
          <h3 className="text-gray-600 font-medium">还没有停车记录</h3>
          <p className="text-gray-400 text-sm mt-2">点击下方按钮开始记录</p>
        </div>
      )}
    </div>
  )
}
