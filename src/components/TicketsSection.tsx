"use client"

import { motion } from "framer-motion"
import { Ticket, Calendar, Clock, ExternalLink, Info, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const sessions = [
  { date: "30 de Março", day: "Segunda", time: "20h", url: "https://www.e-inscricao.com/igrejacapital/auto30mar", exclusive: true },
  { date: "31 de Março", day: "Terça", time: "20h", url: "https://www.e-inscricao.com/igrejacapital/auto31mar" },
  { date: "1 de Abril", day: "Quarta", time: "20h", url: "https://www.e-inscricao.com/igrejacapital/auto1abr" },
  { date: "2 de Abril", day: "Quinta", time: "20h", url: "https://www.e-inscricao.com/igrejacapital/auto2abr" },
  { date: "3 de Abril", day: "Sexta", time: "15h", url: "https://www.e-inscricao.com/igrejacapital/auto3abr15h" },
  { date: "3 de Abril", day: "Sexta", time: "20h", url: "https://www.e-inscricao.com/igrejacapital/auto3abr20h" },
]

const infoItems = [
  { title: "Ingressos individuais", description: "Cada ingresso é válido para 1 pessoa e dá direito a 1 assento." },
  { title: "Acomodação no auditório", description: "Os assentos são numerados por fila e numeração, mas serão distribuidos por ordem de chegada. Recomendamos chegar com antecedência para garantir melhores lugares." },
  { title: "Política para crianças", description: "Crianças a partir de 8 anos pagam ingresso normalmente. Crianças menores de 8 anos possuem gratuidade, porém não têm direito a assento, devendo permanecer no colo do responsável." },
  { title: "Acesso ao evento", description: "Apresente o QR Code ou o ticket recebido por e-mail no hall de entrada do auditório para validação." },
  { title: "Horário de entrada", description: "Fique atento ao horário da sua sessão. Chegue com antecedência para validar seu ingresso com tranquilidade e garantir melhor acomodação." },
]

export function TicketsSection() {
  return (
    <section id="ingressos" className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Garanta seu <span className="text-gold">Ingresso</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        {/* Informações Importantes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 p-8 rounded-3xl bg-gradient-to-b from-gold/5 to-transparent border border-gold/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-gold" />
            <h3 className="text-2xl font-bold text-white">Informações Importantes sobre seu Ingresso</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Para garantir uma experiência tranquila e organizada, leia atentamente as orientações abaixo:
          </p>
          <div className="space-y-4">
            {infoItems.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gold">{item.title}</span>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4 text-gold" />
            <span>Em caso de dúvidas, entre em contato: </span>
            <a href="mailto:eventos@igrejacapital.org.br" className="text-gold hover:underline">
              eventos@igrejacapital.org.br
            </a>
          </div>
          <p className="mt-4 text-center text-lg text-white font-medium">
            Esperamos por você no Auto de Páscoa 2026 – Rei da Verdade.
          </p>
        </motion.div>

        {/* Cards de Sessões */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Escolha sua Sessão</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-gradient-to-b from-gold/10 to-transparent border border-gold/20 hover:border-gold/40 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="text-xl font-bold text-white">{session.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{session.day} • {session.time}</span>
                </div>
                {session.exclusive ? (
                  <div className="w-full p-3 rounded-lg bg-gold/10 border border-gold/30 text-center">
                    <span className="text-gold font-semibold text-sm">ESGOTADO</span>
                  </div>
                ) : (
                  <Button asChild size="default" className="w-full group">
                    <a href={session.url} target="_blank" rel="noopener noreferrer">
                      <Ticket className="w-4 h-4 mr-2" />
                      Comprar
                      <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
