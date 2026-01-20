import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPackageById, getPackagesByCategory, categories, pickupLocations } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';

const PackageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const pkg = id ? getPackageById(id) : null;
  const categoryInfo = pkg ? categories.find((c) => c.id === pkg.category) : null;
  
  // Get variants (other packages in same category)
  const variants = pkg ? getPackagesByCategory(pkg.category).filter(p => p.id !== pkg.id) : [];

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <div className="h-32 w-32 mx-auto mb-6 rounded-2xl overflow-hidden bg-secondary flex items-center justify-center">
            <span className="text-4xl text-muted-foreground">?</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Paket tidak ditemukan</h1>
          <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = pkg.images || [pkg.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(pkg);
    }
    toast({
      title: 'Ditambahkan ke keranjang!',
      description: `${quantity}x ${pkg.name} berhasil ditambahkan.`,
    });
  };

  const handleCheckout = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(pkg);
    }
    navigate('/checkout');
  };

  const isPenjemputan = pkg.category === 'penjemputan';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Main Content */}
      <main className="pt-20 pb-32 lg:pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 flex-wrap">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
              Beranda
            </button>
            <span>/</span>
            <button onClick={() => navigate(`/packages/${pkg.category}`)} className="hover:text-primary transition-colors">
              {categoryInfo?.name}
            </button>
            <span>/</span>
            <span className="text-foreground">{pkg.name}</span>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-5 mb-6 lg:mb-0">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-3">
                <img
                  src={images[currentImageIndex]}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${pkg.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Column - Details */}
            <div className="lg:col-span-4 space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{pkg.name}</h1>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(pkg.price)}
                  {pkg.capacity && (
                    <span className="text-base font-normal text-muted-foreground ml-2">
                      / {pkg.capacity}
                    </span>
                  )}
                </div>
                {pkg.duration && (
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-secondary text-sm">
                    {pkg.duration}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{pkg.description}</p>

              {/* Variant Selection with Photos */}
              {variants.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Pilihan Lainnya</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {variants.slice(0, 4).map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => navigate(`/package/${variant.id}`)}
                        className={`shrink-0 w-20 group ${
                          selectedVariant === variant.id ? 'ring-2 ring-primary rounded-xl' : ''
                        }`}
                      >
                        <div className="h-16 w-20 rounded-xl overflow-hidden mb-1">
                          <img
                            src={variant.image}
                            alt={variant.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-xs text-center line-clamp-2">{variant.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pickup Locations (for Penjemputan category) */}
              {isPenjemputan && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Pilih Lokasi Penjemputan</h3>
                  
                  {/* Surabaya */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Surabaya</p>
                    <div className="flex flex-wrap gap-2">
                      {pickupLocations.surabaya.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc.id)}
                          className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                            selectedLocation === loc.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Malang */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Malang</p>
                    <div className="flex flex-wrap gap-2">
                      {pickupLocations.malang.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc.id)}
                          className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                            selectedLocation === loc.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <Card className="border-none shadow-soft">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Itinerary</h3>
                    <div className="space-y-2">
                      {pkg.itinerary.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Includes / Excludes */}
              <div className="grid grid-cols-1 gap-4">
                {pkg.includes && pkg.includes.length > 0 && (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3 text-green-600">Termasuk</h3>
                      <ul className="space-y-1">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {pkg.excludes && pkg.excludes.length > 0 && (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3 text-red-600">Tidak Termasuk</h3>
                      <ul className="space-y-1">
                        {pkg.excludes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-red-500 shrink-0">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Meeting Point */}
              {pkg.meetingPoint && (
                <div className="p-4 rounded-2xl bg-secondary/50">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Meeting Point</div>
                  <div className="font-medium">{pkg.meetingPoint}</div>
                </div>
              )}

              {/* Notes */}
              {pkg.notes && (
                <div className="p-4 rounded-2xl bg-sunrise-50 border border-sunrise-200">
                  <div className="text-sm font-medium text-sunrise-700 mb-1">Catatan</div>
                  <p className="text-sm text-sunrise-600">{pkg.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Sticky Order Card (Desktop) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <Card className="shadow-medium">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h3>
                    
                    {/* Package Image */}
                    <div className="aspect-video rounded-xl overflow-hidden mb-4">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Package Name */}
                    <p className="font-medium mb-2">{pkg.name}</p>
                    
                    {/* Price */}
                    <div className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(pkg.price)}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Jumlah</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-secondary"
                        >
                          -
                        </button>
                        <span className="font-medium w-8 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-secondary"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between py-3 border-t">
                      <span className="font-medium">Subtotal</span>
                      <span className="font-bold text-lg">{formatPrice(pkg.price * quantity)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3 mt-4">
                      <Button
                        className="w-full"
                        variant="sunrise"
                        onClick={handleAddToCart}
                      >
                         Tambah ke Keranjang
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden z-40">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-lg font-bold text-primary">{formatPrice(pkg.price * quantity)}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-6 w-6 rounded-full border text-xs flex items-center justify-center"
              >
                -
              </button>
              <span className="text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-6 w-6 rounded-full border text-xs flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleAddToCart}>
            Keranjang
          </Button>
          <Button variant="sunrise" size="sm" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetailPage;
