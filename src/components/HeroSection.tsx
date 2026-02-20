"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToTickets = () => {
    document.getElementById("ingressos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background-hero.png')" }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <span className="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
            Igreja Batista Capital apresenta
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl text-gray-300 -mb-6 tracking-wide"
        >
          AUTO DE PÁSCOA
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4"
        >
          <Image
            src="/logo-rei-da-verdade.png"
            alt="Rei da Verdade - Auto de Páscoa"
            width={800}
            height={300}
            className="mx-auto w-auto h-auto max-w-[90%] md:max-w-[800px]"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          <span className="text-gold">30 de março a 3 de abril</span> • Brasília
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="xl" onClick={scrollToTickets} className="group">
            GARANTIR MEU INGRESSO
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}>
            Saiba Mais
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
