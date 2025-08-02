import { useState } from "react";
import { ChevronDown, Search, TrendingUp, Star, Gift, Heart, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryMenuProps {
  onCategorySelect?: (category: string) => void;
}

export function CategoryMenu({ onCategorySelect }: CategoryMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const megaMenuItems = [
    {
      title: "Fashion & Clothing",
      icon: "👗",
      categories: [
        { name: "Men's Clothing", count: "2.5k+" },
        { name: "Women's Clothing", count: "3.2k+" },
        { name: "Kids Clothing", count: "1.8k+" },
        { name: "Traditional Wear", count: "1.2k+" },
        { name: "Sports Wear", count: "800+" },
      ]
    },
    {
      title: "Footwear",
      icon: "👟",
      categories: [
        { name: "Men's Shoes", count: "1.5k+" },
        { name: "Women's Shoes", count: "2.1k+" },
        { name: "Kids Shoes", count: "900+" },
        { name: "Sports Shoes", count: "1.3k+" },
        { name: "Formal Shoes", count: "600+" },
      ]
    },
    {
      title: "Health & Medical",
      icon: "🏥",
      categories: [
        { name: "Medical Equipment", count: "500+" },
        { name: "Medicines", count: "2k+" },
        { name: "Health Supplements", count: "800+" },
        { name: "First Aid", count: "300+" },
        { name: "Wellness Products", count: "400+" },
      ]
    },
    {
      title: "Toys & Games",
      icon: "🧸",
      categories: [
        { name: "Educational Toys", count: "600+" },
        { name: "Action Figures", count: "400+" },
        { name: "Board Games", count: "300+" },
        { name: "Remote Control", count: "250+" },
        { name: "Outdoor Games", count: "200+" },
      ]
    },
    {
      title: "Electronics",
      icon: "📱",
      categories: [
        { name: "Mobile Accessories", count: "1.2k+" },
        { name: "Audio Devices", count: "800+" },
        { name: "Smart Watches", count: "300+" },
        { name: "Power Banks", count: "400+" },
        { name: "Cables & Chargers", count: "500+" },
      ]
    },
    {
      title: "Books & Stationery",
      icon: "📚",
      categories: [
        { name: "Fiction Books", count: "800+" },
        { name: "Educational Books", count: "1.2k+" },
        { name: "Stationery Items", count: "600+" },
        { name: "Art Supplies", count: "300+" },
        { name: "Office Supplies", count: "400+" },
      ]
    }
  ];

  const quickLinks = [
    { name: "Today's Deals", icon: Tag, badge: "Hot" },
    { name: "Trending Now", icon: TrendingUp, badge: "New" },
    { name: "Best Sellers", icon: Star, badge: "Popular" },
    { name: "Gift Cards", icon: Gift, badge: "" },
    { name: "Wishlist", icon: Heart, badge: "" },
    { name: "Flash Sale", icon: Zap, badge: "Limited" },
  ];

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                All Categories
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[800px] p-6">
              <div className="grid grid-cols-3 gap-6">
                {megaMenuItems.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <DropdownMenuLabel className="flex items-center gap-2 font-semibold text-primary">
                      <span className="text-lg">{section.icon}</span>
                      {section.title}
                    </DropdownMenuLabel>
                    <div className="space-y-1">
                      {section.categories.map((category, catIndex) => (
                        <DropdownMenuItem 
                          key={catIndex}
                          className="cursor-pointer justify-between"
                          onClick={() => onCategorySelect?.(category.name.toLowerCase().replace(/\s+/g, '-'))}
                        >
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Links */}
          <div className="flex items-center gap-4">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="relative gap-2"
                onClick={() => onCategorySelect?.(link.name.toLowerCase().replace(/\s+/g, '-'))}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                {link.badge && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs h-4 px-1">
                    {link.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 gap-3">
            {megaMenuItems.slice(0, 6).map((section, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{section.icon}</div>
                  <h3 className="font-medium text-sm">{section.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.categories.length} categories
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="relative gap-2 flex-shrink-0"
                onClick={() => onCategorySelect?.(link.name.toLowerCase().replace(/\s+/g, '-'))}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                {link.badge && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs h-4 px-1">
                    {link.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}