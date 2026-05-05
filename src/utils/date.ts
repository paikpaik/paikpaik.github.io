// "YYYY.MM" 형식의 시작~종료(없으면 현재)까지 기간을 계산
export function formatPeriod(start: string, end?: string): string {
  const [startYear, startMonth] = start.split('.').map(Number)

  let endYear: number
  let endMonth: number
  let endLabel: string

  if (end) {
    ;[endYear, endMonth] = end.split('.').map(Number)
    endLabel = end
  } else {
    const now = new Date()
    endYear = now.getFullYear()
    endMonth = now.getMonth() + 1
    endLabel = '현재'
  }

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts = []
  if (years > 0) parts.push(`${years}년`)
  if (months > 0) parts.push(`${months}개월`)
  const duration = parts.join(' ')

  return `${start} – ${endLabel}${duration ? ` (약 ${duration})` : ''}`
}
