import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/whatsapp';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const CartSidebar = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-display font-semibold">Keranjang</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {items.length} item
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="font-semibold text-lg mb-2">Keranjang Kosong</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Yuk pilih paket perjalanan impianmu!
              </p>
              <Button onClick={closeCart} asChild>
                <Link to="/packages/jeep">Lihat Paket</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.package.id}
                  className="flex gap-4 p-4 rounded-2xl bg-secondary/50"
                >
                  {/* Icon */}
                  <div className="h-16 w-16 rounded-xl bg-mist flex items-center justify-center text-2xl shrink-0">
                    {item.package.category === 'jeep' && '🚙'}
                    {item.package.category === 'penginapan' && '🏨'}
                    {item.package.category === 'penjemputan' && '✈️'}
                    {item.package.category === 'makan' && '🍱'}
                    {item.package.category === 'dokumentasi' && '📸'}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {item.package.name}
                    </h4>
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.package.category}
                    </p>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatPrice(item.package.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.package.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.package.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive ml-auto"
                        onClick={() => removeItem(item.package.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <Button
              size="lg"
              variant="sunrise"
              className="w-full"
              onClick={closeCart}
              asChild
            >
              <Link to="/checkout">Checkout via WhatsApp</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
