import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryGrid } from "@/components/CategoryGrid";
import { CategoryMenu } from "@/components/CategoryMenu";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import { LocationSelector } from "@/components/LocationSelector";
import { CustomerAuth } from "@/components/CustomerAuth";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts, mockShops, type Product } from "@/data/mockData";
import { MapPin, Store, Clock, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FilterState {
  category?: string;
  gender?: string;
  priceRange?: string;
  rating?: string;
  sortBy?: string;
}

const Index = () => {
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [showCustomerAuth, setShowCustomerAuth] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{pinCode: string, area: string} | null>(null);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  const handleLocationSelect = (pinCode: string, area: string) => {
    setSelectedLocation({ pinCode, area });
    toast({
      title: "Location Updated",
      description: `Showing products for ${area} - ${pinCode}`,
    });
  };

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => [...prev, productId]);
    toast({
      title: "Added to Cart",
      description: "Product added to your cart successfully!",
    });
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.gender) {
      filtered = filtered.filter(p => p.gender === filters.gender);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(v => v.replace('+', ''));
      if (max) {
        filtered = filtered.filter(p => p.price >= parseInt(min) && p.price <= parseInt(max));
      } else {
        filtered = filtered.filter(p => p.price >= parseInt(min));
      }
    }
    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= parseFloat(filters.rating));
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // For demo, reverse the array
          filtered.reverse();
          break;
        default:
          // popularity - keep original order
          break;
      }
    }

    return filtered;
  }, [filters]);

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItems={cartItems.length}
        location={selectedLocation ? `${selectedLocation.area} - ${selectedLocation.pinCode}` : "Select Location"}
        onLocationClick={() => setShowLocationSelector(true)}
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowCustomerAuth(true)}
        onMenuClick={() => setShowMobileMenu(true)}
      />

      {/* Location Banner */}
      {!selectedLocation && (
        <div className="bg-gradient-primary text-primary-foreground py-4">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Select your location to discover local shops</span>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setShowLocationSelector(true)}
            >
              Choose Location
            </Button>
          </div>
        </div>
      )}

      {/* Category Menu */}
      <CategoryMenu onCategorySelect={(categoryId) => setFilters(prev => ({ ...prev, category: categoryId }))} />

      {/* Hero Section with Categories */}
      <CategoryGrid onCategorySelect={(categoryId) => setFilters(prev => ({ ...prev, category: categoryId }))} />

      {/* Featured Shops */}
      {selectedLocation && (
        <div className="py-6 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              Popular Shops Near You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockShops.slice(0, 4).map((shop) => (
                <Card key={shop.id} className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-warm rounded-lg mb-3 relative overflow-hidden">
                      <img 
                        src={shop.image} 
                        alt={shop.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={shop.isOpen ? "default" : "secondary"} className="text-xs">
                          {shop.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{shop.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {shop.location}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{shop.rating}</span>
                        <span className="text-muted-foreground">({shop.reviewCount})</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {shop.deliveryTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={() => setFilters({})}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Products Section */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              {filteredProducts.length} Products Found
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={() => setFilters({})}>Clear All Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlist.includes(product.id)}
                  onProductClick={(id) => toast({ title: "Product Details", description: "Product details page coming soon!" })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location Selector Modal */}
      {showLocationSelector && (
        <LocationSelector 
          onLocationSelect={handleLocationSelect}
          onClose={() => setShowLocationSelector(false)}
        />
      )}

      {/* Customer Auth Modal */}
      {showCustomerAuth && (
        <CustomerAuth
          onClose={() => setShowCustomerAuth(false)}
          onLogin={setCurrentUser}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          onClose={() => setShowCart(false)}
          cartItems={cartItems}
          onUpdateCart={setCartItems}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        onLoginClick={() => {
          setShowMobileMenu(false);
          setShowCustomerAuth(true);
        }}
        onCartClick={() => {
          setShowMobileMenu(false);
          setShowCart(true);
        }}
        cartItems={cartItems.length}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
