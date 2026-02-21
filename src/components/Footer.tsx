"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gold">Rei da Verdade</h3>
            <p className="text-gray-400 leading-relaxed">
              Auto de Páscoa 2026 - Uma produção da Igreja Batista Capital.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/autodepascoa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-gold" />
              </a>
              <a
                href="https://www.youtube.com/@IgrejaBatistaCapital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Youtube className="w-5 h-5 text-gray-400 hover:text-gold" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Contato</h4>
            <div className="space-y-3">
              <a href="https://share.google/G7Rec8joY0bNIUkrh" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-gold transition-colors">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p>Igreja Batista Capital<br />Brasília, DF</p>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-gold" />
                <p>+55 61 99199-4412</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-gold" />
                <p>eventos@igrejacapital.org.br</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white">Links Rápidos</h4>
            <nav className="space-y-2">
              <a href="#sobre" className="block text-gray-400 hover:text-gold transition-colors">
                Sobre o Espetáculo
              </a>
              <a href="#ingressos" className="block text-gray-400 hover:text-gold transition-colors">
                Ingressos
              </a>
              <a href="https://www.e-inscricao.com/igrejacapital" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-gold transition-colors">
                Comprar Ingresso
              </a>
              <a href="https://igrejacapital.com.br" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-gold transition-colors">
                Igreja Batista Capital
              </a>
            </nav>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Igreja Batista Capital. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
