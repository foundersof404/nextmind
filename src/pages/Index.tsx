import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import CollisionSection from "@/components/CollisionSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import BrightInDarkSection from "@/components/BrightInDarkSection";
import StatsSection from "@/components/StatsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";
import MobileEnhancements from "@/components/MobileEnhancements";

const Index = () => {
  return (
    <MobileEnhancements>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="relative">
          <HeroSection />
          <WebsitesSection />
          <ServicesScrollSection />
          <WorkShowcaseSection />
          <BrightInDarkSection />
          <SocialMediaSection />
          <StatsSection />
        </main>
        <Footer />
      </div>
    </MobileEnhancements>
  );
};

export default Index;
