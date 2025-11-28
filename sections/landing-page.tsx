import { Navbar } from "@/sections/navbar";
import { HeroSection } from "@/sections/hero-section";
import { AiVastuSection } from "@/sections/ai-vastu-section";
import { ServicesSection } from "@/sections/services-section";
import { MissionVisionSection } from "@/sections/mission-vision-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { TeamSection } from "@/sections/team-section";
import { PricingSection } from "@/sections/pricing-section";
import { CommunitySection } from "@/sections/community-section";
import { FooterSection } from "@/sections/footer-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),transparent_55%),linear-gradient(to_bottom,_#f9fafb,_#ffffff)] text-slate-900">
      <Navbar />
      <main className="flex flex-col gap-24 pb-24 pt-10 md:gap-32 md:pt-16">
        <HeroSection />
        <AiVastuSection />
        <ServicesSection />
        <MissionVisionSection />
        <TestimonialsSection />
        <TeamSection />
        <PricingSection />
        <CommunitySection />
      </main>
      <FooterSection />
    </div>
  );
}


