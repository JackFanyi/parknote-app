import { ParkingRecord } from '../types'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { formatDuration } from '../utils/feeCalculator'
import { useFeeCalculation } from '../hooks/useFeeCalculation'

interface RecordCardProps {
  record: ParkingRecord
  onClick: () => void
}

export default function RecordCard({ record, onClick }: RecordCardProps) {
  const isActive = !record.endTime
  const currentFee = useFeeCalculation(record.startTime, record.fee, record.endTime)

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isActive 
          ? 'bg-blue-50 border-l-4 border-primary' 
          : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            {isActive && <span className="text-primary">🚗</span>}
            {record.location}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {format(record.startTime, 'yyyy-MM-dd HH:mm', { locale: zhCN })}
            {record.endTime && (
              <>
                {' - '}
                {format(record.endTime, 'HH:mm', { locale: zhCN })}
              </>
            )}
          </p>
          {record.endTime && (
            <p className="text-xs text-gray-400 mt-1">
              时长: {formatDuration(record.startTime, record.endTime)}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${isActive ? 'text-primary' : 'text-gray-800'}`}>
            ¥ {currentFee.toFixed(2)}
          </div>
          {isActive && (
            <span className="text-xs text-primary">进行中</span>
          )}
        </div>
      </div>
      {record.notes && (
        <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-100">
          💬 {record.notes}
        </p>
      )}
      {record.photos.length > 0 && (
        <div className="flex gap-2 mt-2 pt-2 border-t border-gray-100">
          {record.photos.slice(0, 3).map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`照片 ${i + 1}`}
              className="w-12 h-12 object-cover rounded"
            />
          ))}
          {record.photos.length > 3 && (
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
              +{record.photos.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
