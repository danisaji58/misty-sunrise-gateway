import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/whatsapp';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { getPackageById } from '@/data/packages';
import { bannerMakan, snackBox, fullMeal, } from '@/assets/images';

// Regular food menu items (simpler than picnic)
const regularFoodMenus: Record<string, Array<{
  id: string;
  name: string;
  description: string;
  menuItems: string[];
  pricePerPax: number;
  image: string;
}>> = {
  'snack-box': [
    {
      id: 'snack-1', // tetap
      name: 'Coffee Break Opsi 1',
      description: '2 kue pilihan + teh & kopi.',
      menuItems: [
        '2 kue pilihan',
        'Teh',
        'Kopi',
      ],
      pricePerPax: 15000,
      image: snackBox,
    },
    {
      id: 'snack-2', // tetap
      name: 'Coffee Break Opsi 2',
      description: '2 kue pilihan + pokak & kopi.',
      menuItems: [
        '2 kue pilihan',
        'Pokak',
        'Kopi',
      ],
      pricePerPax: 15000,
      image: snackBox,
    },
    {
      id: 'snack-3', // tetap
      name: 'Coffee Break Opsi 3',
      description: '3 kue pilihan + teh & kopi.',
      menuItems: [
        '3 kue pilihan',
        'Teh',
        'Kopi',
      ],
      pricePerPax: 20000,
      image: snackBox,
    },
    {
      id: 'snack-4',
      name: 'Coffee Break Opsi 4',
      description: '3 kue pilihan + pokak & kopi.',
      menuItems: [
        '3 kue pilihan',
        'Pokak',
        'Kopi',
      ],
      pricePerPax: 20000,
      image: snackBox,
    },
    {
      id: 'snack-5',
      name: 'Coffee Break Opsi 5',
      description: 'Polo pendem + teh & kopi.',
      menuItems: [
        'Polo pendem',
        'Teh',
        'Kopi',
      ],
      pricePerPax: 15000,
      image: snackBox,
    },


  ],
  'makan-lengkap': [
    {
  id: 'akasia-a',
  name: 'Paket Akasia A (Soto)',
  description: 'Paket makan piknik Akasia A',
  menuItems: [
    'Nasi putih',
    'Ayam suir',
    'Telur 1/2',
    'Bihun + touge + kentang kering',
    'Kerupuk + sambal + koya + seledri',
    'Air mineral',
    'Teh / es teh'
  ],
  pricePerPax: 35000,
  image: fullMeal,
},
{
  id: 'akasia-b',
  name: 'Paket Akasia B',
  description: 'Paket makan piknik Akasia B',
  menuItems: [
    'Nasi putih',
    'Ayam kare',
    'Mie goreng',
    'Bakwan jagung',
    'Orek tempe',
    'Timun + sambal + kerupuk',
    'Air mineral',
    'Teh / es teh'
  ],
  pricePerPax: 40000,
  image: fullMeal,
},
{
  id: 'akasia-c',
  name: 'Paket Akasia C',
  description: 'Paket makan piknik Akasia C',
  menuItems: [
    'Nasi putih',
    'Ayam kare',
    'Mie goreng',
    'Bakwan jagung',
    'Orek tempe',
    'Telur bali',
    'Timun',
    'Sambal basah / kering',
    'Kerupuk',
    'Air mineral',
    'Teh / es teh',
    'Kopi'
  ],
  pricePerPax: 55000,
  image: fullMeal,
},
{
  id: 'bromo-a',
  name: 'Paket Bromo A',
  description: 'Paket makan kotakan Bromo A',
  menuItems: [
    'Nasi putih',
    'Ayam goreng / ukep / kecap / bakar',
    'Bihun / mie goreng',
    'Kentang kering / cah sayur',
    'Timun + sambal',
    'Air mineral'
  ],
  pricePerPax: 20000,
  image: fullMeal,
},
{
  id: 'bromo-b',
  name: 'Paket Bromo B',
  description: 'Paket makan kotakan Bromo B',
  menuItems: [
    'Nasi putih',
    'Ayam kare',
    'Urap-urap',
    'Tempe bacem'
  ],
  pricePerPax: 20000,
  image: fullMeal,
},
{
  id: 'tengger-a',
  name: 'Paket Tengger A',
  description: 'Paket makan kotakan Tengger A',
  menuItems: [
    'Nasi putih',
    'Ayam suwir bumbu merah / ayam filet / ayam goreng telur',
    'Capcay',
    'Perkedel',
    'Sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 25000,
  image: fullMeal,
},
{
  id: 'tengger-b',
  name: 'Paket Tengger B',
  description: 'Paket makan kotakan Tengger B',
  menuItems: [
    'Nasi putih',
    'Ayam goreng telur / ayam filet krispi',
    'Krengsengan tahu ati / sambal goreng kentang basah / tumis wortel buncis',
    '1/2 telur asin / telur mata sapi',
    'Timun + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 25000,
  image: fullMeal,
},
{
  id: 'tengger-c',
  name: 'Paket Tengger C',
  description: 'Paket makan kotakan Tengger C',
  menuItems: [
    'Nasi putih',
    'Udang balado',
    'Tahu & tempe bacem',
    'Cah sayur',
    'Timun + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 25000,
  image: fullMeal,
},
{
  id: 'tengger-d',
  name: 'Paket Tengger D',
  description: 'Paket makan kotakan Tengger D',
  menuItems: [
    'Nasi putih',
    'Ayam panggang / kare',
    'Urap-urap',
    'Tahu & tempe bacem',
    'Timun + sambal + rempeyek',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 25000,
  image: fullMeal,
},
{
  id: 'semeru-a',
  name: 'Paket Semeru A',
  description: 'Paket makan Semeru A',
  menuItems: [
    'Nasi putih',
    'Sayur & pecel',
    'Tempe goreng',
    'Ayam goreng potong / daging sapi',
    'Telur mata sapi',
    'Timun + sambal + rempeyek',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 30000,
  image: fullMeal,
},
{
  id: 'semeru-b',
  name: 'Paket Semeru B',
  description: 'Paket makan Semeru B',
  menuItems: [
    'Nasi putih',
    'Gurami asam manis',
    '1/2 telur asin',
    'Bihun goreng',
    'Timun + sambal + selada',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 30000,
  image: fullMeal,
},
{
  id: 'semeru-c',
  name: 'Paket Semeru C',
  description: 'Paket makan Semeru C',
  menuItems: [
    'Nasi putih',
    'Cumi asam manis / sate komo',
    'Kentang kering',
    'Sospen lada hitam',
    'Tempe goreng',
    'Sambal + kerupuk',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 30000,
  image: fullMeal,
},
{
  id: 'jawa-1a',
  name: 'Paket Jawa 1A',
  description: 'Paket prasmanan Jawa 1A',
  menuItems: [
    'Nasi putih',
    'Sayur asem Jakarta',
    'Dadar jagung',
    'Pepes',
    'Ayam goreng',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 27500,
  image: fullMeal,
},
{
  id: 'jawa-2b',
  name: 'Paket Jawa 2B (Best Seller)',
  description: 'Paket prasmanan Jawa 2B',
  menuItems: [
    'Nasi putih',
    'Pecel Tengger',
    'Ayam goreng / sate komo',
    'Tempe mendoan',
    'Telur dadar / telur asin',
    'Rempeyek + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 32500,
  image: fullMeal,
},
{
  id: 'jawa-4',
  name: 'Paket Jawa 4',
  description: 'Paket prasmanan Jawa 4',
  menuItems: [
    'Nasi putih',
    'Nasi goreng',
    'Gule',
    'Sate',
    'Acar',
    'Tanghun / mie',
    'Rolade',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 42500,
  image: fullMeal,
},
{
  id: 'jawa-1b',
  name: 'Paket Jawa 1B',
  description: 'Paket prasmanan Jawa 1B',
  menuItems: [
    'Nasi putih',
    'Sayur asem Jakarta',
    'Ayam goreng',
    'Pepes',
    'Ikan asin crispy',
    'Dadar jagung',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 27500,
  image: fullMeal,
},
{
  id: 'jawa-2a',
  name: 'Paket Jawa 2A',
  description: 'Paket prasmanan Jawa 2A',
  menuItems: [
    'Nasi putih',
    'Pecel Tengger',
    'Ayam goreng',
    'Tempe mendoan',
    'Telur dadar / telur asin',
    'Rempeyek + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 32500,
  image: fullMeal,
},
{
  id: 'jawa-2c',
  name: 'Paket Jawa 2C',
  description: 'Paket prasmanan Jawa 2C',
  menuItems: [
    'Nasi putih',
    'Ayam goreng selimut telur',
    'Capcay / soup sehat',
    'Telur puyuh / pentol / sosis',
    'Tanghun',
    'Rolade',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 32500,
  image: fullMeal,
},
{
  id: 'jawa-3a',
  name: 'Paket Jawa 3A',
  description: 'Paket prasmanan Jawa 3A',
  menuItems: [
    'Nasi putih',
    'Sayur asem',
    'Lodeh manis',
    'Ayam bakar / sate',
    'Sate telur puyuh bacem',
    'Cah kangkung udang mungil',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 37500,
  image: fullMeal,
},
{
  id: 'jawa-3b',
  name: 'Paket Jawa 3B',
  description: 'Paket prasmanan Jawa 3B',
  menuItems: [
    'Nasi putih',
    'Sate komo / ayam bakar',
    'Soup',
    'Bakso',
    'Udang crispy',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 37500,
  image: fullMeal,
},
{
  id: 'jawa-3c',
  name: 'Paket Jawa 3C',
  description: 'Paket prasmanan Jawa 3C',
  menuItems: [
    'Nasi putih',
    'Rawon / soto ayam',
    'Tempe goreng',
    'Telur asin',
    'Empal daging',
    'Kecambah',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 37500,
  image: fullMeal,
},
{
  id: 'jawa-3d',
  name: 'Paket Jawa 3D',
  description: 'Paket prasmanan Jawa 3D',
  menuItems: [
    'Nasi putih',
    'Soup',
    'Sate ayam',
    'Udang crispy',
    'Tanghun',
    'Kerupuk + sambal',
    'Buah',
    'Air mineral'
  ],
  pricePerPax: 37500,
  image: fullMeal,
},

  ],
};

const RegularFoodDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const packageData = id ? getPackageById(id) : null;
  const menuKey = id === 'snack-box' ? 'snack-box' : 'makan-lengkap';
  const menus = regularFoodMenus[menuKey] || regularFoodMenus['snack-box'];
  
  // State for selections
  const [selectedMenus, setSelectedMenus] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState<number>(1);
  
  // Get selected menu data
  const selectedMenuData = useMemo(() => {
    return menus.filter(menu => selectedMenus.has(menu.id));
  }, [selectedMenus, menus]);
  
  // Calculate total price
  const totalPrice = useMemo(() => {
    return selectedMenuData.reduce((sum, menu) => sum + (menu.pricePerPax * quantity), 0);
  }, [selectedMenuData, quantity]);
  
  // Toggle menu selection
  const toggleMenu = (menuId: string) => {
    setSelectedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedMenuData.length === 0) {
      toast({
        title: 'Pilih menu terlebih dahulu',
        description: 'Silakan pilih minimal satu paket menu.',
        variant: 'destructive',
      });
      return;
    }

    if (packageData) {
      // Create a custom package with selected menus - price already includes quantity
      const customPackage = {
        ...packageData,
        id: `${packageData.id}-${Date.now()}`, // Unique ID to allow multiple different selections
        price: totalPrice,
        features: selectedMenuData.flatMap(m => m.menuItems),
        description: `${selectedMenuData.map(m => m.name).join(' + ')} (${quantity} porsi)`,
      };
      
      addItem(customPackage);

      toast({
        title: 'Ditambahkan ke keranjang',
        description: `${packageData.name} berhasil ditambahkan.`,
      });
    }
  };

  if (!packageData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Paket tidak ditemukan</h1>
          <Button onClick={() => navigate('/packages/makan')} className="mt-4">
            Kembali ke Menu Makanan
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={packageData.image || bannerMakan} 
          alt={packageData.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {packageData.name}
            </h1>
            <p className="text-muted-foreground">
              {packageData.description}
            </p>
          </div>
        </div>
      </div>

      <main className="pb-32 lg:pb-12">
        <div className="container mx-auto px-4 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Column - Selection Area */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Menu Selection */}
              <section>
                <h2 className="text-xl font-bold mb-2">Pilih Menu</h2>                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menus.map(menu => {
                    const isSelected = selectedMenus.has(menu.id);
                    return (
                      <Card 
                        key={menu.id}
                        className={`overflow-hidden cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-2 ring-primary shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => toggleMenu(menu.id)}
                      >
                        <div className="aspect-video relative bg-secondary">
                          <img 
                            src={menu.image} 
                            alt={menu.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-primary-foreground text-lg">✓</span>
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <div className="text-white font-bold">{formatPrice(menu.pricePerPax)}/pax</div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1">{menu.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{menu.description}</p>
                          
                          {/* Show menu when selected */}
                          {isSelected && (
                            <div className="mt-3 p-3 bg-secondary/50 rounded-xl">
                              <div className="text-sm font-medium mb-2">Menu:</div>
                              <ul className="space-y-1">
                                {menu.menuItems.map((item, idx) => (
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

              {/* Quantity */}
              <section>
                <h2 className="text-xl font-bold mb-4">Jumlah Porsi</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 rounded-full border-2 flex items-center justify-center text-xl font-bold hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 h-12 text-center text-xl font-bold border-2 rounded-xl bg-background"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 rounded-full border-2 flex items-center justify-center text-xl font-bold hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                  <span className="text-muted-foreground">porsi</span>
                </div>
              </section>
            </div>

            {/* Right Column - Sticky Order Summary (Desktop) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <Card className="shadow-medium">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Ringkasan Pesanan</h3>
                    
                    {/* Package Type */}
                    <div className="mb-4 p-3 bg-secondary/50 rounded-xl">
                      <div className="text-sm text-muted-foreground">Paket</div>
                      <div className="font-bold">{packageData.name}</div>
                    </div>
                    
                    {/* Selected Menus */}
                    {selectedMenuData.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        <div className="text-sm font-medium">Menu Dipilih:</div>
                        {selectedMenuData.map(menu => (
                          <div key={menu.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{menu.name}</span>
                            <span>{formatPrice(menu.pricePerPax)}/pax</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground mb-4">
                        Belum ada menu dipilih
                      </div>
                    )}
                    
                    {/* Quantity */}
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Jumlah Porsi</span>
                      <span className="font-medium">{quantity} porsi</span>
                    </div>
                    
                    {/* Total */}
                    <div className="flex justify-between py-3 border-t">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <Button
                      className="w-full mt-4"
                      variant="sunrise"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={selectedMenuData.length === 0}
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
              {selectedMenuData.length} menu • {quantity} porsi
            </div>
            <div className="text-xl font-bold text-primary">{formatPrice(totalPrice)}</div>
          </div>
          <Button
            variant="sunrise"
            onClick={handleAddToCart}
            disabled={selectedMenuData.length === 0}
          >
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegularFoodDetailPage;
