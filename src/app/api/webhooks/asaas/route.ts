import { NextRequest, NextResponse } from "next/server"
import { addPayment } from "@/lib/payments-store"

interface AsaasWebhookPayload {
  event: string
  payment: {
    id: string
    customer: string
    value: number
    netValue: number
    status: string
    billingType: string
    confirmedDate?: string
    paymentDate?: string
    description?: string
    externalReference?: string
    invoiceUrl?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: AsaasWebhookPayload = await request.json()

    console.log("Webhook Asaas recebido:", payload.event)

    if (
      payload.event === "PAYMENT_RECEIVED" ||
      payload.event === "PAYMENT_CONFIRMED"
    ) {
      const payment = payload.payment

      addPayment({
        id: payment.id,
        value: payment.value,
        netValue: payment.netValue,
        status: payment.status,
        billingType: payment.billingType,
        confirmedDate: payment.confirmedDate || payment.paymentDate || new Date().toISOString(),
        description: payment.description || "",
        externalReference: payment.externalReference || "",
      })

      console.log(`Pagamento confirmado: R$ ${payment.value} - ID: ${payment.id}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: "Webhook endpoint ativo" }, { status: 200 })
}
