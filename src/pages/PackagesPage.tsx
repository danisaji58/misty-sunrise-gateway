import { useParams } from 'react-router-dom';
import { getPackagesByCategory, categories } from '@/data/packages';
import { PackageCard } from '@/components/PackageCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { PageHeaderBanner } from '@/components/PageHeaderBanner';

const PackagesPage = () => {
  const { category } = useParams<{ category: string }>();
  const packages = category ? getPackagesByCategory(category) : [];
  const categoryInfo = categories.find((c) => c.id === category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Page Header Banner */}
      <PageHeaderBanner
        title={categoryInfo?.name || 'Paket'}
        subtitle={categoryInfo?.bannerSubtitle || categoryInfo?.description || 'Pilih paket terbaik untuk perjalanan Bromo Anda'}
        image={categoryInfo?.bannerImage || '/images/hero-bromo.jpg'}
      />

      {/* Packages Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Tidak ada paket</h3>
              <p className="text-muted-foreground">
                Kategori ini belum memiliki paket tersedia.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagesPage;
