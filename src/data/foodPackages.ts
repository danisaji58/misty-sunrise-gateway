// Food Package Data with Tiered Menu Selection

// Import images
import menuEconomy1 from '@/assets/food/menu-economy-1.jpg';
import menuEconomy2 from '@/assets/food/menu-economy-2.jpg';
import menuStandard1 from '@/assets/food/menu-standard-1.jpg';
import menuStandard2 from '@/assets/food/menu-standard-2.jpg';
import menuVip1 from '@/assets/food/menu-vip-1.jpg';
import menuVip2 from '@/assets/food/menu-vip-2.jpg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  menuItems: string[];
  pricePerPax: number;
  image: string;
}

export interface MenuTier {
  id: string;
  name: string;
  description: string;
  packages: MenuItem[];
}

export interface PickupVehicle {
  id: string;
  name: string;
  price: number;
  capacity: string;
  includes: string[];
  excludes: string[];
  image: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  type: 'station' | 'airport';
}

export interface PickupCity {
  id: string;
  name: string;
  priceMultiplier: number;
  locations: PickupPoint[];
}

// Minimum order constants
export const MINIMUM_PARTICIPANTS = 40;
export const MINIMUM_ORDER_FEE = 300000;

// Menu Tiers with Packages
export const menuTiers: MenuTier[] = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Paket hemat untuk rombongan besar',
    packages: [
      {
        id: 'economy-1',
        name: 'Paket Nasi Goreng',
        description: 'Nasi goreng sederhana dengan telur',
        menuItems: [
          'Nasi goreng spesial',
          'Telur mata sapi',
          'Kerupuk',
          'Acar mentimun',
          'Teh manis hangat',
        ],
        pricePerPax: 25000,
        image: menuEconomy1,
      },
      {
        id: 'economy-2',
        name: 'Paket Snack Box',
        description: 'Snack box praktis untuk perjalanan',
        menuItems: [
          'Roti isi coklat/keju',
          'Pisang goreng (2 pcs)',
          'Gorengan campur',
          'Teh kotak',
          'Air mineral',
        ],
        pricePerPax: 20000,
        image: menuEconomy2,
      },
      {
        id: 'economy-3',
        name: 'Paket Bubur Ayam',
        description: 'Bubur ayam hangat untuk sarapan',
        menuItems: [
          'Bubur ayam lengkap',
          'Cakwe (2 pcs)',
          'Telur rebus',
          'Kecap & sambal',
          'Teh hangat',
        ],
        pricePerPax: 22000,
        image: menuEconomy1,
      },
      {
        id: 'economy-4',
        name: 'Paket Mie Goreng',
        description: 'Mie goreng dengan lauk telur',
        menuItems: [
          'Mie goreng jawa',
          'Telur dadar',
          'Kerupuk',
          'Sambal',
          'Es teh manis',
        ],
        pricePerPax: 23000,
        image: menuEconomy2,
      },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Paket lengkap dengan menu variatif',
    packages: [
      {
        id: 'standard-1',
        name: 'Paket Nasi Uduk Komplit',
        description: 'Nasi uduk dengan ayam goreng',
        menuItems: [
          'Nasi uduk wangi',
          'Ayam goreng kremes',
          'Tempe orek',
          'Sambal terasi',
          'Lalapan segar',
          'Es jeruk / teh hangat',
        ],
        pricePerPax: 35000,
        image: menuStandard1,
      },
      {
        id: 'standard-2',
        name: 'Paket Rendang Spesial',
        description: 'Rendang daging dengan nasi putih',
        menuItems: [
          'Nasi putih hangat',
          'Rendang daging sapi',
          'Sayur nangka',
          'Telur balado',
          'Kerupuk udang',
          'Buah potong',
          'Teh/kopi',
        ],
        pricePerPax: 40000,
        image: menuStandard2,
      },
      {
        id: 'standard-3',
        name: 'Paket Ayam Bakar',
        description: 'Ayam bakar madu dengan nasi liwet',
        menuItems: [
          'Nasi liwet',
          'Ayam bakar madu',
          'Urap sayuran',
          'Sambal bajak',
          'Kerupuk',
          'Es kelapa muda',
        ],
        pricePerPax: 38000,
        image: menuStandard1,
      },
      {
        id: 'standard-4',
        name: 'Paket Bebek Goreng',
        description: 'Bebek goreng crispy dengan sambal',
        menuItems: [
          'Nasi putih',
          'Bebek goreng crispy',
          'Lalapan lengkap',
          'Sambal korek',
          'Kerupuk',
          'Es teh manis',
        ],
        pricePerPax: 42000,
        image: menuStandard2,
      },
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    description: 'Premium dining experience',
    packages: [
      {
        id: 'vip-1',
        name: 'Paket Seafood Sunrise',
        description: 'Hidangan seafood premium dengan view sunrise',
        menuItems: [
          'Nasi kuning tumpeng mini',
          'Udang bakar madu',
          'Cumi saus padang',
          'Sayur asem segar',
          'Sambal matah',
          'Buah potong premium',
          'Jus segar',
          'Kopi/teh premium',
        ],
        pricePerPax: 75000,
        image: menuVip1,
      },
      {
        id: 'vip-2',
        name: 'Paket Wagyu Premium',
        description: 'Daging wagyu dengan sajian lengkap',
        menuItems: [
          'Nasi hainan',
          'Wagyu slice grill',
          'Sate daging premium',
          'Soup jagung',
          'Salad segar',
          'Sambal matah & kecap',
          'Fresh fruit platter',
          'Premium coffee/tea',
          'Mineral water',
        ],
        pricePerPax: 95000,
        image: menuVip2,
      },
      {
        id: 'vip-3',
        name: 'Paket Rijsttafel Bromo',
        description: 'Hidangan ala rijsttafel Indonesia',
        menuItems: [
          'Nasi tumpeng mini',
          'Ayam betutu',
          'Sate lilit',
          'Pepes ikan',
          'Urap sayuran',
          'Sambal trio (terasi, matah, bajak)',
          'Serundeng kelapa',
          'Es campur',
          'Wedang ronde',
        ],
        pricePerPax: 85000,
        image: menuVip1,
      },
      {
        id: 'vip-4',
        name: 'Paket BBQ Outdoor',
        description: 'BBQ live cooking dengan berbagai daging',
        menuItems: [
          'Nasi jagung',
          'Sosis bakar premium',
          'Chicken wings BBQ',
          'Daging slice BBQ',
          'Jagung bakar mentega',
          'Salad kentang',
          'Roti panggang',
          'BBQ sauce & mayo',
          'Minuman segar',
        ],
        pricePerPax: 80000,
        image: menuVip2,
      },
    ],
  },
];

// Pickup Vehicles (Malang prices - fixed)
export const pickupVehicles: PickupVehicle[] = [
  {
    id: 'hiace-commuter',
    name: 'Hiace Commuter',
    price: 1000000,
    capacity: '12-14 orang',
    includes: ['Kendaraan', 'Driver', 'BBM', 'Tiket Tol'],
    excludes: ['Parkir'],
    image: '',
  },
  {
    id: 'hiace-premio',
    name: 'Hiace Premio',
    price: 1100000,
    capacity: '10-12 orang',
    includes: ['Kendaraan', 'Driver', 'BBM', 'Tiket Tol'],
    excludes: ['Parkir'],
    image: '',
  },
  {
    id: 'avanza',
    name: 'Avanza',
    price: 550000,
    capacity: '6 orang',
    includes: ['Kendaraan', 'Driver', 'BBM', 'Tiket Tol'],
    excludes: ['Parkir'],
    image: '',
  },
  {
    id: 'innova-reborn',
    name: 'Innova Reborn',
    price: 650000,
    capacity: '6 orang',
    includes: ['Kendaraan', 'Driver', 'BBM', 'Tiket Tol'],
    excludes: ['Parkir'],
    image: '',
  },
];

// Pickup Cities and Locations
export const pickupCities: PickupCity[] = [
  {
    id: 'malang',
    name: 'Malang',
    priceMultiplier: 1,
    locations: [
      { id: 'kota-baru', name: 'Stasiun Kota Baru', type: 'station' },
      { id: 'kota-lama', name: 'Stasiun Kota Lama', type: 'station' },
      { id: 'abdurrahman-saleh', name: 'Bandara Abdurrahman Saleh', type: 'airport' },
    ],
  },
  {
    id: 'surabaya',
    name: 'Surabaya',
    priceMultiplier: 1.5, // 50% more expensive
    locations: [
      { id: 'gubeng', name: 'Stasiun Gubeng', type: 'station' },
      { id: 'pasar-turi', name: 'Stasiun Pasar Turi', type: 'station' },
      { id: 'juanda', name: 'Bandara Juanda', type: 'airport' },
    ],
  },
];

// Helper functions
export const getTierById = (tierId: string): MenuTier | undefined => {
  return menuTiers.find(t => t.id === tierId);
};

export const getPackageById = (tierId: string, packageId: string): MenuItem | undefined => {
  const tier = getTierById(tierId);
  return tier?.packages.find(p => p.id === packageId);
};

export const calculateMinimumOrderFee = (participants: number): number => {
  return participants < MINIMUM_PARTICIPANTS ? MINIMUM_ORDER_FEE : 0;
};

export const calculatePickupPrice = (vehicleId: string, cityId: string): number => {
  const vehicle = pickupVehicles.find(v => v.id === vehicleId);
  const city = pickupCities.find(c => c.id === cityId);
  if (!vehicle || !city) return 0;
  return Math.round(vehicle.price * city.priceMultiplier);
};
