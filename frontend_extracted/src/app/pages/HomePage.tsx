import { HeroSection } from "../components/home/HeroSection";
import { TrustBadges } from "../components/home/TrustBadges";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { HowItWorks } from "../components/home/HowItWorks";
import { StatsSection } from "../components/home/StatsSection";
import { LiveDemoSection } from "../components/home/LiveDemoSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { CtaSection } from "../components/home/CtaSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <LiveDemoSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
