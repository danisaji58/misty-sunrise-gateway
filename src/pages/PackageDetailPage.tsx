import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPackageById, categories } from '@/data/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { PageHeaderBanner } from '@/components/PageHeaderBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { toast } from '@/hooks/use-toast';
import {
  Clock,
  MapPin,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

const PackageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const pkg = id ? getPackageById(id) : null;
  const categoryInfo = pkg ? categories.find((c) => c.id === pkg.category) : null;

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">Paket tidak ditemukan</h1>
          <Button onClick={() => navigate('/')}>Kembali ke Beranda</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const images = pkg.images || [pkg.image];

  const handleAddToCart = () => {
    addItem(pkg);
    toast({
      title: 'Ditambahkan ke keranjang!',
      description: `${pkg.name} berhasil ditambahkan.`,
    });
  };

  const handleCheckout = () => {
    addItem(pkg);
    navigate('/checkout');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Banner */}
      <PageHeaderBanner
        title={pkg.name}
        subtitle={pkg.description}
        image={pkg.image}
      />

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={images[currentImageIndex]}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-medium"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-medium"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-primary'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${pkg.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Price & Duration */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {formatPrice(pkg.price)}
                </div>
                {pkg.duration && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    {pkg.duration}
                  </div>
                )}
              </div>

              {/* Meeting Point */}
              {pkg.meetingPoint && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/50">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Meeting Point</div>
                    <div className="font-medium">{pkg.meetingPoint}</div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
                <Button
                  size="lg"
                  variant="sunrise"
                  className="flex-1 gap-2"
                  onClick={handleCheckout}
                >
                  Checkout Sekarang
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Itinerary */}
              {pkg.itinerary && pkg.itinerary.length > 0 && (
                <Card className="border-none shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">📍 Itinerary</h3>
                    <div className="space-y-3">
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
              <div className="grid sm:grid-cols-2 gap-4">
                {pkg.includes && pkg.includes.length > 0 && (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        Termasuk
                      </h3>
                      <ul className="space-y-2">
                        {pkg.includes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {pkg.excludes && pkg.excludes.length > 0 && (
                  <Card className="border-none shadow-soft">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        Tidak Termasuk
                      </h3>
                      <ul className="space-y-2">
                        {pkg.excludes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Notes */}
              {pkg.notes && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-sunrise-50 border border-sunrise-200">
                  <AlertCircle className="h-5 w-5 text-sunrise-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-sunrise-700 mb-1">Catatan</div>
                    <p className="text-sm text-sunrise-600">{pkg.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackageDetailPage;
