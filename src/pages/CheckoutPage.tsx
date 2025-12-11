import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { PageHeaderBanner } from '@/components/PageHeaderBanner';
import { useCart } from '@/context/CartContext';
import { formatPrice, openWhatsApp } from '@/utils/whatsapp';
import { CheckoutForm } from '@/types';
import { 
  User, 
  Calendar, 
  Users, 
  Globe, 
  Briefcase,
  MessageCircle,
  Trash2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart, removeItem } = useCart();
  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    tripType: 'pribadi',
    nationality: 'WNI',
    date: '',
    participants: 1,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.date) {
      toast({
        title: 'Data tidak lengkap',
        description: 'Mohon lengkapi nama dan tanggal perjalanan.',
        variant: 'destructive',
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: 'Keranjang kosong',
        description: 'Tambahkan paket terlebih dahulu.',
        variant: 'destructive',
      });
      return;
    }

    openWhatsApp(items, form, totalPrice);
    clearCart();
    toast({
      title: 'Pesanan terkirim!',
      description: 'Kami akan segera merespons via WhatsApp.',
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CartSidebar />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-display font-bold mb-4">
                Keranjang Kosong
              </h1>
              <p className="text-muted-foreground mb-8">
                Belum ada paket di keranjang. Yuk pilih paket perjalanan impianmu!
              </p>
              <Button onClick={() => navigate('/packages/jeep')}>
                Lihat Paket Jeep
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar />

      {/* Page Header Banner */}
      <PageHeaderBanner
        title="Checkout"
        subtitle="Lengkapi data pemesanan dan kirim pesanan via WhatsApp"
        image="/images/hero-bromo.jpg"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Data Pemesanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Masukkan nama lengkap"
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    {/* Trip Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        Tipe Perjalanan
                      </label>
                      <div className="flex gap-4">
                        {[
                          { value: 'pribadi', label: 'Pribadi' },
                          { value: 'travel', label: 'Travel Group' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              form.tripType === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-input hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="tripType"
                              value={option.value}
                              checked={form.tripType === option.value}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  tripType: e.target.value as 'travel' | 'pribadi',
                                })
                              }
                              className="sr-only"
                            />
                            <span className="font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Nationality */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        Kewarganegaraan
                      </label>
                      <div className="flex gap-4">
                        {[
                          { value: 'WNI', label: 'WNI (Indonesia)' },
                          { value: 'WNA', label: 'WNA (Asing)' },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              form.nationality === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-input hover:border-primary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="nationality"
                              value={option.value}
                              checked={form.nationality === option.value}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  nationality: e.target.value as 'WNI' | 'WNA',
                                })
                              }
                              className="sr-only"
                            />
                            <span className="font-medium">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Tanggal Perjalanan
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                      />
                    </div>

                    {/* Participants */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Jumlah Peserta
                      </label>
                      <input
                        type="number"
                        value={form.participants}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            participants: parseInt(e.target.value) || 1,
                          })
                        }
                        min={1}
                        max={50}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Catatan (Opsional)
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        placeholder="Permintaan khusus atau catatan tambahan..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="sunrise"
                      className="w-full gap-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Kirim Pesanan via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.package.id}
                      className="flex items-start gap-3 pb-4 border-b border-border/50 last:border-0"
                    >
                      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                        {item.package.category === 'jeep' && '🚙'}
                        {item.package.category === 'penginapan' && '🏨'}
                        {item.package.category === 'penjemputan' && '✈️'}
                        {item.package.category === 'makan' && '🍱'}
                        {item.package.category === 'dokumentasi' && '📸'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {item.package.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}x {formatPrice(item.package.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {formatPrice(item.package.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.package.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      * Harga dapat berubah sesuai konfirmasi admin
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
