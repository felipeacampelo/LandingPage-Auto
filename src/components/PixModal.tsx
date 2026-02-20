"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { CheckoutForm } from "./CheckoutForm"

interface PixModalProps {
  isOpen: boolean
  onClose: () => void
  selectedSession: { date: string; day: string; time: string } | null
}

interface PixData {
  qrCode: string
  qrCodeBase64: string
  copyPaste: string
  value: number
}

export function PixModal({ isOpen, onClose, selectedSession }: PixModalProps) {
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [copied, setCopied] = useState(false)

  const handlePaymentSuccess = (data: PixData) => {
    setPixData(data)
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
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {pixData ? (
              <span className="text-gold">Pagamento PIX Gerado!</span>
            ) : (
              "Finalizar Inscrição"
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {pixData
              ? "Escaneie o QR Code ou copie o código para pagar"
              : "Preencha seus dados para gerar o ingresso"}
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
          <CheckoutForm
            selectedSession={selectedSession}
            onPaymentSuccess={handlePaymentSuccess}
            onClose={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
