import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Siap Menjelajah Bromo?
            </h2>
            <p className="text-background/70 mb-8">
              Hubungi kami sekarang dan dapatkan penawaran terbaik untuk perjalanan impian Anda.
            </p>
            <Button
              size="xl"
              variant="sunrise"
              className="gap-2"
              onClick={() => window.open('https://wa.me/6288802216167?text=Halo, saya tertarik dengan paket AjiraBromo!', '_blank')}
            >
              <MessageCircle className="h-5 w-5" />
              Chat WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌄</span>
              <span className="text-xl font-display font-bold">AjiraBromo</span>
            </Link>
            <p className="text-sm text-background/60 mb-4">
              One gate solution when you traveling to Bromo. Jeep, penginapan, 
              penjemputan, dan lebih dalam satu tempat.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-background/60 hover:text-background hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/60 hover:text-background hover:bg-background/10">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/60 hover:text-background hover:bg-background/10">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              {[
                { name: 'Paket Jeep', href: '/packages/jeep' },
                { name: 'Penginapan', href: '/packages/penginapan' },
                { name: 'Penjemputan', href: '/packages/penjemputan' },
                { name: 'Paket Makan', href: '/packages/makan' },
                { name: 'Dokumentasi', href: '/packages/dokumentasi' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-sm text-background/60">
                 Sukapura, Bromo, Probolinggo, Jawa Timur
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-background/60">
                  +62 88802216167
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-background/60">
                  AjiraBromo@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-sm text-background/40">
            © {currentYear} AjiraBromo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
