import { NextRequest, NextResponse } from "next/server"
import { getPayments, getPaymentsSummary } from "@/lib/payments-store"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const payments = getPayments()
  const summary = getPaymentsSummary()

  return NextResponse.json({
    summary,
    payments,
  })
}
