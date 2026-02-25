"use client"

import { useState } from "react"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { FeaturesGrid } from "@/components/FeaturesGrid"
import { TicketsSection } from "@/components/TicketsSection"
import { DonateSection } from "@/components/DonateSection"
import { DonateModal } from "@/components/DonateModal"
import { Footer } from "@/components/Footer"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDonateClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <AboutSection />
      <FeaturesGrid />
      <TicketsSection />
      <DonateSection onDonateClick={handleDonateClick} />
      <Footer />

      <DonateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  )
}
