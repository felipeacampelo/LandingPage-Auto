"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Calendar, RefreshCw, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payment {
  id: string
  value: number
  netValue: number
  status: string
  billingType: string
  confirmedDate: string
  description: string
  externalReference: string
}

interface Summary {
  total: number
  netTotal: number
  count: number
  todayTotal: number
  todayCount: number
}

interface PaymentsData {
  summary: Summary
  payments: Payment[]
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<PaymentsData | null>(null)

  const fetchPayments = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/payments", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      })

      if (response.status === 401) {
        setError("Senha incorreta")
        setIsAuthenticated(false)
        return
      }

      const result = await response.json()
      setData(result)
      setIsAuthenticated(true)
    } catch {
      setError("Erro ao carregar dados")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchPayments()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-gold/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-2xl text-white">Área Administrativa</CardTitle>
              <p className="text-gray-400 mt-2">Auto de Páscoa 2026</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha de acesso"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading || !password}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-gray-400">Auto de Páscoa 2026 - Doações</p>
          </div>
          <Button onClick={fetchPayments} variant="outline" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Arrecadado</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(data.summary.total)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Valor Líquido</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(data.summary.netTotal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Hoje</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(data.summary.todayTotal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <span className="text-purple-400 font-bold text-lg">
                          {data.summary.count}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total de Doações</p>
                        <p className="text-2xl font-bold text-white">
                          {data.summary.todayCount} hoje
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Histórico de Doações</CardTitle>
              </CardHeader>
              <CardContent>
                {data.payments.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Nenhuma doação recebida ainda.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Descrição</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Valor</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Líquido</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.payments.map((payment) => (
                          <tr key={payment.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-3 px-4 text-gray-300">
                              {formatDate(payment.confirmedDate)}
                            </td>
                            <td className="py-3 px-4 text-gray-400 font-mono text-sm">
                              {payment.id.substring(0, 8)}...
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {payment.description || "-"}
                            </td>
                            <td className="py-3 px-4 text-white text-right font-medium">
                              {formatCurrency(payment.value)}
                            </td>
                            <td className="py-3 px-4 text-green-400 text-right">
                              {formatCurrency(payment.netValue)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
