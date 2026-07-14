import { useRef } from 'react'

interface PhotoCaptureProps {
  photos: string[]
  onChange: (photos: string[]) => void
}

export default function PhotoCapture({ photos, onChange }: PhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        onChange([...photos, dataUrl])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        照片（可选）
      </label>
      <div className="flex flex-wrap gap-3 mb-3">
        {photos.map((photo, i) => (
          <div key={i} className="relative">
            <img
              src={photo}
              alt={`照片 ${i + 1}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removePhoto(i)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
      >
        📷 添加照片
      </button>
    </div>
  )
}
