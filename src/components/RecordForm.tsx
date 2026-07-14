import { useState } from 'react'
import PhotoCapture from './PhotoCapture'
import { Fee } from '../types'

interface RecordFormProps {
  onSubmit: (data: {
    location: string
    startTime: Date
    fee: Fee
    notes?: string
    photos: string[]
  }) => void
  onCancel: () => void
}

export default function RecordForm({ onSubmit, onCancel }: RecordFormProps) {
  const [location, setLocation] = useState('')
  const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 16))
  const [firstHour, setFirstHour] = useState('5')
  const [perHour, setPerHour] = useState('3')
  const [maxFee, setMaxFee] = useState('')
  const [notes, setNotes] = useState('')
  const [photos, setPhotos] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!location.trim()) return

    onSubmit({
      location: location.trim(),
      startTime: new Date(startTime),
      fee: {
        firstHour: parseFloat(firstHour) || 0,
        perHour: parseFloat(perHour) || 0,
        maxFee: maxFee ? parseFloat(maxFee) : undefined,
      },
      notes: notes.trim() || undefined,
      photos,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          停车场名称 *
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="例如：XX 购物中心停车场"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          停车时间 *
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          收费标准
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1">首小时</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                step="0.5"
                value={firstHour}
                onChange={(e) => setFirstHour(e.target.value)}
                className="w-full pl-7 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">每小时</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                step="0.5"
                value={perHour}
                onChange={(e) => setPerHour(e.target.value)}
                className="w-full pl-7 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">最高</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                type="number"
                step="0.5"
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
                placeholder="不限"
                className="w-full pl-7 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          备注（可选）
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="车位号、楼层等信息..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
        />
      </div>

      <PhotoCapture photos={photos} onChange={setPhotos} />

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-full font-semibold"
        >
          取消
        </button>
        <button
          type="submit"
          className="flex-1 py-4 bg-primary text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
        >
          开始记录
        </button>
      </div>
    </form>
  )
}
