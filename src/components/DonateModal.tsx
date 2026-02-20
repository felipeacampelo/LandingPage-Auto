"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, QrCode, User, Mail, CreditCard, Phone, Loader2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { validateCPF, formatCPF, formatPhone, validateEmail } from "@/lib/validators"
import { createPixPayment } from "@/app/actions/asaas"

interface DonateModalProps {
  isOpen: boolean
  onClose: () => void
}

interface PixData {
  qrCode: string
  qrCodeBase64: string
  copyPaste: string
  value: number
}

const donationValues = [
  { value: 20, label: "R$ 20" },
  { value: 30, label: "R$ 30" },
  { value: 50, label: "R$ 50" },
  { value: 100, label: "R$ 100" },
]

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [copied, setCopied] = useState(false)
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
        sessionDate: "",
        sessionTime: "",
      })

      if (result.success && result.data) {
        setPixData({
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

  const handleCopy = async () => {
    if (pixData?.copyPaste) {
      await navigator.clipboard.writeText(pixData.copyPaste)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    setPixData(null)
    setCopied(false)
    setFormData({ name: "", email: "", cpf: "", phone: "" })
    setSelectedValue(20)
    setCustomValue("")
    setErrors({})
    setApiError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            {pixData ? (
              <span className="text-gold">Pagamento PIX Gerado!</span>
            ) : (
              <>
                <Heart className="w-6 h-6 text-red-400" />
                <span>Doar Ingresso</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {pixData
              ? "Escaneie o QR Code ou copie o código para pagar"
              : "Sua doação ajuda na produção do espetáculo"}
          </DialogDescription>
        </DialogHeader>

        {pixData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-4"
          >
            <div className="text-center">
              <p className="text-gray-400 mb-2">Valor da doação</p>
              <p className="text-4xl font-bold text-gold">
                R$ {pixData.value.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <div className="flex justify-center">
              {pixData.qrCodeBase64 ? (
                <div className="p-4 bg-white rounded-2xl">
                  <img
                    src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                    alt="QR Code PIX"
                    className="w-48 h-48"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gold/50" />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400 text-center">PIX Copia e Cola</p>
              <div className="relative">
                <div className="p-4 bg-black/50 rounded-xl border border-gold/20 pr-12">
                  <p className="text-sm text-gray-300 break-all font-mono">
                    {pixData.copyPaste.length > 100
                      ? `${pixData.copyPaste.substring(0, 100)}...`
                      : pixData.copyPaste}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gold" />
                  )}
                </Button>
              </div>
            </div>

            <Button onClick={handleCopy} className="w-full" size="lg">
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Código Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copiar Código PIX
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                Após o pagamento, você receberá a confirmação por e-mail.
              </p>
              <p className="text-xs text-gray-500">
                O código PIX expira em 24 horas.
              </p>
            </div>

            <Button variant="outline" onClick={handleClose} className="w-full">
              Fechar
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
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
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
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
        )}
      </DialogContent>
    </Dialog>
  )
}
