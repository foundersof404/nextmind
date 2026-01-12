import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WebsitesSection from "@/components/WebsitesSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WebsitesSection />
        <ServicesScrollSection />
        <WorkShowcaseSection />
        <SocialMediaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
