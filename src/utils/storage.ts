import { ParkingRecord } from '../types'

const STORAGE_KEY = 'parknote_records'

export const storage = {
  getAll: (): ParkingRecord[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    try {
      const parsed = JSON.parse(data)
      return parsed.map((item: any) => ({
        ...item,
        startTime: new Date(item.startTime),
        endTime: item.endTime ? new Date(item.endTime) : undefined,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }))
    } catch {
      return []
    }
  },

  save: (records: ParkingRecord[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  },

  add: (record: ParkingRecord): void => {
    const records = storage.getAll()
    records.unshift(record)
    storage.save(records)
  },

  update: (id: string, updated: Partial<ParkingRecord>): void => {
    const records = storage.getAll()
    const index = records.findIndex(r => r.id === id)
    if (index !== -1) {
      records[index] = {
        ...records[index],
        ...updated,
        updatedAt: new Date(),
      }
      storage.save(records)
    }
  },

  delete: (id: string): void => {
    const records = storage.getAll().filter(r => r.id !== id)
    storage.save(records)
  },

  getById: (id: string): ParkingRecord | undefined => {
    return storage.getAll().find(r => r.id === id)
  },
}
