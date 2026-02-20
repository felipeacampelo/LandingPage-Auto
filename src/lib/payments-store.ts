export interface Payment {
  id: string
  value: number
  netValue: number
  status: string
  billingType: string
  confirmedDate: string
  description: string
  externalReference: string
}

const payments: Payment[] = []

export function addPayment(payment: Payment) {
  const existingIndex = payments.findIndex((p) => p.id === payment.id)
  if (existingIndex >= 0) {
    payments[existingIndex] = payment
  } else {
    payments.push(payment)
  }
}

export function getPayments(): Payment[] {
  return [...payments].sort(
    (a, b) => new Date(b.confirmedDate).getTime() - new Date(a.confirmedDate).getTime()
  )
}

export function getPaymentsSummary() {
  const total = payments.reduce((sum, p) => sum + p.value, 0)
  const netTotal = payments.reduce((sum, p) => sum + p.netValue, 0)
  const count = payments.length

  const today = new Date().toISOString().split("T")[0]
  const todayPayments = payments.filter(
    (p) => p.confirmedDate.split("T")[0] === today
  )
  const todayTotal = todayPayments.reduce((sum, p) => sum + p.value, 0)
  const todayCount = todayPayments.length

  return {
    total,
    netTotal,
    count,
    todayTotal,
    todayCount,
  }
}

export function clearPayments() {
  payments.length = 0
}
