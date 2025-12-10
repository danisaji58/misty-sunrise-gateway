import { Package } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(pkg);
    toast({
      title: 'Ditambahkan ke keranjang!',
      description: `${pkg.name} berhasil ditambahkan.`,
    });
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-mist to-secondary overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
          {pkg.category === 'jeep' && '🚙'}
          {pkg.category === 'penginapan' && '🏨'}
          {pkg.category === 'penjemputan' && '✈️'}
          {pkg.category === 'makan' && '🍱'}
          {pkg.category === 'dokumentasi' && '📸'}
        </div>
        {pkg.popular && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-golden text-accent-foreground text-xs font-semibold flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Popular
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {pkg.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pkg.description}
        </p>
      </CardHeader>

      <CardContent className="flex-grow">
        {pkg.features && (
          <ul className="space-y-1.5">
            {pkg.features.slice(0, 4).map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        <div>
          <span className="text-xs text-muted-foreground">Mulai dari</span>
          <p className="text-lg font-bold text-primary">
            {formatPrice(pkg.price)}
          </p>
        </div>
        <Button size="sm" onClick={handleAddToCart} className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Tambah
        </Button>
      </CardFooter>
    </Card>
  );
};
