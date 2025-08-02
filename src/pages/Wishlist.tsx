import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Star, MapPin } from "lucide-react";
import { useState } from "react";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Nike Air Force 1 Low White",
      price: 7995,
      originalPrice: 8995,
      image: "/placeholder.svg",
      shopName: "Rajesh Footwear",
      location: "Gandhi Nagar",
      rating: 4.5,
      inStock: true,
      discount: 12
    },
    {
      id: 2,
      name: "Women's Floral Summer Dress",
      price: 1299,
      originalPrice: 1999,
      image: "/placeholder.svg",
      shopName: "Fashion Villa",
      location: "Commercial Street",
      rating: 4.3,
      inStock: true,
      discount: 35
    },
    {
      id: 3,
      name: "Traditional Kurti Set",
      price: 1899,
      originalPrice: 2499,
      image: "/placeholder.svg",
      shopName: "Ethnic Wear Store",
      location: "Chickpet",
      rating: 4.4,
      inStock: false,
      discount: 24
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (id: number) => {
    console.log(`Added item ${id} to cart`);
  };

  return (
    <PageLayout 
      title="My Wishlist" 
      description={`${wishlistItems.length} items saved for later`}
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{wishlistItems.length}</div>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {wishlistItems.filter(item => item.inStock).length}
              </div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ₹{wishlistItems.reduce((total, item) => total + (item.originalPrice - item.price), 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </CardContent>
          </Card>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Start adding products you love to keep track of them
              </p>
              <Button>Continue Shopping</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {item.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        {item.discount}% OFF
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{item.shopName}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold">₹{item.price.toLocaleString()}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 gap-2"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item.id)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {wishlistItems.length > 0 && (
          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg">
              Share Wishlist
            </Button>
            <Button size="lg">
              Add All to Cart
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}