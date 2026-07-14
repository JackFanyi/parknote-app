import { useState, useEffect, useCallback } from 'react'
import { ParkingRecord } from '../types'
import { storage } from '../utils/storage'

export function useRecords() {
  const [records, setRecords] = useState<ParkingRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setRecords(storage.getAll())
  }, [])

  const addRecord = useCallback((record: ParkingRecord) => {
    storage.add(record)
    setRecords(storage.getAll())
  }, [])

  const updateRecord = useCallback((id: string, updated: Partial<ParkingRecord>) => {
    storage.update(id, updated)
    setRecords(storage.getAll())
  }, [])

  const deleteRecord = useCallback((id: string) => {
    storage.delete(id)
    setRecords(storage.getAll())
  }, [])

  const filteredRecords = searchQuery.trim()
    ? records.filter(r => 
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : records

  const activeRecord = records.find(r => !r.endTime)

  return {
    records: filteredRecords,
    activeRecord,
    addRecord,
    updateRecord,
    deleteRecord,
    searchQuery,
    setSearchQuery,
  }
}
