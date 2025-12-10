import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { PopularPackages } from '@/components/PopularPackages';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />
      <main>
        <Hero />
        <CategorySection />
        <PopularPackages />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
