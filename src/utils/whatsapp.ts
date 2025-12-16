import { CartItem, CheckoutForm } from '@/types';

const WHATSAPP_NUMBER = '6281234567890'; // Replace with actual number

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Generate WhatsApp message for all cart items (merged)
export const generateMergedWhatsAppMessage = (
  items: CartItem[],
  form: CheckoutForm,
  totalPrice: number
): string => {
  const sections: string[] = [];

  // Customer Data Section
  sections.push(`📋 *DATA PEMESAN*
Nama: ${form.name}
Tipe: ${form.tripType === 'travel' ? 'Travel Group' : 'Pribadi'}
Kewarganegaraan: ${form.nationality}
Tanggal: ${form.date}
Jumlah Peserta: ${form.participants} orang${form.notes ? `\nCatatan: ${form.notes}` : ''}`);

  // Regular Packages Section
  const regularPackages = items.filter(item => item.type === 'package');
  if (regularPackages.length > 0) {
    const packagesList = regularPackages
      .map(item => {
        const pkg = item.package!;
        const qty = item.quantity || 1;
        return `• ${pkg.name} (${qty}x) - ${formatPrice(pkg.price * qty)}`;
      })
      .join('\n');
    
    sections.push(`🎫 *PAKET WISATA*
${packagesList}`);
  }

  // Food Picnic Section
  const foodPicnic = items.find(item => item.type === 'food-picnic');
  if (foodPicnic?.foodPicnic) {
    const fp = foodPicnic.foodPicnic;
    const packagesList = fp.packages
      .map(pkg => {
        const menuList = pkg.menuItems.map(item => `    - ${item}`).join('\n');
        return `• ${pkg.name} (${formatPrice(pkg.pricePerPax)}/pax)\n${menuList}`;
      })
      .join('\n\n');
    
    let priceBreakdown = `Subtotal: ${formatPrice(fp.subtotal)}`;
    if (fp.minimumOrderFee > 0) {
      priceBreakdown += `\nBiaya Min. Order (<40 pax): ${formatPrice(fp.minimumOrderFee)}`;
    }

    sections.push(`🍱 *PICNIC FOOD PACKAGE - ${fp.tierName.toUpperCase()}*
Peserta: ${fp.participants} orang

${packagesList}

${priceBreakdown}
Total Food: ${formatPrice(fp.subtotal + fp.minimumOrderFee)}`);
  }

  // Pickup Section
  const pickup = items.find(item => item.type === 'pickup');
  if (pickup?.pickup) {
    const pu = pickup.pickup;
    sections.push(`🚗 *PENJEMPUTAN*
Kota: ${pu.cityName}
Lokasi: ${pu.locationName}
Kendaraan: ${pu.vehicleName} (${pu.vehicleCapacity})
Harga: ${formatPrice(pu.price)}`);
  }

  const message = `
🌄 *PESANAN AJIRA BROMO TRAVEL*

━━━━━━━━━━━━━━━━━━━━━

${sections.join('\n\n━━━━━━━━━━━━━━━━━━━━━\n\n')}

━━━━━━━━━━━━━━━━━━━━━

💰 *GRAND TOTAL: ${formatPrice(totalPrice)}*

━━━━━━━━━━━━━━━━━━━━━

Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
`.trim();

  return message;
};

// Legacy function for backward compatibility
export const generateWhatsAppMessage = (
  items: CartItem[],
  form: CheckoutForm,
  totalPrice: number
): string => {
  return generateMergedWhatsAppMessage(items, form, totalPrice);
};

// Food Package Order Interface (legacy, kept for compatibility)
export interface FoodOrderData {
  type: 'food-package';
  tier: string;
  packages: {
    id: string;
    name: string;
    menuItems: string[];
    pricePerPax: number;
  }[];
  participants: number;
  minimumOrderFee: number;
  pickup: {
    city: string;
    location: string;
    vehicle: string;
    price: number;
  } | null;
  foodSubtotal: number;
  totalPrice: number;
}

export const generateFoodPackageMessage = (
  form: CheckoutForm,
  orderData: FoodOrderData
): string => {
  // Build menu packages list
  const packagesList = orderData.packages
    .map(pkg => {
      const menuList = pkg.menuItems.map(item => `    - ${item}`).join('\n');
      return `• ${pkg.name} (${formatPrice(pkg.pricePerPax)}/pax)\n${menuList}`;
    })
    .join('\n\n');

  // Build pickup section if selected
  const pickupSection = orderData.pickup
    ? `
━━━━━━━━━━━━━━━━━━━━━

🚗 *PENJEMPUTAN*
Kota: ${orderData.pickup.city}
Lokasi: ${orderData.pickup.location}
Kendaraan: ${orderData.pickup.vehicle}
Harga: ${formatPrice(orderData.pickup.price)}`
    : '';

  // Build price breakdown
  let priceBreakdown = `Subtotal Makanan: ${formatPrice(orderData.foodSubtotal)}`;
  
  if (orderData.minimumOrderFee > 0) {
    priceBreakdown += `\nBiaya Min. Order (<40 pax): ${formatPrice(orderData.minimumOrderFee)}`;
  }
  
  if (orderData.pickup) {
    priceBreakdown += `\nTransport: ${formatPrice(orderData.pickup.price)}`;
  }

  const message = `
🌄 *PESANAN PICNIC FOOD PACKAGE*
*AjiraBromo Travel*

━━━━━━━━━━━━━━━━━━━━━

📋 *DATA PEMESAN*
Nama: ${form.name}
Tipe: ${form.tripType === 'travel' ? 'Travel Group' : 'Pribadi'}
Kewarganegaraan: ${form.nationality}
Tanggal: ${form.date}
Jumlah Peserta: ${form.participants} orang
${form.notes ? `Catatan: ${form.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━

🍱 *PAKET MAKANAN - ${orderData.tier.toUpperCase()}*

${packagesList}
${pickupSection}

━━━━━━━━━━━━━━━━━━━━━

💳 *RINCIAN HARGA*
${priceBreakdown}

━━━━━━━━━━━━━━━━━━━━━

💰 *TOTAL: ${formatPrice(orderData.totalPrice)}*

━━━━━━━━━━━━━━━━━━━━━

Mohon konfirmasi ketersediaan dan detail pembayaran. Terima kasih! 🙏
`.trim();

  return message;
};

export const openWhatsApp = (
  items: CartItem[],
  form: CheckoutForm,
  totalPrice: number
): void => {
  const message = generateMergedWhatsAppMessage(items, form, totalPrice);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

export const openFoodPackageWhatsApp = (
  form: CheckoutForm,
  orderData: FoodOrderData
): void => {
  const message = generateFoodPackageMessage(form, orderData);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};
