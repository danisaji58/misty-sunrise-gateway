import { Package, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'jeep',
    name: 'Paket Jeep',
    description: 'Jelajahi Bromo dengan jeep 4x4 yang tangguh',
    icon: '🚙',
  },
  {
    id: 'penginapan',
    name: 'Penginapan',
    description: 'Villa, hotel, dan homestay nyaman',
    icon: '🏨',
  },
  {
    id: 'penjemputan',
    name: 'Penjemputan',
    description: 'Antar jemput bandara & stasiun',
    icon: '✈️',
  },
  {
    id: 'makan',
    name: 'Makan',
    description: 'Paket sarapan, snack, dan picnic',
    icon: '🍱',
  },
  {
    id: 'dokumentasi',
    name: 'Dokumentasi',
    description: 'Foto & video profesional',
    icon: '📸',
  },
];

export const packages: Package[] = [
  // Jeep Packages
  {
    id: 'jeep-sunrise',
    name: 'Sunrise Tour',
    description: 'Nikmati keindahan sunrise dari View Point 1 dengan jeep 4x4. Termasuk ke kawah dan pasir berbisik.',
    price: 450000,
    category: 'jeep',
    image: '/placeholder.svg',
    features: ['View Point 1', 'Kawah Bromo', 'Pasir Berbisik', 'Savana', 'Durasi 4-5 jam'],
    popular: true,
  },
  {
    id: 'jeep-milkyway',
    name: 'Milky Way Tour',
    description: 'Tour malam untuk melihat galaksi Milky Way yang spektakuler di atas Bromo.',
    price: 550000,
    category: 'jeep',
    image: '/placeholder.svg',
    features: ['Milky Way Spot', 'View Point 1', 'Kawah Bromo', 'Durasi 6-7 jam'],
    popular: true,
  },
  {
    id: 'jeep-complete',
    name: 'Complete Tour',
    description: 'Paket lengkap sunrise + all spot wisata Bromo dalam satu hari.',
    price: 650000,
    category: 'jeep',
    image: '/placeholder.svg',
    features: ['Sunrise', 'Kawah', 'Savana', 'Bukit Teletubbies', 'Air Terjun Madakaripura', 'Durasi 8-9 jam'],
  },
  {
    id: 'jeep-budget',
    name: 'Budget Tour',
    description: 'Paket hemat untuk backpacker, tetap seru!',
    price: 350000,
    category: 'jeep',
    image: '/placeholder.svg',
    features: ['Kawah Bromo', 'Pasir Berbisik', 'Savana', 'Durasi 3-4 jam'],
  },

  // Penginapan
  {
    id: 'villa-premium',
    name: 'Villa Premium',
    description: 'Villa mewah dengan pemandangan gunung dan fasilitas lengkap.',
    price: 1200000,
    category: 'penginapan',
    image: '/placeholder.svg',
    features: ['View gunung', 'AC', 'Hot shower', 'Breakfast', '4 kamar'],
    popular: true,
  },
  {
    id: 'hotel-standard',
    name: 'Hotel Bintang 3',
    description: 'Hotel nyaman dengan lokasi strategis dekat Bromo.',
    price: 500000,
    category: 'penginapan',
    image: '/placeholder.svg',
    features: ['AC', 'Hot shower', 'Breakfast', 'WiFi'],
  },
  {
    id: 'homestay-budget',
    name: 'Homestay Lokal',
    description: 'Pengalaman menginap dengan keluarga lokal yang ramah.',
    price: 200000,
    category: 'penginapan',
    image: '/placeholder.svg',
    features: ['Hot shower', 'Sarapan lokal', 'Suasana kekeluargaan'],
  },

  // Penjemputan
  {
    id: 'pickup-surabaya',
    name: 'Pickup Surabaya',
    description: 'Antar jemput dari Bandara Juanda atau Stasiun Surabaya.',
    price: 400000,
    category: 'penjemputan',
    image: '/placeholder.svg',
    features: ['AC mobil', 'Driver berpengalaman', 'Fleksibel waktu'],
    popular: true,
  },
  {
    id: 'pickup-malang',
    name: 'Pickup Malang',
    description: 'Antar jemput dari Bandara Abdul Rachman Saleh atau Stasiun Malang.',
    price: 300000,
    category: 'penjemputan',
    image: '/placeholder.svg',
    features: ['AC mobil', 'Driver berpengalaman', 'Fleksibel waktu'],
  },

  // Makan
  {
    id: 'sarapan-sunrise',
    name: 'Picnic Breakfast',
    description: 'Sarapan romantis di atas gunung sambil menikmati sunrise.',
    price: 75000,
    category: 'makan',
    image: '/placeholder.svg',
    features: ['Nasi goreng/roti', 'Kopi/teh', 'Buah', 'Set picnic'],
    popular: true,
  },
  {
    id: 'snack-box',
    name: 'Snack Box',
    description: 'Snack box untuk perjalanan touring Bromo.',
    price: 35000,
    category: 'makan',
    image: '/placeholder.svg',
    features: ['Roti', 'Gorengan', 'Air mineral', 'Snack ringan'],
  },
  {
    id: 'makan-lengkap',
    name: 'Paket Makan Lengkap',
    description: 'Breakfast + lunch + snack untuk sehari penuh.',
    price: 150000,
    category: 'makan',
    image: '/placeholder.svg',
    features: ['Breakfast', 'Lunch', 'Snack', 'Minuman'],
  },

  // Dokumentasi
  {
    id: 'foto-basic',
    name: 'Foto Basic',
    description: 'Dokumentasi foto selama tour dengan fotografer lokal.',
    price: 200000,
    category: 'dokumentasi',
    image: '/placeholder.svg',
    features: ['30 foto edit', 'Soft copy', 'Durasi tour'],
  },
  {
    id: 'foto-premium',
    name: 'Foto + Video',
    description: 'Paket lengkap foto dan video cinematic.',
    price: 500000,
    category: 'dokumentasi',
    image: '/placeholder.svg',
    features: ['50 foto edit', 'Video 3 menit', 'Drone shot', 'Soft copy'],
    popular: true,
  },
  {
    id: 'prewedding',
    name: 'Prewedding Package',
    description: 'Paket khusus foto prewedding di Bromo.',
    price: 2500000,
    category: 'dokumentasi',
    image: '/placeholder.svg',
    features: ['100 foto edit', 'Video cinematic', 'Drone', 'All spot', 'MUA available'],
  },
];

export const getPackagesByCategory = (category: string) => {
  return packages.filter((pkg) => pkg.category === category);
};

export const getPopularPackages = () => {
  return packages.filter((pkg) => pkg.popular);
};

export const getPackageById = (id: string) => {
  return packages.find((pkg) => pkg.id === id);
};
