import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/whatsapp';
import { 
  menuTiers, 
  pickupVehicles, 
  pickupCities,
  MenuItem,
  MINIMUM_PARTICIPANTS,
  MINIMUM_ORDER_FEE,
  calculateMinimumOrderFee,
  calculatePickupPrice,
} from '@/data/foodPackages';
import { bannerMakan } from '@/assets/images';
import { carAvanza, carInnova, carHiace } from '@/assets/images';

// Map vehicle images
const vehicleImages: Record<string, string> = {
  'hiace-commuter': carHiace,
  'hiace-premio': carHiace,
  'avanza': carAvanza,
  'innova-reborn': carInnova,
};

const FoodPackageDetailPage = () => {
  const navigate = useNavigate();
  
  // State for selections
  const [selectedTier, setSelectedTier] = useState<string>(''); // No tier selected initially
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());
  
  // Handler to change tier and clear previous selections
  const handleTierChange = (tierId: string) => {
    setSelectedTier(tierId);
    setSelectedPackages(new Set()); // Clear selections when tier changes
  };
  const [participants, setParticipants] = useState<number>(20);
  
  // Pickup state
  const [selectedCity, setSelectedCity] = useState<string>('malang');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  
  // Get current tier data
  const currentTier = menuTiers.find(t => t.id === selectedTier);
  
  // Get selected packages data
  const selectedPackageData = useMemo(() => {
    const packages: MenuItem[] = [];
    menuTiers.forEach(tier => {
      tier.packages.forEach(pkg => {
        if (selectedPackages.has(pkg.id)) {
          packages.push(pkg);
        }
      });
    });
    return packages;
  }, [selectedPackages]);
  
  // Calculate prices
  const foodSubtotal = useMemo(() => {
    return selectedPackageData.reduce((sum, pkg) => sum + (pkg.pricePerPax * participants), 0);
  }, [selectedPackageData, participants]);
  
  const minimumOrderFee = calculateMinimumOrderFee(participants);
  
  const pickupPrice = useMemo(() => {
    if (!selectedVehicle || !selectedCity) return 0;
    return calculatePickupPrice(selectedVehicle, selectedCity);
  }, [selectedVehicle, selectedCity]);
  
  const totalPrice = foodSubtotal + minimumOrderFee + pickupPrice;
  
  // Toggle package selection
  const togglePackage = (packageId: string) => {
    setSelectedPackages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(packageId)) {
        newSet.delete(packageId);
      } else {
        newSet.add(packageId);
      }
      return newSet;
    });
  };
  
  // Get current city data
  const currentCity = pickupCities.find(c => c.id === selectedCity);
  
  // Handle checkout
  const handleCheckout = () => {
    // Store selection in session for checkout page
    const orderData = {
      type: 'food-package',
      tier: selectedTier,
      packages: selectedPackageData.map(p => ({
        id: p.id,
        name: p.name,
        menuItems: p.menuItems,
        pricePerPax: p.pricePerPax,
      })),
      participants,
      minimumOrderFee,
      pickup: selectedVehicle ? {
        city: currentCity?.name,
        location: currentCity?.locations.find(l => l.id === selectedLocation)?.name,
        vehicle: pickupVehicles.find(v => v.id === selectedVehicle)?.name,
        price: pickupPrice,
      } : null,
      foodSubtotal,
      totalPrice,
    };
    
    sessionStorage.setItem('foodOrderData', JSON.stringify(orderData));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={bannerMakan} 
          alt="Picnic Food Package" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Picnic Food Package
            </h1>
            <p className="text-muted-foreground">
              Nikmati hidangan lezat di tengah keindahan alam Bromo
            </p>
          </div>
        </div>
      </div>

      <main className="pb-32 lg:pb-12">
        <div className="container mx-auto px-4 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Selection Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Tier Selection */}
              <section>
                <h2 className="text-xl font-bold mb-4">Pilih Tipe Paket</h2>
                <div className="grid grid-cols-3 gap-3">
                {menuTiers.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => handleTierChange(tier.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedTier === tier.id
                          ? 'border-primary bg-primary/10 shadow-md'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{tier.name}</div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{tier.description}</p>
                    </button>
                  ))}
                </div>
              </section>

              {/* Menu Package Selection - Only show when tier is selected */}
              {selectedTier ? (
                <section>
                  <h2 className="text-xl font-bold mb-2">Pilih Menu Paket</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Anda dapat memilih lebih dari satu paket menu
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTier?.packages.map(pkg => {
                    const isSelected = selectedPackages.has(pkg.id);
                    return (
                      <Card 
                        key={pkg.id}
                        className={`overflow-hidden cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-2 ring-primary shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => togglePackage(pkg.id)}
                      >
                        <div className="aspect-video relative">
                          <img 
                            src={pkg.image} 
                            alt={pkg.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-primary-foreground text-lg">✓</span>
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="text-white font-bold">{formatPrice(pkg.pricePerPax)}/pax</div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                          
                          {/* Show menu when selected */}
                          {isSelected && (
                            <div className="mt-3 p-3 bg-secondary/50 rounded-xl">
                              <div className="text-sm font-medium mb-2">Menu:</div>
                              <ul className="space-y-1">
                                {pkg.menuItems.map((item, idx) => (
                                  <li key={idx} className="text-sm flex items-start gap-2">
                                    <span className="text-primary shrink-0">•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                  </div>
                </section>
              ) : (
                <section className="p-8 text-center bg-secondary/30 rounded-2xl border-2 border-dashed border-border">
                  <h2 className="text-xl font-bold mb-2">Pilih Tipe Paket Terlebih Dahulu</h2>
                  <p className="text-muted-foreground">
                    Silakan pilih Economy, Standard, atau VIP di atas untuk melihat menu yang tersedia
                  </p>
                </section>
              )}

              {/* Participant Count */}
              <section>
                <h2 className="text-xl font-bold mb-4">Jumlah Peserta</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 5))}
                    className="h-12 w-12 rounded-full border-2 flex items-center justify-center text-xl font-bold hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={participants}
                    onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 h-12 text-center text-xl font-bold border-2 rounded-xl bg-background"
                  />
                  <button
                    onClick={() => setParticipants(participants + 5)}
                    className="h-12 w-12 rounded-full border-2 flex items-center justify-center text-xl font-bold hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                  <span className="text-muted-foreground">orang</span>
                </div>
                
                {/* Minimum order warning */}
                {participants < MINIMUM_PARTICIPANTS && (
                  <div className="mt-4 p-4 bg-sunrise-50 border border-sunrise-200 rounded-xl">
                    <div className="font-medium text-sunrise-700">
                      Biaya tambahan berlaku
                    </div>
                    <p className="text-sm text-sunrise-600 mt-1">
                      Pesanan di bawah {MINIMUM_PARTICIPANTS} orang dikenakan biaya tambahan {formatPrice(MINIMUM_ORDER_FEE)}
                    </p>
                  </div>
                )}
              </section>

              {/* Pickup Section */}
              <section>
                <h2 className="text-xl font-bold mb-4">Penjemputan (Opsional)</h2>
                
                {/* City Selection */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Pilih Kota</label>
                  <div className="flex gap-3">
                    {pickupCities.map(city => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCity(city.id);
                          setSelectedLocation('');
                        }}
                        className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                          selectedCity === city.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {city.name}
                        {city.priceMultiplier > 1 && (
                          <span className="text-xs text-muted-foreground block">
                            (+{Math.round((city.priceMultiplier - 1) * 100)}%)
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Selection */}
                {currentCity && (
                  <div className="mb-4">
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Pilih Lokasi</label>
                    <div className="flex flex-wrap gap-2">
                      {currentCity.locations.map(loc => (
                        <button
                          key={loc.id}
                          onClick={() => setSelectedLocation(loc.id)}
                          className={`px-4 py-2 rounded-xl text-sm border transition-all ${
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
                )}

                {/* Vehicle Selection */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Pilih Kendaraan</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {pickupVehicles.map(vehicle => {
                      const adjustedPrice = calculatePickupPrice(vehicle.id, selectedCity);
                      return (
                        <button
                          key={vehicle.id}
                          onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? '' : vehicle.id)}
                          className={`rounded-xl overflow-hidden border-2 transition-all ${
                            selectedVehicle === vehicle.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="aspect-video bg-secondary">
                            <img 
                              src={vehicleImages[vehicle.id] || carAvanza} 
                              alt={vehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3 text-left">
                            <div className="font-medium text-sm">{vehicle.name}</div>
                            <div className="text-xs text-muted-foreground">{vehicle.capacity}</div>
                            <div className="font-bold text-primary text-sm mt-1">
                              {formatPrice(adjustedPrice)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  {selectedVehicle && (
                    <div className="mt-3 p-3 bg-secondary/50 rounded-xl">
                      <div className="text-sm">
                        <span className="font-medium text-green-600">Termasuk: </span>
                        {pickupVehicles.find(v => v.id === selectedVehicle)?.includes.join(', ')}
                      </div>
                      <div className="text-sm mt-1">
                        <span className="font-medium text-red-600">Tidak termasuk: </span>
                        {pickupVehicles.find(v => v.id === selectedVehicle)?.excludes.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column - Sticky Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <Card className="shadow-medium">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
                    
                    {/* Selected Tier */}
                    <div className="mb-4 p-3 bg-secondary/50 rounded-xl">
                      <div className="text-sm text-muted-foreground">Tipe Paket</div>
                      <div className="font-bold">{currentTier?.name}</div>
                    </div>
                    
                    {/* Selected Packages */}
                    {selectedPackageData.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium">Menu Dipilih:</div>
                        {selectedPackageData.map(pkg => (
                          <div key={pkg.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{pkg.name}</span>
                            <span>{formatPrice(pkg.pricePerPax)}/pax</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground mb-4">
                        Belum ada menu dipilih
                      </div>
                    )}
                    
                    {/* Participants */}
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Jumlah Peserta</span>
                      <span className="font-medium">{participants} orang</span>
                    </div>
                    
                    {/* Price Breakdown */}
                    <div className="space-y-2 py-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal Makanan</span>
                        <span>{formatPrice(foodSubtotal)}</span>
                      </div>
                      
                      {minimumOrderFee > 0 && (
                        <div className="flex justify-between text-sm text-sunrise-600">
                          <span>Biaya Min. Order (&lt;{MINIMUM_PARTICIPANTS} pax)</span>
                          <span>{formatPrice(minimumOrderFee)}</span>
                        </div>
                      )}
                      
                      {pickupPrice > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Transport</span>
                          <span>{formatPrice(pickupPrice)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between py-3 border-t">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                    
                    {/* Checkout Button */}
                    <Button
                      className="w-full mt-4"
                      variant="sunrise"
                      size="lg"
                      onClick={handleCheckout}
                      disabled={selectedPackageData.length === 0}
                    >
                      Lanjut ke Checkout
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
              {selectedPackageData.length} menu • {participants} pax
            </div>
            <div className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</div>
          </div>
          <Button
            variant="sunrise"
            onClick={handleCheckout}
            disabled={selectedPackageData.length === 0}
          >
            Checkout
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FoodPackageDetailPage;
