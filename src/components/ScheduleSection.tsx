"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const sessions = [
  { date: "30/03", day: "Domingo", time: "19h00", available: true },
  { date: "31/03", day: "Segunda", time: "20h00", available: true },
  { date: "01/04", day: "Terça", time: "20h00", available: true },
  { date: "02/04", day: "Quarta", time: "20h00", available: true },
  { date: "03/04", day: "Quinta", time: "20h00", available: true },
]

interface ScheduleSectionProps {
  onSelectSession: (session: { date: string; day: string; time: string }) => void
}

export function ScheduleSection({ onSelectSession }: ScheduleSectionProps) {
  return (
    <section id="ingressos" className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Agenda & <span className="text-gold">Ingressos</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Escolha a melhor data para viver essa experiência única.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-5 h-5 text-gold" />
            <span>Igreja Batista Capital • Brasília, DF</span>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {sessions.map((session, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-gold/40 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8 text-gold" />
                  </div>
                  
                  <p className="text-3xl font-bold text-white mb-1">{session.date}</p>
                  <p className="text-gold font-medium mb-4">{session.day}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>

                  <Button
                    variant={session.available ? "default" : "secondary"}
                    className="w-full"
                    disabled={!session.available}
                    onClick={() => onSelectSession(session)}
                  >
                    {session.available ? "Selecionar" : "Esgotado"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-gold/10 to-wine/10 border border-gold/20">
            <p className="text-white text-lg mb-2">
              <strong className="text-gold">Entrada por doação voluntária</strong>
            </p>
            <p className="text-gray-400">
              Valor sugerido: R$ 20,00 • Todo valor é revertido para a produção e projetos sociais
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
