import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/data/mockData";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  onClose: () => void;
  cartItems: string[];
  onUpdateCart: (items: string[]) => void;
}

export function Cart({ onClose, cartItems, onUpdateCart }: CartProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    cartItems.forEach(id => {
      initial[id] = (initial[id] || 0) + 1;
    });
    return initial;
  });
  const { toast } = useToast();

  const cartProducts = Object.keys(quantities).map(id => ({
    ...mockProducts.find(p => p.id === id)!,
    quantity: quantities[id]
  })).filter(p => p.quantity > 0);

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(0, (prev[productId] || 0) + change);
      const updated = { ...prev };
      
      if (newQuantity === 0) {
        delete updated[productId];
      } else {
        updated[productId] = newQuantity;
      }

      // Update cart items array
      const newCartItems: string[] = [];
      Object.entries(updated).forEach(([id, qty]) => {
        for (let i = 0; i < qty; i++) {
          newCartItems.push(id);
        }
      });
      onUpdateCart(newCartItems);

      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setQuantities(prev => {
      const updated = { ...prev };
      delete updated[productId];
      
      const newCartItems: string[] = [];
      Object.entries(updated).forEach(([id, qty]) => {
        for (let i = 0; i < qty; i++) {
          newCartItems.push(id);
        }
      });
      onUpdateCart(newCartItems);

      return updated;
    });

    toast({
      title: "Item Removed",
      description: "Product removed from cart",
    });
  };

  const total = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  if (cartProducts.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="relative text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-2 top-2"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle>Your Cart is Empty</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={onClose} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({cartProducts.length} items)
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto max-h-96">
          {cartProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.shopName}</p>
                <p className="font-semibold">₹{product.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(product.id, -1)}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Badge variant="secondary" className="min-w-8 text-center">
                  {product.quantity}
                </Badge>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(product.id, 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(product.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total: ₹{total.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continue Shopping
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Order Placed!",
                  description: "Your order has been placed successfully!",
                });
                onUpdateCart([]);
                onClose();
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}