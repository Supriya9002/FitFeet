import { useState, useEffect } from "react";
import { Search, MapPin, ShoppingCart, User, Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  cartItems?: number;
  location?: string;
  onLocationClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onLoginClick?: () => void;
}

export function Header({ 
  cartItems = 0, 
  location = "Select Location", 
  onLocationClick,
  onCartClick,
  onMenuClick,
  onLoginClick 
}: HeaderProps) {
  const navigate = useNavigate();
  
  // Site settings state for real-time updates
  const [siteSettings, setSiteSettings] = useState({
    companyName: "FitFeet",
    phone: "+1 (555) 123-4567",
    email: "contact@fitfeet.com",
    address: "123 Fashion Street, Style City, SC 12345"
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("siteSettings");
    if (savedSettings) {
      setSiteSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Listen for settings updates from admin panel
  useEffect(() => {
    const handleSettingsUpdate = (event: CustomEvent) => {
      setSiteSettings(event.detail);
    };

    window.addEventListener('siteSettingsUpdated', handleSettingsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('siteSettingsUpdated', handleSettingsUpdate as EventListener);
    };
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between md:hidden">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 mx-4">
            <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {siteSettings.companyName}
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-primary">
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={onLoginClick}>
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/vendor/auth')}
              className="hidden sm:flex gap-1"
            >
              <Store className="h-4 w-4" />
              Vendor
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {siteSettings.companyName}
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={onLocationClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <MapPin className="h-4 w-4" />
              <span className="max-w-40 truncate">{location}</span>
            </Button>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search for shoes, dresses..." 
                className="pl-10 bg-muted/50 border-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/vendor/auth')}
              className="gap-1"
            >
              <Store className="h-4 w-4" />
              Vendor Login
            </Button>
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-primary">
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={onLoginClick}>
              <User className="h-4 w-4 mr-1" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for shoes, dresses..." 
              className="pl-10 bg-muted/50 border-muted"
            />
          </div>
        </div>

        {/* Location Bar for Mobile */}
        <div className="mt-2 md:hidden">
          <Button 
            variant="ghost" 
            onClick={onLocationClick}
            className="w-full justify-start text-muted-foreground hover:text-foreground p-2"
          >
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{location}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}