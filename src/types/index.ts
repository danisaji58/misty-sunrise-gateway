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

// Extended cart item types
export type CartItemType = 'package' | 'food-picnic' | 'pickup';

// Food picnic sub-package in cart
export interface FoodPicnicSubPackage {
  id: string;
  name: string;
  menuItems: string[];
  pricePerPax: number;
}

// Food picnic cart data
export interface FoodPicnicCartData {
  tier: string;
  tierName: string;
  packages: FoodPicnicSubPackage[];
  participants: number;
  minimumOrderFee: number;
  subtotal: number;
}

// Pickup cart data
export interface PickupCartData {
  city: string;
  cityName: string;
  location: string;
  locationName: string;
  vehicle: string;
  vehicleName: string;
  vehicleCapacity: string;
  price: number;
}

// Extended cart item supporting multiple types
export interface CartItem {
  id: string; // Unique cart item ID
  type: CartItemType;
  // For regular packages
  package?: Package;
  quantity?: number;
  selectedVariant?: string;
  selectedLocation?: string;
  selectedDate?: string;
  // For food picnic
  foodPicnic?: FoodPicnicCartData;
  // For pickup
  pickup?: PickupCartData;
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
