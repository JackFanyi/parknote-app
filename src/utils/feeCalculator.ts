import { differenceInMinutes } from 'date-fns'
import { Fee } from '../types'

export function calculateFee(
  startTime: Date,
  endTime: Date,
  fee: Fee
): number {
  const totalMinutes = differenceInMinutes(endTime, startTime)
  if (totalMinutes <= 0) return 0

  const hours = Math.ceil(totalMinutes / 60)
  
  let calculated = fee.firstHour
  if (hours > 1) {
    calculated += (hours - 1) * fee.perHour
  }

  if (fee.maxFee !== undefined && calculated > fee.maxFee) {
    return fee.maxFee
  }

  return calculated
}

export function formatDuration(startTime: Date, endTime: Date): string {
  const totalMinutes = differenceInMinutes(endTime, startTime)
  if (totalMinutes <= 0) return '0 分钟'
  
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  
  if (hours === 0) {
    return `${minutes} 分钟`
  }
  if (minutes === 0) {
    return `${hours} 小时`
  }
  return `${hours} 小时 ${minutes} 分钟`
}
