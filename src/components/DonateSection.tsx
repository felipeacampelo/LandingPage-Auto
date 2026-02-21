"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DonateSectionProps {
  onDonateClick: () => void
}

export function DonateSection({ onDonateClick }: DonateSectionProps) {
  return (
    <section id="doar" className="py-24 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Doe um Ingresso. <span className="text-gold">Compartilhe Esperança.</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="p-8 rounded-3xl bg-gradient-to-b from-wine/10 to-transparent border border-wine/20"
        >
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-300 leading-relaxed">
              O Auto de Páscoa 2026 – Rei da Verdade, realizado pela Igreja Batista Capital, acredita que a arte transforma, aproxima e comunica verdades eternas.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Por isso, criamos a oportunidade de você doar ingressos para pessoas que não têm condições de adquirir o seu ou que vivem em situação de vulnerabilidade social no Distrito Federal e região.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Cada ingresso doado se transforma em acesso à cultura e arte a uma mensagem de amor e esperança apresentada com excelência artística por centenas de voluntários.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sua contribuição permite que mais pessoas vivam essa experiência completa — com dignidade, acolhimento e inclusão.
            </p>

            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-center gap-2 text-gold">
                <Sparkles className="w-5 h-5" />
                <span className="text-xl font-semibold">Seja parte dessa história.</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gold">
                <Ticket className="w-5 h-5" />
                <span className="text-xl font-semibold">Doe um ingresso.</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8"
            >
              <Button 
                size="xl" 
                variant="secondary" 
                onClick={onDonateClick}
                className="group"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Doar Ingresso
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
