"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    title: "Produção Voluntária",
    description: "Mais de 200 voluntários dedicados em cada apresentação, unidos pelo amor à arte e à fé.",
    color: "gold"
  },
  {
    title: "Trilhas Originais",
    description: "Músicas compostas exclusivamente para o espetáculo, criando momentos únicos e emocionantes.",
    color: "gold"
  },
  {
    title: "Acessibilidade",
    description: "Estrutura adaptada para pessoas com deficiência, garantindo que todos possam participar.",
    color: "gold"
  },
  {
    title: "Sem Fins Lucrativos",
    description: "Todo o valor arrecadado é revertido para a produção e projetos sociais da igreja.",
    color: "wine"
  },
  {
    title: "Impacto Social",
    description: "Milhares de vidas transformadas ao longo de mais de uma década de apresentações.",
    color: "wine"
  },
  {
    title: "Classificação 10 Anos",
    description: "Conteúdo adequado para toda a família, com cenas adaptadas para o público infantil.",
    color: "wine"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function FeaturesGrid() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Por que <span className="text-gold">Participar?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Mais do que um espetáculo, uma experiência que transforma vidas há mais de uma década.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className={`h-full hover:scale-105 transition-transform duration-300 hover:border-${feature.color}/40`}>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${
                    feature.color === "gold" ? "text-gold" : "text-white"
                  }`}>{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
