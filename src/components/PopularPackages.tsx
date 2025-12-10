import { Link } from 'react-router-dom';
import { getPopularPackages } from '@/data/packages';
import { PackageCard } from './PackageCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const PopularPackages = () => {
  const popularPackages = getPopularPackages();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Paling Diminati
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Paket Populer
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Pilihan paket favorit dari ratusan pelanggan yang sudah menikmati keindahan Bromo.
            </p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto">
            <Link to="/packages/jeep" className="gap-2">
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPackages.slice(0, 4).map((pkg, index) => (
            <div
              key={pkg.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
