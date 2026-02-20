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
              A <strong className="text-gold">Auto de Páscoa "Rei da Verdade"</strong> é uma produção 
              teatral que transcende o entretenimento convencional. Uma experiência imersiva que 
              combina arte, fé e emoção em uma narrativa poderosa sobre a vida, morte e ressurreição 
              de Jesus Cristo.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Com uma <strong className="text-white">trilha sonora 100% autoral</strong>, cenografia 
              cinematográfica e um elenco de mais de 200 voluntários apaixonados, cada apresentação 
              é uma jornada transformadora que toca corações e renova esperanças.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Há mais de uma década, a Igreja Batista Capital realiza este espetáculo que já impactou 
              milhares de vidas em Brasília, tornando-se referência em produções teatrais cristãs 
              no Brasil.
            </p>
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
