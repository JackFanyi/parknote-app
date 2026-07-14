import { useState } from 'react'
import { useRecords } from '../hooks/useRecords'
import { useFeeCalculation } from '../hooks/useFeeCalculation'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { formatDuration } from '../utils/feeCalculator'

interface RecordDetailProps {
  id: string
  onBack: () => void
}

export default function RecordDetail({ id, onBack }: RecordDetailProps) {
  const { records, updateRecord, deleteRecord } = useRecords()
  const record = records.find(r => r.id === id)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [editNotes, setEditNotes] = useState('')

  if (!record) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">记录不存在</p>
          <button onClick={onBack} className="mt-4 text-primary">返回</button>
        </div>
      </div>
    )
  }

  const isActive = !record.endTime
  const currentFee = useFeeCalculation(record.startTime, record.fee, record.endTime)

  const handleEndParking = () => {
    if (confirm('确定结束停车吗？')) {
      updateRecord(id, { endTime: new Date() })
    }
  }

  const handleSaveNotes = () => {
    updateRecord(id, { notes: editNotes || undefined })
    setIsEditingNotes(false)
  }

  const handleDelete = () => {
    if (confirm('确定删除这条记录吗？')) {
      deleteRecord(id)
      onBack()
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <header className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <button onClick={onBack} className="text-2xl">←</button>
        <h1 className="text-lg font-semibold text-gray-800">停车详情</h1>
        <div className="w-8" />
      </header>

      <main className="p-4 space-y-6">
        <div className={`p-4 rounded-lg ${isActive ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{record.location}</h2>
              {isActive && (
                <span className="inline-block mt-2 px-3 py-1 bg-primary text-white text-sm rounded-full">
                  进行中
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                ¥ {currentFee.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-500">开始时间</span>
            <span className="text-gray-800">
              {format(record.startTime, 'yyyy-MM-dd HH:mm', { locale: zhCN })}
            </span>
          </div>
          {record.endTime && (
            <>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">结束时间</span>
                <span className="text-gray-800">
                  {format(record.endTime, 'yyyy-MM-dd HH:mm', { locale: zhCN })}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500">停车时长</span>
                <span className="text-gray-800">
                  {formatDuration(record.startTime, record.endTime)}
                </span>
              </div>
            </>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">收费标准</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>首小时</span>
              <span>¥ {record.fee.firstHour.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>每小时</span>
              <span>¥ {record.fee.perHour.toFixed(2)}</span>
            </div>
            {record.fee.maxFee !== undefined && (
              <div className="flex justify-between text-sm mt-2">
                <span>最高限价</span>
                <span>¥ {record.fee.maxFee.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-500">备注</h3>
            {!isEditingNotes && (
              <button
                onClick={() => {
                  setEditNotes(record.notes || '')
                  setIsEditingNotes(true)
                }}
                className="text-primary text-sm"
              >
                编辑
              </button>
            )}
          </div>
          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="添加备注..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="flex-1 py-2 bg-primary text-white rounded-lg"
                >
                  保存
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
              {record.notes || '暂无备注'}
            </p>
          )}
        </div>

        {record.photos.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">照片</h3>
            <div className="grid grid-cols-3 gap-2">
              {record.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`照片 ${i + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4">
          {isActive && (
            <button
              onClick={handleEndParking}
              className="w-full py-4 bg-success text-white rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
            >
              ✓ 结束停车
            </button>
          )}
          <button
            onClick={handleDelete}
            className="w-full py-4 border border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-colors"
          >
            删除记录
          </button>
        </div>
      </main>
    </div>
  )
}
