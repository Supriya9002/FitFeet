import { Heart, Star, MapPin, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  shopName: string;
  location: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  gender: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({ 
  product, 
  onAddToCart, 
  onProductClick,
  onWishlistToggle,
  isWishlisted = false 
}: ProductCardProps) {
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:scale-[1.02] border-0 bg-card overflow-hidden">
      <CardContent className="p-0">
        {/* Image Container */}
        <div 
          className="relative aspect-square overflow-hidden bg-muted"
          onClick={() => onProductClick?.(product.id)}
        >
          <img 
            src={product.images[0] || "/placeholder.svg"} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isWishlisted 
                ? "bg-red-500/90 text-white hover:bg-red-600/90" 
                : "bg-white/90 hover:bg-white"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onWishlistToggle?.(product.id);
            }}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              {discountPercent}% OFF
            </Badge>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 
              className="font-semibold line-clamp-2 hover:text-primary transition-colors"
              onClick={() => onProductClick?.(product.id)}
            >
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Shop Info */}
          <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{product.shopName}, {product.location}</span>
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.sizes.slice(0, 4).map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button 
            variant="cart" 
            size="sm" 
            className="w-full"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product.id);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}