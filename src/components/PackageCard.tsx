import { Link } from 'react-router-dom';
import { Package } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Star, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';

interface PackageCardProps {
  pkg: Package;
}

export const PackageCard = ({ pkg }: PackageCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(pkg);
    toast({
      title: 'Ditambahkan ke keranjang!',
      description: `${pkg.name} berhasil ditambahkan.`,
    });
  };

  // Navigation logic:
  // - Picnic Breakfast (sarapan-sunrise) → /food-package (has tier selection)
  // - Snack Box, Makan Lengkap → /food/:id (regular food detail)
  // - Penjemputan → /pickup (dedicated pickup page)
  // - Others → regular detail page
  const getDetailUrl = () => {
    if (pkg.category === 'makan' && pkg.id === 'sarapan-sunrise') {
      return '/food-package';
    }
    if (pkg.category === 'makan' && (pkg.id === 'snack-box' || pkg.id === 'makan-lengkap')) {
      return `/food/${pkg.id}`;
    }
    if (pkg.category === 'penjemputan') {
      return '/pickup';
    }
    return `/package/${pkg.id}`;
  };
  const detailUrl = getDetailUrl();

  return (
    <Link to={detailUrl}>
      <Card className="group overflow-hidden h-full flex flex-col hover:shadow-medium transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-mist to-secondary overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          {pkg.popular && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-golden text-accent-foreground text-xs font-semibold flex items-center gap-1 z-10">
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
            <span className="text-xs text-muted-foreground"></span>
            <p className="text-lg font-bold text-primary">
              {formatPrice(pkg.price)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="gap-1">
              Detail
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
