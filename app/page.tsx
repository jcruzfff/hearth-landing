import HeroSection from './components/HeroSection';
import LumaCalendarSection from './components/LumaCalendarSection';
import MembershipsSection from './components/MembershipsSection';
import ContactFormSection from './components/ContactFormSection';
import SpaceSection from './components/SpaceSection';
import CompaniesContactSection from './components/CompaniesContactSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LumaCalendarSection />
      <MembershipsSection />
      <ContactFormSection />
      <SpaceSection />
      <CompaniesContactSection />
      <Footer />
    </main>
  );
}