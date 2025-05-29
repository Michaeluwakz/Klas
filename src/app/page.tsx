import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeatureHighlightsSection from '@/components/sections/FeatureHighlightsSection';
import LiveLecturesSection from '@/components/sections/LiveLecturesSection';
import EmailSubscriptionSection from '@/components/sections/EmailSubscriptionSection';
import Chatbot from '@/components/chatbot/Chatbot'; // Added Chatbot import

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureHighlightsSection />
        <LiveLecturesSection />
        <EmailSubscriptionSection />
      </main>
      <Footer />
      <Chatbot /> {/* Added Chatbot component */}
    </div>
  );
}
