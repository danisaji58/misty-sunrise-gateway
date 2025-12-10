import { Link } from 'react-router-dom';
import { categories } from '@/data/packages';
import { Card } from '@/components/ui/card';

export const CategorySection = () => {
  return (
    <section id="categories" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
            Pilih Sesuai Kebutuhan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dari jeep touring hingga dokumentasi profesional, semua kebutuhan 
            perjalanan Bromo Anda tersedia di sini.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/packages/${category.id}`}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full p-6 text-center group cursor-pointer hover:border-primary/30 hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
