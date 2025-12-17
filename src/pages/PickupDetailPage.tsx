import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/whatsapp';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { 
  pickupVehicles, 
  pickupCities,
  calculatePickupPrice,
} from '@/data/foodPackages';
import { bannerPenjemputan } from '@/assets/images';
import { carAvanza, carInnova, carHiace } from '@/assets/images';

// Map vehicle images
const vehicleImages: Record<string, string> = {
  'hiace-commuter': carHiace,
  'hiace-premio': carHiace,
  'avanza': carAvanza,
  'innova-reborn': carInnova,
};

const PickupDetailPage = () => {
  const { addPickup } = useCart();
  
  // Pickup state
  const [selectedCity, setSelectedCity] = useState<string>('malang');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  
  // Get current city data
  const currentCity = pickupCities.find(c => c.id === selectedCity);
  
  // Calculate pickup price
  const pickupPrice = useMemo(() => {
    if (!selectedVehicle || !selectedCity) return 0;
    return calculatePickupPrice(selectedVehicle, selectedCity);
  }, [selectedVehicle, selectedCity]);
  
  // Get selected vehicle data
  const selectedVehicleData = pickupVehicles.find(v => v.id === selectedVehicle);
  const selectedLocationData = currentCity?.locations.find(l => l.id === selectedLocation);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVehicle) {
      toast({
        title: 'Pilih kendaraan',
        description: 'Silakan pilih kendaraan untuk penjemputan.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!selectedLocation) {
      toast({
        title: 'Pilih lokasi',
        description: 'Silakan pilih lokasi penjemputan.',
        variant: 'destructive',
      });
      return;
    }

    addPickup({
      city: selectedCity,
      cityName: currentCity?.name || selectedCity,
      location: selectedLocation,
      locationName: selectedLocationData?.name || selectedLocation,
      vehicle: selectedVehicle,
      vehicleName: selectedVehicleData?.name || selectedVehicle,
      vehicleCapacity: selectedVehicleData?.capacity || '',
      price: pickupPrice,
    });

    toast({
      title: 'Ditambahkan ke keranjang',
      description: `Penjemputan ${selectedVehicleData?.name} berhasil ditambahkan.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={bannerPenjemputan} 
          alt="Pickup Service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Layanan Penjemputan
            </h1>
            <p className="text-muted-foreground">
              Antar jemput bandara & stasiun menuju Bromo
            </p>
          </div>
        </div>
      </div>

      <main className="pb-32 lg:pb-12">
        <div className="container mx-auto px-4 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Selection Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* City Selection */}
              <section>
                <h2 className="text-xl font-bold mb-4">Pilih Kota</h2>
                <div className="flex gap-3">
                  {pickupCities.map(city => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city.id);
                        setSelectedLocation('');
                      }}
                      className={`px-6 py-4 rounded-2xl border-2 font-medium transition-all flex-1 text-left ${
                        selectedCity === city.id
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{city.name}</div>
                      {city.priceMultiplier > 1 && (
                        <span className="text-sm text-muted-foreground">
                          +{Math.round((city.priceMultiplier - 1) * 100)}% dari harga dasar
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Location Selection */}
              {currentCity && (
                <section>
                  <h2 className="text-xl font-bold mb-4">Pilih Lokasi Penjemputan</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {currentCity.locations.map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedLocation === loc.id
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium">{loc.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{loc.type}</div>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {/* Vehicle Selection */}
              <section>
                <h2 className="text-xl font-bold mb-4">Pilih Kendaraan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pickupVehicles.map(vehicle => {
                    const adjustedPrice = calculatePickupPrice(vehicle.id, selectedCity);
                    const isSelected = selectedVehicle === vehicle.id;
                    return (
                      <Card
                        key={vehicle.id}
                        onClick={() => setSelectedVehicle(vehicle.id)}
                        className={`overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? 'ring-2 ring-primary shadow-lg'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className="aspect-video bg-secondary relative">
                          <img 
                            src={vehicleImages[vehicle.id] || carAvanza} 
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-primary-foreground text-lg">✓</span>
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="text-white font-bold">{formatPrice(adjustedPrice)}</div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1">{vehicle.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">Kapasitas: {vehicle.capacity}</p>
                          
                          {isSelected && (
                            <div className="space-y-2">
                              <div className="p-3 bg-green-50 rounded-xl">
                                <div className="text-sm font-medium text-green-700 mb-1">Termasuk:</div>
                                <ul className="text-sm text-green-600 space-y-1">
                                  {vehicle.includes.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="text-green-500">✓</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-3 bg-red-50 rounded-xl">
                                <div className="text-sm font-medium text-red-700 mb-1">Tidak termasuk:</div>
                                <ul className="text-sm text-red-600 space-y-1">
                                  {vehicle.excludes.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="text-red-500">✗</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column - Sticky Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <Card className="shadow-medium">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
                    
                    {/* Selected City */}
                    <div className="mb-4 p-3 bg-secondary/50 rounded-xl">
                      <div className="text-sm text-muted-foreground">Kota</div>
                      <div className="font-bold">{currentCity?.name || '-'}</div>
                    </div>
                    
                    {/* Selected Location */}
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Lokasi</span>
                      <span className="font-medium">{selectedLocationData?.name || 'Belum dipilih'}</span>
                    </div>
                    
                    {/* Selected Vehicle */}
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Kendaraan</span>
                      <span className="font-medium">{selectedVehicleData?.name || 'Belum dipilih'}</span>
                    </div>
                    
                    {selectedVehicleData && (
                      <div className="flex justify-between py-2 border-t">
                        <span className="text-muted-foreground">Kapasitas</span>
                        <span className="font-medium">{selectedVehicleData.capacity}</span>
                      </div>
                    )}
                    
                    {/* Total */}
                    <div className="flex justify-between py-3 border-t mt-2">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl text-primary">{formatPrice(pickupPrice)}</span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <Button
                      className="w-full mt-4"
                      variant="sunrise"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!selectedVehicle || !selectedLocation}
                    >
                      Tambah ke Keranjang
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 lg:hidden z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              {selectedVehicleData?.name || 'Pilih kendaraan'}
            </div>
            <div className="text-xl font-bold text-primary">{formatPrice(pickupPrice)}</div>
          </div>
          <Button
            variant="sunrise"
            onClick={handleAddToCart}
            disabled={!selectedVehicle || !selectedLocation}
          >
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PickupDetailPage;
