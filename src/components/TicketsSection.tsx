"use client"

import { motion } from "framer-motion"
import { Ticket, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const EXTERNAL_PURCHASE_URL = "https://www.e-inscricao.com/igrejacapital?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnOxH3wzBgy7aE3R0D6FlU4QJ3eFGawLb8uGL094KIFwhmgbzFzyvg2wMI-HA_aem_oA-9Uc7Q951rwQS5PFHSog"

interface TicketsSectionProps {
  onDonateClick: () => void
}

export function TicketsSection({ onDonateClick }: TicketsSectionProps) {
  return (
    <section id="ingressos" className="py-24 px-4 bg-gradient-to-b from-zinc-950 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Garanta seu <span className="text-gold">Ingresso</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Escolha como participar deste momento especial.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-gradient-to-b from-gold/10 to-transparent border border-gold/20 hover:border-gold/40 transition-all flex flex-col"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6">
              <Ticket className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Comprar Ingresso</h3>
            <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
              Adquira seu ingresso através do nosso site oficial de vendas. Garanta sua presença no Auto de Páscoa 2026.
            </p>
            <Button asChild size="lg" className="w-full group mt-auto">
              <a href={EXTERNAL_PURCHASE_URL} target="_blank" rel="noopener noreferrer">
                Comprar Ingresso
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-gradient-to-b from-wine/20 to-transparent border border-wine/20 hover:border-wine/40 transition-all flex flex-col"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wine/30 to-wine/10 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-wine mb-3">Doar Ingresso</h3>
            <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
             Doe ingressos para que pessoas de projetos sociais e famílias sem condições financeiras tenham a oportunidade de assistir ao musical.
            </p>
            <Button variant="secondary" size="lg" className="w-full mt-auto" onClick={onDonateClick}>
              Doar Ingresso
              <Heart className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            
          </p>
        </motion.div>
      </div>
    </section>
  )
}
