      // gambar per menu
//economy 
import Bakso from '@/assets/food/menu-economy-1-bakso.jpg'
import soto from '@/assets/food/menu-economy-1-soto.jpg'
import nasgor from '@/assets/food/menu-economy-1-nasgor.jpg'
//standar
import Ayam from '@/assets/food/menu-standard-1-nasiAyam.jpg';
import Urap from '@/assets/food/menu-standard-1-nasiUrap.jpg';
import tongkol from '@/assets/food/menu-standard-1-nasiTongkol.jpg';
import rawon from '@/assets/food/menu-standard-1-nasiRawon.jpg';
import rendang from '@/assets/food/menu-standard-1-nasiRendang.jpg';
import sate from '@/assets/food/menu-standard-1-nasiSate.jpg';
//vip
import seafood from '@/assets/food/menu-vip-2-seafood.jpg'
import nusantara from '@/assets/food/menu-vip-2-nusantara.jpg'

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
        name: 'Paket 1',
        description: 'Menu bakso hangat lengkap, cocok untuk mengisi tenaga sebelum atau sesudah tour.',
        menuItems: [
          'Bakso sapi',
          'Lontong / Nasi',
          'Bakwan sayur',
          'Tahu bakso',
          'Gorengan',
          'Bihun',
          'Sayur',
          'Saus, sambal, kecap',
          'Teh',
          'Air mineral',
        ],
        pricePerPax: 35000,
        image: Bakso,
      },
      {
        id: 'economy-2',
        name: 'Paket 2',
        description: 'Menu soto ayam hangat dengan nasi, praktis dan mengenyangkan untuk perjalanan tour.',
        menuItems: [
          'Soto ayam',
          'Nasi putih',
          'Telur',
          'Bihun',
          'Kerupuk',
          'Sambal',
          'Teh',
          'Air mineral',
          ],
          pricePerPax: 35000,
          image: soto,
      },
      {
      id: 'economy-3',
      name: 'Paket 3',
      description: 'Menu nasi goreng sederhana, cocok untuk sarapan atau makan malam selama tour.',
      menuItems: [
        'Nasi goreng',
        'Telur',
        'Acar',
        'Kerupuk',
        'Teh',
        'Air mineral',
      ],
      pricePerPax: 35000,
      image: nasgor,
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
        name: 'Paket 1',
        description: 'Menu nasi putih dengan ayam goreng dan lauk lengkap.',
        menuItems: [
          'Nasi putih',
          'Ayam goreng',
          'Oseng tempe',
          'Sayur soup sosis',
          'Telur bali',
          'Mie goreng',
          'Kerupuk',
          'Sambal',
          'Teh',
          'Air mineral',
        ],
        pricePerPax: 45000,
        image: Ayam,
      },
      {
        id: 'standard-3',
        name: 'Paket 3',
        description: 'Menu nasi putih dengan urap dan ayam bumbu rujak.',
        menuItems: [
          'Nasi putih',
          'Urap-urap',
          'Pepes tahu',
          'Ayam bumbu rujak',
          'Bakwan jagung',
          'Telur balado',
          'Sambal',
          'Kerupuk',
          'Teh',
          'Kopi',
          'Air mineral',
        ],
        pricePerPax: 50000,
        image: Urap,
      },
      {
        id: 'standard-4',
        name: 'Paket 4',
        description: 'Menu nasi putih dengan sayur lodeh dan pepes tongkol.',
        menuItems: [
          'Nasi putih',
          'Sayur lodeh',
          'Pepes tongkol',
          'Bakwan jagung',
          'Telur balado',
          'Kerupuk',
          'Sambal',
          'Teh',
          'Kopi',
          'Air mineral',
        ],
        pricePerPax: 50000,
        image: tongkol,
      },
      {
        id: 'standard-5',
        name: 'Paket 5',
        description: 'Menu nasi putih dengan rawon khas Jawa Timur.',
        menuItems: [
          'Nasi putih',
          'Rawon',
          'Telur asin',
          'Tempe goreng',
          'Sambal goreng ati kentang',
          'Mie goreng',
          'Sambal',
          'Tauge',
          'Kerupuk',
          'Buah',
          'Teh',
          'Kopi',
          'Air mineral',
        ],
        pricePerPax: 60000,
        image: rawon,
      },
      {
        id: 'standard-6',
        name: 'Paket 6',
        description: 'Menu nasi putih dengan rendang sapi dan lauk lengkap.',
        menuItems: [
          'Nasi putih',
          'Rendang sapi',
          'Capjay',
          'Mie goreng',
          'Telur balado',
          'Rolade',
          'Sambal',
          'Kerupuk',
          'Buah',
          'Teh',
          'Kopi',
          'Air mineral',
        ],
        pricePerPax: 60000,
        image: rendang,
      },
      {
        id: 'standard-7',
        name: 'Paket 7',
        description: 'Menu nasi putih dengan sate ayam dan lauk pendamping.',
        menuItems: [
          'Nasi putih',
          'Sate ayam',
          'Urap-urap',
          'Telur bacem',
          'Orek tempe',
          'Mie goreng',
          'Sambal',
          'Kerupuk',
          'Buah',
          'Teh',
          'Kopi',
          'Air mineral',
        ],
        pricePerPax: 60000,
        image: sate,
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
        name: 'Menu VIP – Paket A',
        description: 'Menu sarapan outdoor premium dengan pilihan seafood dan sajian hangat.',
        menuItems: [
          'Nasi putih',
          'Udang / Cumi asam manis (pilih salah satu)',
          'Soto ayam',
          'Rolade',
          'Capcay',
          'Kerupuk',
          'Sambal',
          'Kue',
          'Buah',
          'Wedang jahe',
          'Teh / Kopi',
          'Air mineral',
        ],
        pricePerPax: 100000,
        image: seafood,
      },
      {
        id: 'vip-2',
        name: 'Menu VIP – Paket B',
        description: 'Menu sarapan outdoor eksklusif dengan lauk utama khas Nusantara.',
        menuItems: [
          'Nasi putih',
          'Rawon / Rendang (pilih salah satu)',
          'Sate ayam',
          'Capcay',
          'Telur asin',
          'Bihun jamur',
          'Buah',
          'Kerupuk',
          'Sambal',
          'Kolak ubi',
          'Kopi',
          'Teh',
          'Air mineral',
        ],
        pricePerPax: 100000,
        image: nusantara,
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
    capacity: '11-15 orang',
    includes: ['Kendaraan', 'Driver', 'BBM', 'Tiket Tol'],
    excludes: ['Parkir'],
    image: '',
  },
  {
    id: 'hiace-premio',
    name: 'Hiace Premio',
    price: 1100000,
    capacity: '11-12 orang',
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
