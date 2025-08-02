import { X, User, ShoppingCart, Heart, MapPin, Store, Gift, CreditCard, Clock, Shield, HeadphonesIcon, Settings, LogOut, Star, TrendingUp, Tag, Package, Truck, HelpCircle, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onCartClick?: () => void;
  cartItems?: number;
}

export function MobileMenu({ isOpen, onClose, onLoginClick, onCartClick, cartItems = 0 }: MobileMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Login / Sign Up", action: onLoginClick, badge: "", link: "" },
        { icon: ShoppingCart, label: "My Cart", action: onCartClick, badge: cartItems > 0 ? cartItems.toString() : "", link: "" },
        { icon: Heart, label: "Wishlist", action: () => {}, badge: "", link: "/wishlist" },
        { icon: Clock, label: "Order History", action: () => {}, badge: "", link: "/order-history" },
      ]
    },
    {
      title: "Shop",
      items: [
        { icon: TrendingUp, label: "Trending Now", action: () => {}, badge: "Hot", link: "/trending-now" },
        { icon: Tag, label: "Today's Deals", action: () => {}, badge: "50% Off", link: "/todays-deals" },
        { icon: Star, label: "Best Sellers", action: () => {}, badge: "", link: "/best-sellers" },
        { icon: Gift, label: "Gift Cards", action: () => {}, badge: "", link: "/gift-cards" },
        { icon: Package, label: "New Arrivals", action: () => {}, badge: "New", link: "/new-arrivals" },
      ]
    },
    {
      title: "Categories",
      items: [
        { icon: "👟", label: "Shoes & Footwear", action: () => {}, badge: "2.5k+", link: "" },
        { icon: "👗", label: "Fashion & Clothing", action: () => {}, badge: "3.2k+", link: "" },
        { icon: "🏥", label: "Medical Equipment", action: () => {}, badge: "500+", link: "" },
        { icon: "🧸", label: "Toys & Games", action: () => {}, badge: "800+", link: "" },
        { icon: "💊", label: "Medicines", action: () => {}, badge: "1.2k+", link: "" },
        { icon: "📱", label: "Electronics", action: () => {}, badge: "900+", link: "" },
        { icon: "📚", label: "Books & Stationery", action: () => {}, badge: "600+", link: "" },
        { icon: "🥻", label: "Traditional Wear", action: () => {}, badge: "400+", link: "" },
      ]
    },
    {
      title: "Services",
      items: [
        { icon: Store, label: "Become a Vendor", action: () => navigate('/vendor/auth'), badge: "Earn Money", link: "" },
        { icon: Truck, label: "Track Order", action: () => {}, badge: "", link: "/track-order" },
        { icon: MapPin, label: "Store Locator", action: () => {}, badge: "", link: "/store-locator" },
        { icon: CreditCard, label: "Payment Methods", action: () => {}, badge: "", link: "/payment-methods" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", action: () => {}, badge: "", link: "/help-center" },
        { icon: HeadphonesIcon, label: "Customer Care", action: () => {}, badge: "24/7", link: "/customer-care" },
        { icon: Shield, label: "Return Policy", action: () => {}, badge: "", link: "/return-policy" },
        { icon: FileText, label: "Terms & Conditions", action: () => {}, badge: "", link: "/terms-conditions" },
        { icon: Bell, label: "Notifications", action: () => {}, badge: "3", link: "/notifications" },
        { icon: Settings, label: "App Settings", action: () => {}, badge: "", link: "/app-settings" },
        { icon: Settings, label: "Admin Dashboard", action: () => {}, badge: "Admin", link: "/admin" },
      ]
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu Sidebar */}
      <div className="fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 animate-slide-in-right">
        <ScrollArea className="h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary">
            <div className="text-primary-foreground">
              <Link to="/" className="text-xl font-bold" onClick={onClose}>FitFeet.in</Link>
              <p className="text-sm opacity-90">Local Shopping Made Easy</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Menu Content */}
          <div className="p-4">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    return item.link ? (
                      <Link
                        key={itemIndex}
                        to={item.link}
                        onClick={onClose}
                        className="w-full justify-between h-auto p-3 hover:bg-muted/50 flex items-center rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon === 'string' ? (
                            <span className="text-lg">{item.icon}</span>
                          ) : (
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="text-left">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <Badge 
                            variant={item.badge === "Hot" || item.badge === "New" || item.badge === "50% Off" || item.badge === "Earn Money" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ) : (
                      <Button
                        key={itemIndex}
                        variant="ghost"
                        className="w-full justify-between h-auto p-3 hover:bg-muted/50"
                        onClick={() => {
                          item.action?.();
                          onClose();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {typeof item.icon === 'string' ? (
                            <span className="text-lg">{item.icon}</span>
                          ) : (
                            <item.icon className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className="text-left">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <Badge 
                            variant={item.badge === "Hot" || item.badge === "New" || item.badge === "50% Off" || item.badge === "Earn Money" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
                
                {sectionIndex < menuSections.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="text-center text-sm text-muted-foreground">
              <p>Version 1.0.0</p>
              <p className="mt-1">© 2024 FitFeet.in</p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}