export type CategoryType = 'jeep' | 'penginapan' | 'penjemputan' | 'makan' | 'dokumentasi';

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  features?: string[];
  popular?: boolean;
}

export interface CartItem {
  package: Package;
  quantity: number;
}

export interface CheckoutForm {
  name: string;
  tripType: 'travel' | 'pribadi';
  nationality: 'WNI' | 'WNA';
  date: string;
  participants: number;
  notes?: string;
}

export interface Category {
  id: CategoryType;
  name: string;
  description: string;
  icon: string;
}
