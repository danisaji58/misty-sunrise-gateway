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

export const generateWhatsAppMessage = (
  items: CartItem[],
  form: CheckoutForm,
  totalPrice: number
): string => {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.package.name} (${item.quantity}x) - ${formatPrice(
          item.package.price * item.quantity
        )}`
    )
    .join('\n');

  const message = `
🌄 *PESANAN BROMO TRAVEL*

━━━━━━━━━━━━━━━━━━━━━

📋 *DATA PEMESAN*
Nama: ${form.name}
Tipe: ${form.tripType === 'travel' ? 'Travel Group' : 'Pribadi'}
Kewarganegaraan: ${form.nationality}
Tanggal: ${form.date}
Jumlah Peserta: ${form.participants} orang
${form.notes ? `Catatan: ${form.notes}` : ''}

━━━━━━━━━━━━━━━━━━━━━

🛒 *DETAIL PESANAN*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━

💰 *TOTAL: ${formatPrice(totalPrice)}*

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
  const message = generateWhatsAppMessage(items, form, totalPrice);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank');
};
