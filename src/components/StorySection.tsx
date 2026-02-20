"use client"

import { motion } from "framer-motion"

const storyParts = [
  {
    title: "Os Milagres",
    description: "A jornada começa com os milagres que marcaram a vida de Jesus: curas, transformações e o amor incondicional que tocou cada vida em seu caminho.",
    gradient: "from-blue-500/20"
  },
  {
    title: "A Traição",
    description: "O peso da traição, o julgamento injusto e o caminho doloroso até o Calvário. Momentos que revelam a profundidade do sacrifício.",
    gradient: "from-wine/30"
  },
  {
    title: "A Crucificação",
    description: "O momento mais solene da história da humanidade. A cruz que se tornou símbolo de amor eterno e redenção para todos.",
    gradient: "from-red-900/30"
  },
  {
    title: "A Ressurreição",
    description: "A vitória sobre a morte. O túmulo vazio que proclama a maior verdade: Ele vive! E porque Ele vive, nós também viveremos.",
    gradient: "from-gold/20"
  }
]

export function StorySection() {
  return (
    <section id="historia" className="py-24 px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wine/10 via-transparent to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            A <span className="text-gold">História</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Uma narrativa épica que atravessa os séculos e continua transformando vidas.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden md:block" />
          
          <div className="space-y-12 md:space-y-24">
            {storyParts.map((part, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`inline-block p-8 rounded-3xl bg-gradient-to-br ${part.gradient} to-transparent border border-white/5`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{part.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                      {part.description}
                    </p>
                  </div>
                </div>
                
                <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-gold to-yellow-600 items-center justify-center text-black font-bold text-xl shadow-lg shadow-gold/30">
                  {index + 1}
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-2xl md:text-3xl text-white font-light italic">
            "Eu sou o caminho, a verdade e a vida"
          </p>
          <p className="text-gold mt-2">João 14:6</p>
        </motion.div>
      </div>
    </section>
  )
}
