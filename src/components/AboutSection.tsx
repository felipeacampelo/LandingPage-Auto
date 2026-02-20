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
              A Igreja Batista Capital apresenta a 12ª edição do seu tradicional Auto de Páscoa, que em 2026 traz o tema "Rei da Verdade". O musical, já consolidado no calendário cultural cristão do Distrito Federal, retrata de forma artística e musical a vida e a jornada de Jesus Cristo na Terra.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Ao longo de sua história, o espetáculo já foi assistido por mais de 30 mil pessoas, tornando-se uma das maiores produções voluntárias do segmento na região. A classificação indicativa é a partir de 10 anos.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Com estrutura cênica e musical de grande porte, o Auto conta com banda e orquestra ao vivo, que conduzem a narrativa sonora das cenas. O elenco passa por audições e preparação técnica específica para a execução das músicas e interpretações. Atualmente, o projeto mobiliza aproximadamente 300 voluntários por temporada, organizados em equipes de elenco, banda e orquestra, dança, contrarregra, cenografia, figurino, maquiagens especiais, recepção, coordenação, áreas técnicas e suporte geral.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Além do espetáculo, a Igreja Batista Capital promove ações de acessibilidade e inclusão social. Parte dos ingressos é destinada a comunidades em situação de vulnerabilidade social do Distrito Federal e entorno. O musical também oferece sessões com recursos de áudio descrição para pessoas cegas e intérpretes de Libras para o público surdo, reforçando o compromisso com uma experiência cultural acessível e inclusiva.
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
