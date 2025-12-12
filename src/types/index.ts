export type CategoryType = 'jeep' | 'penginapan' | 'penjemputan' | 'makan' | 'dokumentasi';

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  images?: string[];
  features?: string[];
  popular?: boolean;
  duration?: string;
  itinerary?: string[];
  includes?: string[];
  excludes?: string[];
  meetingPoint?: string;
  notes?: string;
  capacity?: string;
}

export interface CartItem {
  package: Package;
  quantity: number;
  selectedVariant?: string;
  selectedLocation?: string;
  selectedDate?: string;
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
  image?: string;
  bannerImage?: string;
  bannerSubtitle?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export interface PickupLocation {
  id: string;
  name: string;
  area: string;
}
