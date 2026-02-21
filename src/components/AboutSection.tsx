"use client"

import { motion } from "framer-motion"
import { Music, Heart, Sparkles } from "lucide-react"

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 px-4 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sobre o <span className="text-gold">Espetáculo</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              O Auto de Páscoa é uma grande experiência artística que retrata, com intensidade e sensibilidade, a vida, morte e ressurreição de Jesus Cristo.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Realizado pela Igreja Batista Capital, o musical chega à sua 12ª edição reunindo cerca de 300 voluntários entre elenco, banda, orquestra ao vivo, dança e equipes técnicas, em uma produção que já impactou mais de 30 mil espectadores ao longo dos anos.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Além da excelência artística, o espetáculo promove inclusão e acessibilidade, com sessões adaptadas para pessoas cegas e surdas e ações voltadas à comunidade em situação de vulnerabilidade social.
            </p>
            <div className="pt-4 border-t border-gold/20">
              <h3 className="text-2xl font-bold text-gold mb-2">Rei da Verdade</h3>
              <p className="text-lg text-gray-300 italic">
                Uma história de amor e entrega contada por meio da arte.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent border border-gold/20">
              <div className="p-3 rounded-xl bg-gold/20">
                <Music className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Trilha Sonora Autoral</h3>
                <p className="text-gray-400">
                  Músicas compostas exclusivamente para o espetáculo, criando uma atmosfera única e emocionante.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-wine/20 to-transparent border border-wine/20">
              <div className="p-3 rounded-xl bg-wine/30">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Feito com Amor</h3>
                <p className="text-gray-400">
                  Mais de 300 voluntários dedicados que doam seu tempo e talento para criar essa experiência.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-gold/10 to-transparent border border-gold/20">
              <div className="p-3 rounded-xl bg-gold/20">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Experiência Imersiva</h3>
                <p className="text-gray-400">
                  Cenografia, iluminação e efeitos especiais que transportam você para dentro da história.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
