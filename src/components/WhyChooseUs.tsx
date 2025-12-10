import { 
  Shield, 
  MessageCircle, 
  Wallet, 
  Clock,
  Star,
  Users
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Shield,
    title: 'One Gate Solution',
    description: 'Semua kebutuhan perjalanan Bromo dalam satu platform. Mudah, cepat, dan terpercaya.',
  },
  {
    icon: Wallet,
    title: 'Harga Fleksibel',
    description: 'Berbagai pilihan paket sesuai budget. Nego? Bisa banget!',
  },
  {
    icon: MessageCircle,
    title: 'Fast WhatsApp Checkout',
    description: 'Pesan langsung via WhatsApp, respon cepat dan konfirmasi instan.',
  },
  {
    icon: Clock,
    title: 'Jadwal Fleksibel',
    description: 'Bebas atur waktu keberangkatan sesuai keinginan Anda.',
  },
  {
    icon: Star,
    title: 'Driver Berpengalaman',
    description: 'Tim lokal yang mengenal setiap sudut Bromo untuk pengalaman terbaik.',
  },
  {
    icon: Users,
    title: 'Cocok untuk Semua',
    description: 'Solo traveler, keluarga, atau rombongan besar? Kami siap melayani.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Mengapa Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4">
            Kenapa Pilih Bromo Travel?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman perjalanan terbaik dengan kemudahan 
            booking dan harga transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 animate-fade-up group hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
