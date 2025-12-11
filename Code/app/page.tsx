import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MotivationSection } from "@/components/motivation-section"
import { ArchitectureSection } from "@/components/architecture-section"
import { FeaturesSection } from "@/components/features-section"
import { ApiSection } from "@/components/api-section"
import { PerformanceSection } from "@/components/performance-section"
import { DemoSection } from "@/components/demo-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MotivationSection />
      <ArchitectureSection />
      <FeaturesSection />
      <ApiSection />
      <PerformanceSection />
      <DemoSection />
      <TeamSection />
      <Footer />
    </main>
  )
}
