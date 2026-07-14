export interface Fee {
  firstHour: number
  perHour: number
  maxFee?: number
}

export interface ParkingRecord {
  id: string
  location: string
  startTime: Date
  endTime?: Date
  fee: Fee
  photos: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}
