"use server"

interface PaymentData {
  name: string
  email: string
  cpf: string
  phone: string
  value: number
  sessionDate: string
  sessionTime: string
}

interface AsaasCustomerResponse {
  id: string
  name: string
  email: string
  cpfCnpj: string
}

interface AsaasPaymentResponse {
  id: string
  status: string
  value: number
  billingType: string
  pixQrCodeId?: string
}

interface AsaasPixQrCodeResponse {
  encodedImage: string
  payload: string
  expirationDate: string
}

interface PaymentResult {
  success: boolean
  data?: {
    qrCode: string
    qrCodeBase64: string
    copyPaste: string
  }
  error?: string
}

const ASAAS_API_URL = process.env.ASAAS_API_URL || "https://sandbox.asaas.com/api/v3"
const ASAAS_API_KEY = process.env.ASAAS_API_KEY || ""

async function findOrCreateCustomer(data: PaymentData): Promise<AsaasCustomerResponse | null> {
  try {
    const searchResponse = await fetch(
      `${ASAAS_API_URL}/customers?cpfCnpj=${data.cpf}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access_token": ASAAS_API_KEY,
        },
      }
    )

    if (searchResponse.ok) {
      const searchResult = await searchResponse.json()
      if (searchResult.data && searchResult.data.length > 0) {
        return searchResult.data[0]
      }
    }

    const createResponse = await fetch(`${ASAAS_API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        cpfCnpj: data.cpf,
        phone: data.phone,
        notificationDisabled: false,
      }),
    })

    if (!createResponse.ok) {
      const errorData = await createResponse.json()
      console.error("Error creating customer:", errorData)
      return null
    }

    return await createResponse.json()
  } catch (error) {
    console.error("Error in findOrCreateCustomer:", error)
    return null
  }
}

async function createPayment(customerId: string, value: number, description: string): Promise<AsaasPaymentResponse | null> {
  try {
    const dueDate = new Date()

    const response = await fetch(`${ASAAS_API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY,
      },
      body: JSON.stringify({
        customer: customerId,
        billingType: "PIX",
        value: value,
        dueDate: dueDate.toISOString().split("T")[0],
        description: description,
        externalReference: `autopascoa2026_${Date.now()}`,
        postalService: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error creating payment:", errorData)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error in createPayment:", error)
    return null
  }
}

async function getPixQrCode(paymentId: string): Promise<AsaasPixQrCodeResponse | null> {
  try {
    const response = await fetch(`${ASAAS_API_URL}/payments/${paymentId}/pixQrCode`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access_token": ASAAS_API_KEY,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Error getting PIX QR Code:", errorData)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error in getPixQrCode:", error)
    return null
  }
}

export async function createPixPayment(data: PaymentData): Promise<PaymentResult> {
  if (!ASAAS_API_KEY) {
    return {
      success: false,
      error: "Configuração de pagamento não encontrada. Entre em contato com o suporte.",
    }
  }

  if (!data.cpf || data.cpf.length !== 11) {
    return {
      success: false,
      error: "CPF inválido. Verifique e tente novamente.",
    }
  }

  if (!data.value || data.value < 1) {
    return {
      success: false,
      error: "Valor inválido. O valor mínimo é R$ 1,00.",
    }
  }

  try {
    const customer = await findOrCreateCustomer(data)
    if (!customer) {
      return {
        success: false,
        error: "Erro ao processar seus dados. Verifique o CPF e tente novamente.",
      }
    }

    const description = `Auto de Páscoa 2026 - Rei da Verdade | Sessão: ${data.sessionDate} às ${data.sessionTime}`
    const payment = await createPayment(customer.id, data.value, description)
    if (!payment) {
      return {
        success: false,
        error: "Erro ao gerar cobrança. Tente novamente em alguns instantes.",
      }
    }

    const pixQrCode = await getPixQrCode(payment.id)
    if (!pixQrCode) {
      return {
        success: false,
        error: "Erro ao gerar QR Code PIX. Tente novamente.",
      }
    }

    return {
      success: true,
      data: {
        qrCode: pixQrCode.payload,
        qrCodeBase64: pixQrCode.encodedImage,
        copyPaste: pixQrCode.payload,
      },
    }
  } catch (error) {
    console.error("Error in createPixPayment:", error)
    return {
      success: false,
      error: "Erro de conexão. Verifique sua internet e tente novamente.",
    }
  }
}
