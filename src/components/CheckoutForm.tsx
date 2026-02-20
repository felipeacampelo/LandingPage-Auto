"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, CreditCard, Phone, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateCPF, formatCPF, formatPhone, validateEmail } from "@/lib/validators"
import { createPixPayment } from "@/app/actions/asaas"

interface CheckoutFormProps {
  selectedSession: { date: string; day: string; time: string } | null
  onPaymentSuccess: (pixData: { qrCode: string; qrCodeBase64: string; copyPaste: string; value: number }) => void
  onClose: () => void
}

const donationValues = [
  { value: 20, label: "R$ 20" },
  { value: 30, label: "R$ 30" },
  { value: 50, label: "R$ 50" },
  { value: 100, label: "R$ 100" },
]

export function CheckoutForm({ selectedSession, onPaymentSuccess, onClose }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  })
  const [selectedValue, setSelectedValue] = useState(20)
  const [customValue, setCustomValue] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === "cpf") {
      formattedValue = formatCPF(value)
    } else if (field === "phone") {
      formattedValue = formatPhone(value)
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
    setApiError("")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório"
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Telefone inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setApiError("")

    const finalValue = customValue ? parseFloat(customValue) : selectedValue

    try {
      const result = await createPixPayment({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ""),
        phone: formData.phone.replace(/\D/g, ""),
        value: finalValue,
        sessionDate: selectedSession?.date || "",
        sessionTime: selectedSession?.time || "",
      })

      if (result.success && result.data) {
        onPaymentSuccess({
          qrCode: result.data.qrCode,
          qrCodeBase64: result.data.qrCodeBase64,
          copyPaste: result.data.copyPaste,
          value: finalValue,
        })
      } else {
        setApiError(result.error || "Erro ao gerar pagamento. Tente novamente.")
      }
    } catch {
      setApiError("Erro de conexão. Verifique sua internet e tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      {selectedSession && (
        <div className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gold" />
          <div>
            <p className="text-white font-medium">
              {selectedSession.day}, {selectedSession.date}
            </p>
            <p className="text-gray-400 text-sm">às {selectedSession.time}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={!!errors.name}
              className="pl-10"
            />
          </div>
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={!!errors.email}
              className="pl-10"
            />
          </div>
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleInputChange("cpf", e.target.value)}
              error={!!errors.cpf}
              className="pl-10"
              maxLength={14}
            />
          </div>
          {errors.cpf && <p className="text-red-400 text-sm">{errors.cpf}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              error={!!errors.phone}
              className="pl-10"
              maxLength={15}
            />
          </div>
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-3">
          <Label>Valor da Doação</Label>
          <div className="grid grid-cols-4 gap-2">
            {donationValues.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelectedValue(option.value)
                  setCustomValue("")
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  selectedValue === option.value && !customValue
                    ? "border-gold bg-gold/20 text-gold"
                    : "border-white/10 text-gray-400 hover:border-gold/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
            <Input
              placeholder="Outro valor"
              value={customValue}
              onChange={(e) => {
                setCustomValue(e.target.value.replace(/\D/g, ""))
                setSelectedValue(0)
              }}
              className="pl-10"
            />
          </div>
        </div>

        {apiError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-sm">{apiError}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando...
              </>
            ) : (
              "Doar Ingresso"
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
