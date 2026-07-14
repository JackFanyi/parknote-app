import { useState, useEffect } from 'react'
import { Fee } from '../types'
import { calculateFee } from '../utils/feeCalculator'

export function useFeeCalculation(startTime: Date, fee: Fee, endTime?: Date) {
  const [currentFee, setCurrentFee] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = endTime || new Date()
      setCurrentFee(calculateFee(startTime, now, fee))
    }

    update()
    
    if (!endTime) {
      const interval = setInterval(update, 60000)
      return () => clearInterval(interval)
    }
  }, [startTime, fee, endTime])

  return currentFee
}
