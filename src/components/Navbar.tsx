import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import  Logo  from '@/assets/logo.png';

const navItems = [
  { name: 'Paket Jeep', href: '/packages/jeep' },
  { name: 'Penjemputan', href: '/packages/penjemputan' },
  { name: 'Makan', href: '/packages/makan' },
  { name: 'Dokumentasi', href: '/packages/dokumentasi' },
  { name: 'Penginapan', href: '/packages/penginapan' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || !isHomePage
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-4'
      )}
    >
          <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* LOGO IMAGE */}
          <img
            src={Logo}
            alt="AjiraBromo Logo"
            className="h-12 w-13 object-contain"
          />

          <span
            className={cn(
              'text-xl font-display font-bold transition-colors',
              isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'
            )}
          >
            AjiraBromo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-primary/10',
                isScrolled || !isHomePage
                  ? 'text-foreground hover:text-primary'
                  : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className={cn(
              'relative',
              isScrolled || !isHomePage ? '' : 'text-primary-foreground hover:bg-primary-foreground/10'
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold animate-scale-in">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'md:hidden',
              isScrolled || !isHomePage ? '' : 'text-primary-foreground hover:bg-primary-foreground/10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-medium animate-fade-up">
          <div className="container mx-auto py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
